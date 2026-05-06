import type { Metadata } from 'next';
import { Headphones, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PortalLoginForm } from '@/components/PortalLoginForm';

export const metadata: Metadata = {
  title: 'Portal do Cliente',
  description:
    'Área reservada para clientes Hypercloud com acesso, suporte e acompanhamento de relacionamento.'
};

const features = [
  {
    icon: LockKeyhole,
    title: 'Acesso protegido',
    description:
      'Estrutura pensada para autenticação segura e gestão de relacionamento com clientes Hypercloud.'
  },
  {
    icon: Headphones,
    title: 'Suporte centralizado',
    description:
      'Chamados, acompanhamento e comunicação evoluem aqui sem comprometer a experiência do site público.'
  },
  {
    icon: ShieldCheck,
    title: 'Compliance e privacidade',
    description:
      'Política de dados alinhada à LGPD, com gestão de acessos por perfil e auditoria de operações sensíveis.'
  }
];

export default function PortalDoClientePage() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-hero-glow py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

      <div className="container-shell relative grid items-start gap-12 lg:grid-cols-[1.05fr_420px] lg:gap-16">
        <div className="max-w-2xl">
          <Breadcrumbs items={[{ label: 'Portal do Cliente' }]} />

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Área reservada
          </span>

          <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            Portal do Cliente com acesso seguro, suporte e{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              acompanhamento
            </span>
            .
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            Entrada clara para clientes da Hypercloud acessarem relacionamento,
            chamados e futuras integrações de suporte sem poluir a navegação do
            restante do site.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300"
              >
                <div className="inline-flex rounded-xl bg-brand-50 p-2.5 text-brand-600">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-bold tracking-tight text-slate-900">
                  {feature.title}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.12),transparent_60%)] blur-2xl" />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium sm:p-8">
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Entrar
              </p>
              <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Acesse seu ambiente
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                Use suas credenciais para acessar informações e acompanhamento
                da sua conta.
              </p>
            </div>

            <PortalLoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
