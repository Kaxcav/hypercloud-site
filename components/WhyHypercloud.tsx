import { Award, Headphones, Landmark, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';

const pillars = [
  {
    n: '01',
    icon: Award,
    title: 'Premier Partner',
    description:
      'Nível mais alto de parceria do Google Cloud no Brasil. Workspace, GCP e for Education com certificação direta da fabricante.'
  },
  {
    n: '02',
    icon: Sparkles,
    title: 'Multi-cloud por design',
    description:
      'AWS, Azure e Google Cloud com profundidade técnica equivalente. Recomendamos a melhor arquitetura — não a que dá mais comissão.'
  },
  {
    n: '03',
    icon: Landmark,
    title: 'Setor Público pronto',
    description:
      'ATAs vigentes, Programa de Integridade publicado, equipe dedicada a licitações. Compliance formal e rastreável.'
  },
  {
    n: '04',
    icon: Headphones,
    title: 'Atendimento brasileiro',
    description:
      'Onboarding, suporte e treinamento em português. PMI, ITIL e processos ágeis. SLA contratado pra Enterprise.'
  }
];

export function WhyHypercloud() {
  return (
    <section className="bg-surface-base py-20 sm:py-24 lg:py-28">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Por que Hypercloud"
          title={
            <>
              Quatro pilares que <span className="font-serif italic font-normal text-gradient-brand">aparecem em todo projeto</span>.
            </>
          }
          description="Independente se você é uma empresa privada de 50 pessoas ou uma instituição com 4 mil servidores — esses quatro pontos não mudam."
        />

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <StaggerItem key={p.n}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                <div className="absolute right-5 top-5 font-serif text-[44px] italic leading-none tracking-tight text-brand-500/15 transition group-hover:text-brand-500/25">
                  {p.n}
                </div>
                <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold tracking-tight text-text-strong">{p.title}</h3>
                <p className="relative mt-2.5 flex-1 text-[13.5px] leading-relaxed text-text-muted">
                  {p.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
