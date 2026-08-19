import type { Metadata } from 'next';
import { ArrowRight, Headphones, KeyRound, LifeBuoy, LockKeyhole, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PortalLoginForm } from '@/components/PortalLoginForm';
import { SectionHeader } from '@/components/SectionHeader';
import { HsmHubCard } from '@/components/HsmHubCard';
import { HlmHubCard } from '@/components/HlmHubCard';
import { portalUrls } from '@/constants/portals';

export const metadata: Metadata = {
  title: 'Portal do Cliente',
  description:
    'Área reservada para clientes Hypercloud com acesso, suporte e acompanhamento de relacionamento.'
};

interface HubPortal {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  href: string;
}

const hubPortals: HubPortal[] = [
  {
    key: 'hsm',
    icon: LifeBuoy,
    title: 'Gestão de Suporte & Chamados (HSM)',
    description:
      'Abra novos chamados, acompanhe o SLA de atendimento, acesse a base de conhecimento e fale com nosso suporte.',
    cta: 'Acessar Suporte HSM',
    href: portalUrls.hsm
  },
  {
    key: 'hlm',
    icon: KeyRound,
    title: 'Gestão de Licenças & Subscrições (HLM)',
    description:
      'Gerencie suas licenças ativas, acompanhe renovações do Google Workspace, limites de usuários e faturamento.',
    cta: 'Gerenciar Licenças HLM',
    href: portalUrls.hlm
  }
];

const features = [
  {
    icon: LockKeyhole,
    title: 'Acesso protegido',
    description: 'Estrutura pensada para autenticação segura e gestão de relacionamento com clientes Hypercloud.'
  },
  {
    icon: Headphones,
    title: 'Suporte centralizado',
    description: 'Chamados, acompanhamento e comunicação evoluem aqui sem comprometer a experiência do site público.'
  },
  {
    icon: ShieldCheck,
    title: 'Compliance e privacidade',
    description: 'Política de dados alinhada à LGPD, com gestão de acessos por perfil e auditoria de operações sensíveis.'
  }
];

export default async function PortalDoClientePage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-surface-card py-14 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-grid pointer-events-none" />

        <div className="container-shell relative grid items-start gap-12 lg:grid-cols-[1.05fr_420px] lg:gap-16">
          <div className="max-w-2xl">
            <Breadcrumbs items={[{ label: 'Portal do Cliente' }]} />

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
              <Sparkles className="h-3 w-3" />
              Área reservada
            </span>

            <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
              Portal do Cliente com acesso seguro, suporte e{' '}
              <span className="font-extrabold text-gradient-brand">acompanhamento</span>.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
              Entrada clara para clientes da Hypercloud acessarem relacionamento, chamados e futuras integrações de
              suporte sem poluir a navegação do restante do site.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border bg-surface-card p-5 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30"
                >
                  <div className="inline-flex rounded-xl bg-brand-500/10 p-2.5 text-brand-400">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-base font-bold tracking-tight text-text-strong">{feature.title}</h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.12),transparent_60%)] blur-2xl" />

            <div className="rounded-2xl border border-border bg-surface-base p-6 shadow-premium sm:p-8">
              {session ? (
                <div className="text-center sm:text-left">
                  <div className="mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">Sessão Autenticada</p>
                    <h2 className="mt-2 text-xl font-extrabold tracking-tight text-text-strong sm:text-2xl">
                      Olá, {session.user?.name?.split(' ')[0]}
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
                      Você já está conectado ao ambiente seguro. Acesse seus painéis integrados abaixo ou vá para o Dashboard unificado.
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-brand transition hover:opacity-95"
                  >
                    Ir para o Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-subtle">Entrar</p>
                    <h2 className="mt-2 text-xl font-extrabold tracking-tight text-text-strong sm:text-2xl">
                      Acesse seu ambiente
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
                      Use suas credenciais para acessar informações e acompanhamento da sua conta.
                    </p>
                  </div>
                  <PortalLoginForm />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14 sm:py-16 lg:py-20">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Ecossistema Hypercloud"
            title="Hub de Acesso Rápido"
            description="Entre direto nos portais dedicados de suporte e licenciamento do ecossistema Hypercloud."
          />

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <HsmHubCard />
            <HlmHubCard />
          </div>
        </div>
      </section>
    </>
  );
}
