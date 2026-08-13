import type { JWT } from 'next-auth/jwt';
import { getIdTokenFresco } from './token';

const HLM_API_URL = process.env.HLM_API_URL ?? 'http://localhost:3001/api';

export interface HlmProductSummary {
  productId: string;
  productName: string;
  totalLicenses: number;
  assigned: number;
  available: number;
}

export interface HlmClientSummary {
  id: string;
  name: string;
  totalLicenses: number;
  assigned: number;
  available: number;
}

export interface HlmSummaryData {
  scope: {
    role: string;
    clientCount: number;
  };
  totals: {
    totalLicenses: number;
    assigned: number;
    available: number;
    byProduct: HlmProductSummary[];
  };
  clients: HlmClientSummary[];
  asOf: string;
}

export type HlmSummaryResult =
  | { status: 'ok'; resumo: HlmSummaryData }
  | { status: 'no_access'; message?: string }
  | { status: 'login_google'; message?: string }
  | { status: 'error'; message?: string };

/**
 * Consulta o resumo de licenças no HLM (/api/external/licenses/summary) via id_token
 * 
 * Contrato: DESIGN-SSO-INTEGRACAO.md §3.4
 */
export async function obterResumoHlmViaBff(token: JWT): Promise<HlmSummaryResult> {
  const idToken = await getIdTokenFresco(token);

  if (!idToken) {
    return { status: 'login_google', message: 'Sessão do Google necessária para acessar as licenças.' };
  }

  try {
    const res = await fetch(`${HLM_API_URL}/external/licenses/summary`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Cache-Control': 'no-store'
      }
    });

    if (res.status === 403) {
      const errJson = await res.json().catch(() => null);
      return {
        status: 'no_access',
        message: errJson?.error ?? 'Seu e-mail não possui cadastro ativo no HLM.'
      };
    }

    if (res.status === 401) {
      return { status: 'error', message: 'Não foi possível autenticar o token no HLM.' };
    }

    if (!res.ok) {
      return { status: 'error', message: `Erro HTTP ${res.status} ao consultar o HLM.` };
    }

    const data = (await res.json()) as HlmSummaryData;
    return {
      status: 'ok',
      resumo: data
    };
  } catch (err) {
    return {
      status: 'error',
      message: err instanceof Error ? err.message : 'Falha na conexão com o serviço HLM.'
    };
  }
}
