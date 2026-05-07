import { ClipboardCheck, MessageSquare, Rocket, ShieldCheck } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';

const steps = [
  {
    n: '01',
    icon: MessageSquare,
    title: 'Diagnóstico',
    duration: '1 a 3 dias',
    description:
      'Conversa de descoberta. Entendemos cenário, restrições, prazos, stakeholders. Sem cobrar, sem compromisso.'
  },
  {
    n: '02',
    icon: ClipboardCheck,
    title: 'Proposta consultiva',
    duration: '3 a 7 dias',
    description:
      'Desenho técnico + dimensionamento + cronograma + investimento. Indicamos o plano certo, mesmo que seja menor que o esperado.'
  },
  {
    n: '03',
    icon: Rocket,
    title: 'Implementação',
    duration: '2 a 12 semanas',
    description:
      'Onboarding, migração, configuração e treinamento conduzidos por equipe certificada. Métodos PMI/ITIL.'
  },
  {
    n: '04',
    icon: ShieldCheck,
    title: 'Suporte contínuo',
    duration: 'Recorrente',
    description:
      'Atendimento brasileiro, gerente de conta nomeado em Enterprise, monitoria proativa de licenciamento e governança.'
  }
];

export function Process() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface-soft py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="container-shell relative">
        <SectionHeader
          eyebrow="Como trabalhamos"
          title={
            <>
              Quatro etapas, <span className="font-serif italic font-normal text-gradient-brand">sem mistério</span>.
            </>
          }
          description="Nada de discovery genérico de 6 semanas. Vamos direto ao ponto pra entender se faz sentido — e quando faz, executamos rápido."
        />

        <div className="relative">
          {/* connector line — desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[7%] right-[7%] top-[60px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />

          <Stagger className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <StaggerItem key={step.n}>
                <article className="relative flex h-full flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  <div className="flex items-center gap-3">
                    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-500/30 bg-surface-card text-brand-400">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="font-serif text-[42px] italic leading-none tracking-tight text-brand-500/30">
                      {step.n}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-text-strong">{step.title}</h3>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-400">
                    {step.duration}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-text-muted">{step.description}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
