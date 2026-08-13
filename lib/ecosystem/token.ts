import type { JWT } from 'next-auth/jwt';

/**
 * Obtém o id_token do Google garantindo freshness (~1h).
 * Se o token estiver expirado (ou próximo de expirar), realiza a troca do
 * refresh_token junto ao endpoint do Google (https://oauth2.googleapis.com/token)
 * e atualiza as propriedades do objeto token mutavelmente para o chamador persistir no JWT.
 * 
 * Contrato: DESIGN-SSO-INTEGRACAO.md §2 & §3.1
 */
export async function getIdTokenFresco(token: JWT): Promise<string | null> {
  if (!token.id_token) {
    return null;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const BUFFER_SECONDS = 60; // 1 minuto de margem de segurança

  // Se o token atual ainda é válido dentro da janela de segurança, retorna o id_token existente
  if (token.expires_at && token.expires_at - BUFFER_SECONDS > nowInSeconds) {
    return token.id_token;
  }

  // Se o token expirou e não há refresh_token disponível, não é possível renovar
  if (!token.refresh_token) {
    return null;
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID ?? '';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? '';

    if (!clientId || !clientSecret) {
      return null;
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      id_token?: string;
      access_token?: string;
      expires_in?: number;
    };

    if (data.id_token) {
      token.id_token = data.id_token;
      token.idToken = data.id_token;
    }
    if (data.access_token) {
      token.access_token = data.access_token;
      token.accessToken = data.access_token;
    }
    if (data.expires_in) {
      const newExpiresAt = Math.floor(Date.now() / 1000) + data.expires_in;
      token.expires_at = newExpiresAt;
      token.expiresAt = newExpiresAt;
    }

    return token.id_token ?? null;
  } catch (error) {
    return null;
  }
}
