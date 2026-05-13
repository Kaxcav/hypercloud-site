import Link from 'next/link';
import { ArrowRight, BrainCircuit, Building2, Cloud, Workflow } from 'lucide-react';
import { cases } from '@/constants/cases';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal, Stagger, StaggerItem } from '@/components/MotionWrapper';
import { cn } from '@/components/ui';

const productIcon = {
  workspace: { icon: Building2, color: 'text-sky-400 bg-sky-500/10' },
  gemini: { icon: BrainCircuit, color: 'text-violet-400 bg-violet-500/10' },
  cloud: { icon: Cloud, color: 'text-emerald-400 bg-emerald-500/10' },
  appsheet: { icon: Workflow, color: 'text-amber-400 bg-amber-500/10' },
  multi: { icon: Building2, color: 'text-brand-400 bg-brand-500/10' }
} as const;

const trackRecord = [
  { value: '200+', label: 'Clientes ativos' },
  { value: '15+', label: 'Estados atendidos' },
  { value: '8+', label: 'ATAs vigentes' },
  { value: '10+', label: 'Anos de operação' }
];

export function Cases() {
  return (
    <section id="cases" className="bg-surface-base py-20 sm:py-24 lg:py-28">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Cases · Clientes"
          title="Implementado, não apenas vendido."
          description="Histórias resumidas de quem decidiu apostar em projetos da Hypercloud — indústria, governo e saúde."
        />

        <Stagger className="grid gap-5 lg:grid-cols-3">
          {cases.map((caseItem) => {
            const Icon = productIcon[caseItem.product].icon;
            const colorClass = productIcon[caseItem.product].color;
            return (
              <StaggerItem key={caseItem.id}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  {caseItem.placeholder ? (
                    <span className="absolute right-3 top-3 rounded-full border border-border bg-surface-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-text-subtle">
                      Placeholder
                    </span>
                  ) : null}
                  <span className={cn('inline-flex h-11 w-11 items-center justify-center rounded-xl', colorClass)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle">
                    {caseItem.vertical}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold tracking-tight text-text-strong">
                    {caseItem.client}
                  </h3>

                  <div className="mt-5 rounded-xl border border-border bg-surface-soft p-4">
                    <p className="font-extrabold text-[36px] leading-none tracking-tight text-brand-400">
                      {caseItem.metric.value}
                    </p>
                    <p className="mt-1.5 text-[12.5px] font-medium text-text-muted">
                      {caseItem.metric.label}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] leading-relaxed text-text-muted">
                    <p>
                      <span className="font-bold text-text">Desafio · </span>
                      {caseItem.challenge}
                    </p>
                    <p>
                      <span className="font-bold text-text">Entrega · </span>
                      {caseItem.outcome}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-500/8 via-surface-card to-surface-card p-7 shadow-soft sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" aria-hidden />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_2fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
                  Track record
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-text-strong sm:text-[28px] sm:leading-tight">
                  Por trás dos cases que dão pra contar, mais de duas centenas que ainda não.
                </h3>
                <Link
                  href="/cases"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-brand-400 transition hover:text-brand-300"
                >
                  Ver todos os cases publicados
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {trackRecord.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-surface-soft p-4 sm:p-5">
                    <dd className="font-extrabold text-[36px] leading-none tracking-tight text-brand-400 sm:text-[44px]">
                      {item.value}
                    </dd>
                    <dt className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-subtle">
                      {item.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
