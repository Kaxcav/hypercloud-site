import type { Metadata } from 'next';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { PortalLoginForm } from '@/components/PortalLoginForm';

export const metadata: Metadata = {
  title: 'Portal do Cliente',
  description: 'Área reservada para clientes Hypercloud com acesso, suporte e acompanhamento de relacionamento.'
};

export default function PortalDoClientePage() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-shell grid items-start gap-12 lg:grid-cols-[1fr_420px]">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Área Reservada
          </span>
          <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tighter text-slate-900 sm:text-5xl">
            Portal do Cliente com acesso simplificado, suporte e acompanhamento.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Criamos uma entrada mais clara para clientes da Hypercloud acessarem relacionamento, chamados e futuras integrações de suporte, sem poluir a navegação do restante do site.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200/60 bg-slate-50 p-6">
              <LockKeyhole className="h-6 w-6 text-brand-600" />
              <h2 className="mt-4 text-lg font-bold tracking-tight text-slate-900">Acesso protegido</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Estrutura pensada para autenticação segura e gestão de relacionamento com clientes Hypercloud.</p>
            </div>
            <div className="rounded-3xl border border-slate-200/60 bg-slate-50 p-6">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              <h2 className="mt-4 text-lg font-bold tracking-tight text-slate-900">Suporte centralizado</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">Chamados, acompanhamento e comunicação podem evoluir aqui sem comprometer a experiência do site público.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200/60 bg-white p-6 shadow-soft sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Entrar</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tighter text-slate-900">Acesse seu ambiente</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Use suas credenciais para acessar informações e acompanhamento da sua conta.</p>
          </div>

          <PortalLoginForm />
        </div>
      </div>
    </section>
  );
}
