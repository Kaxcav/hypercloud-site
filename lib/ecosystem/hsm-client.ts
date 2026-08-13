import type { JWT } from 'next-auth/jwt';
import { getIdTokenFresco } from './token';

const HSM_API_URL = process.env.HSM_API_URL ?? 'http://localhost:3002/api';

export interface HsmKpis {
  abertos: number;
  emAndamento: number;
  aguardando: number;
  resolvidos: number;
}

export type HsmSummaryResult =
  | { status: 'ok'; kpis: HsmKpis }
  | { status: 'no_access'; message?: string }
  | { status: 'login_google'; message?: string }
  | { status: 'error'; message?: string };

interface HsmAuthGoogleResponse {
  sucesso: boolean;
  mensagem?: string;
  dados?: {
    accessToken: string;
    refreshToken: string;
    usuario: Record<string, unknown>;
  };
}

interface HsmRefreshResponse {
  sucesso: boolean;
  mensagem?: string;
  dados?: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface HsmDashboardResponse {
  sucesso: boolean;
  mensagem?: string;
  dados?: {
    kpis?: {
      totalAbertos?: number;
      totalEmAndamento?: number;
      totalAguardandoCliente?: number;
      totalResolvidos?: number;
      totalChamados?: number;
      totalNaFila?: number;
    };
  };
}

/**
 * Troca o id_token do Google por tokens de sessão no HSM (/api/auth/google)
 */
export async function trocaIdTokenPorSessaoHsm(idToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
} | { status: 'no_access' | 'error'; message?: string }> {
  try {
    const res = await fetch(`${HSM_API_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: idToken })
    });

    if (res.status === 403) {
      return { status: 'no_access', message: 'Acesso não autorizado no HSM' };
    }

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      if (res.status === 401 || errJson?.codigo === 'ERRO_ACESSO_NEGADO') {
        return { status: 'no_access', message: errJson?.mensagem ?? 'Acesso negado' };
      }
      return { status: 'error', message: `Erro HTTP ${res.status} ao autenticar no HSM` };
    }

    const json = (await res.json()) as HsmAuthGoogleResponse;
    if (json.sucesso && json.dados?.accessToken && json.dados?.refreshToken) {
      return {
        accessToken: json.dados.accessToken,
        refreshToken: json.dados.refreshToken
      };
    }

    return { status: 'error', message: json.mensagem ?? 'Resposta inválida do HSM' };
  } catch (err) {
    return { status: 'error', message: err instanceof Error ? err.message : 'Falha na conexão com HSM' };
  }
}

/**
 * Tenta renovar o accessToken do HSM usando o refreshToken (/api/auth/refresh)
 */
export async function renovarSessaoHsm(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken?: string;
} | null> {
  try {
    const res = await fetch(`${HSM_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!res.ok) return null;

    const json = (await res.json()) as HsmRefreshResponse;
    if (json.sucesso && json.dados?.accessToken) {
      return {
        accessToken: json.dados.accessToken,
        refreshToken: json.dados.refreshToken ?? refreshToken
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Busca o resumo do dashboard do HSM usando o accessToken
 */
export async function resumoHsm(accessToken: string): Promise<HsmDashboardResponse | { status: 401 | 403 | 500 }> {
  try {
    const res = await fetch(`${HSM_API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (res.status === 401) return { status: 401 };
    if (res.status === 403) return { status: 403 };

    if (!res.ok) return { status: 500 };

    const json = (await res.json()) as HsmDashboardResponse;
    return json;
  } catch {
    return { status: 500 };
  }
}

/**
 * Função principal BFF que gerencia a sessão HSM no JWT, trata expiração de 15m e renovação
 */
export async function obterResumoHsmViaBff(token: JWT): Promise<HsmSummaryResult> {
  const idToken = await getIdTokenFresco(token);

  if (!idToken) {
    return { status: 'login_google', message: 'Sessão do Google necessária' };
  }

  let accessToken = token.hsmAccessToken;
  let refreshToken = token.hsmRefreshToken;

  // Se não temos tokens do HSM em cache, autentica via Google id_token
  if (!accessToken || !refreshToken) {
    const loginRes = await trocaIdTokenPorSessaoHsm(idToken);
    if ('status' in loginRes) {
      return loginRes.status === 'no_access'
        ? { status: 'no_access', message: loginRes.message }
        : { status: 'error', message: loginRes.message };
    }
    accessToken = loginRes.accessToken;
    refreshToken = loginRes.refreshToken;
    token.hsmAccessToken = accessToken;
    token.hsmRefreshToken = refreshToken;
  }

  // Tenta buscar o dashboard do HSM
  let dashboardRes = await resumoHsm(accessToken);

  // Em caso de 401 (token de 15m expirado), tenta renovar usando o refreshToken do HSM
  if ('status' in dashboardRes && dashboardRes.status === 401) {
    if (refreshToken) {
      const renovou = await renovarSessaoHsm(refreshToken);
      if (renovou) {
        accessToken = renovou.accessToken;
        refreshToken = renovou.refreshToken ?? refreshToken;
        token.hsmAccessToken = accessToken;
        token.hsmRefreshToken = refreshToken;
        dashboardRes = await resumoHsm(accessToken);
      }
    }

    // Se o refresh falhar, tenta re-autenticar com o Google id_token fresco
    if ('status' in dashboardRes && dashboardRes.status === 401) {
      const reloginRes = await trocaIdTokenPorSessaoHsm(idToken);
      if ('status' in reloginRes) {
        return reloginRes.status === 'no_access'
          ? { status: 'no_access', message: reloginRes.message }
          : { status: 'error', message: reloginRes.message };
      }
      accessToken = reloginRes.accessToken;
      refreshToken = reloginRes.refreshToken;
      token.hsmAccessToken = accessToken;
      token.hsmRefreshToken = refreshToken;
      dashboardRes = await resumoHsm(accessToken);
    }
  }

  if ('status' in dashboardRes) {
    if (dashboardRes.status === 403) {
      return { status: 'no_access', message: 'Usuário sem permissão no HSM' };
    }
    return { status: 'error', message: 'Não foi possível carregar os dados do HSM' };
  }

  const rawKpis = dashboardRes.dados?.kpis;
  if (!rawKpis) {
    return { status: 'error', message: 'KPIs indisponíveis' };
  }

  return {
    status: 'ok',
    kpis: {
      abertos: rawKpis.totalAbertos ?? rawKpis.totalNaFila ?? 0,
      emAndamento: rawKpis.totalEmAndamento ?? 0,
      aguardando: rawKpis.totalAguardandoCliente ?? 0,
      resolvidos: rawKpis.totalResolvidos ?? 0
    }
  };
}
