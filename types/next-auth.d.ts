import type { DefaultSession } from 'next-auth';
import type { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;

    // Aliases e futuros tokens do ecossistema (§3.1)
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    hsmAccessToken?: string;
    hsmRefreshToken?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
    } & DefaultSession['user'];
  }
}
