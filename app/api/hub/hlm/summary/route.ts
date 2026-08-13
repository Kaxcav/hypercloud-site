import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { obterResumoHlmViaBff } from '@/lib/ecosystem/hlm-client';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  if (!token || !token.id_token) {
    return NextResponse.json(
      {
        status: 'login_google',
        message: 'Entre com sua conta Google para visualizar suas licenças ativas no HLM.',
        cta: 'Entrar com Google'
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
  }

  const result = await obterResumoHlmViaBff(token);

  if (result.status === 'no_access') {
    return NextResponse.json(
      {
        status: 'no_access',
        message: 'Seu e-mail não possui perfil ativo na plataforma de licenças HLM.',
        cta: 'Solicitar Acesso às Licenças'
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    );
  }

  return NextResponse.json(result, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}
