import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/portal-do-cliente'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    }),
    CredentialsProvider({
      name: 'Portal Hypercloud',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Senha', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (
          credentials.email === process.env.PORTAL_USER_EMAIL &&
          credentials.password === process.env.PORTAL_USER_PASSWORD
        ) {
          return {
            id: 'hypercloud-portal-user',
            name: 'Cliente Hypercloud',
            email: credentials.email
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 1ª passada no login: grava os tokens recebidos do provedor (DESIGN-SSO-INTEGRACAO §3.1)
      if (account) {
        token.id_token = account.id_token;
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token ?? token.refresh_token;
        token.expires_at = account.expires_at;

        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token ?? token.refreshToken;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session }) {
      // NÃO expõe tokens sensíveis ao browser (BFF server-only).
      // A sessão do cliente permanece enxuta com os dados de perfil (name/email/image).
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
