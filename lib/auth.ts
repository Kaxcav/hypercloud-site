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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
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
  secret: process.env.NEXTAUTH_SECRET
};
