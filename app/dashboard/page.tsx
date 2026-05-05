import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard do Cliente',
  description: 'Área autenticada do Portal do Cliente Hypercloud.'
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/portal-do-cliente');
  }

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-shell max-w-5xl">
        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
          Área autenticada
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tighter text-slate-900 sm:text-5xl">
          Bem-vindo ao Dashboard do Cliente.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          Seu acesso foi validado. Esta área está pronta para evoluir com tickets, acompanhamento de relacionamento, documentos e integrações futuras da Hypercloud.
        </p>
      </div>
    </section>
  );
}
