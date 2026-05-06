import type { Metadata } from 'next';
import { ArrowRight, Building2, Clock, Headphones, LifeBuoy, MessageCircle, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';

export const metadata: Metadata = {
  title: 'Suporte',
  description: 'Suporte e abertura de chamados Hypercloud.'
};

const channels = [
  {
    icon: LifeBuoy,
    title: 'Suporte Premium',
    description: 'Atendimento prioritário com SLA contratado e gerente de conta nomeado para clientes Workspace Enterprise.',
    eta: 'Resposta em 1h útil'
  },
  {
    icon: Headphones,
    title: 'Suporte técnico',
    description: 'Atendimento brasileiro consultivo para Workspace, Cloud e AppSheet. Em português, sempre.',
    eta: 'Resposta em 4h úteis'
  },
  {
    icon: Building2,
    title: 'Setor Público',
    description: 'Equipe dedicada a ATAs, licitações, contratos públicos e exigências do setor.',
    eta: 'Resposta em 1 dia útil'
  },
  {
    icon: ShieldCheck,
    title: 'Compliance & Ouvidoria',
    description: 'Canal de denúncias, ouvidoria e questões relacionadas ao Programa de Integridade.',
    eta: 'Resposta sigilosa'
  }
];

export default function SuportePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container-shell relative py-14 sm:py-16 lg:py-20">
          <Breadcrumbs items={[{ label: 'Suporte' }]} />
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
            Suporte
          </span>
          <h1 className="mt-5 max-w-3xl text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            Quando precisar, você tem <span className="font-serif italic font-normal text-gradient-brand">gente preparada</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
            Atendimento brasileiro, consultivo, em português. Para clientes Workspace, Cloud, Gemini e AppSheet —
            com canal próprio para Setor Público e Compliance.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://wa.me/5531992391683?text=Olá,%20preciso%20de%20suporte"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-brand transition hover:opacity-95"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp do Suporte
            </a>
            <a
              href="mailto:suporte@hypercloud.com.br"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-5 py-3 text-sm font-bold text-text shadow-soft transition hover:border-brand-500/40 hover:text-text-strong"
            >
              suporte@hypercloud.com.br
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Canais"
            title="Escolha o canal que melhor cabe na sua urgência."
            description="Cada canal tem SLA, equipe dedicada e fluxo próprio. Em caso de dúvida, comece pelo WhatsApp do suporte — direcionamos pra a fila certa."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {channels.map((c) => (
              <article
                key={c.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-soft px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-text-muted">
                    <Clock className="h-3 w-3" />
                    {c.eta}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-text-strong">{c.title}</h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-text-muted">{c.description}</p>
                <a
                  href="mailto:suporte@hypercloud.com.br"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-400 transition hover:text-brand-300"
                >
                  Acionar canal
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SpecialistCta
        title="Ainda não é cliente?"
        description="Quer entender como nosso suporte funciona antes de fechar contrato? Falamos sem compromisso."
      />
    </>
  );
}
