import type { Metadata } from 'next';
import { BrainCircuit, Building2, Cloud, Workflow } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { cases } from '@/constants/cases';
import { cn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cases e Clientes',
  description:
    'Cases de implementação Hypercloud — Workspace, Gemini, Google Cloud e AppSheet em indústria, setor público, saúde e educação.'
};

const productIcon = {
  workspace: { icon: Building2, color: 'text-sky-400 bg-sky-500/10' },
  gemini: { icon: BrainCircuit, color: 'text-violet-400 bg-violet-500/10' },
  cloud: { icon: Cloud, color: 'text-emerald-400 bg-emerald-500/10' },
  appsheet: { icon: Workflow, color: 'text-amber-400 bg-amber-500/10' },
  multi: { icon: Building2, color: 'text-brand-400 bg-brand-500/10' }
} as const;

export default function CasesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container-shell relative py-14 sm:py-16 lg:py-20">
          <Breadcrumbs items={[{ label: 'Cases' }]} />
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
            Cases · Clientes
          </span>
          <h1 className="mt-5 max-w-3xl text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            Quem decidiu apostar com a Hypercloud — e o que entregamos.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
            Selecionamos histórias representativas das quatro frentes Google: Workspace, Gemini, Google Cloud e AppSheet,
            em indústria, setor público, saúde e educação.
          </p>
        </div>
      </section>

      <section className="bg-surface-base py-16 sm:py-20 lg:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Histórias selecionadas"
            title="Cases representativos da operação Hypercloud."
            description="Conteúdo placeholder até liberação formal do cliente. Para detalhes técnicos completos, fale com um especialista."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            {cases.map((caseItem) => {
              const Icon = productIcon[caseItem.product].icon;
              const colorClass = productIcon[caseItem.product].color;
              return (
                <article
                  key={caseItem.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30"
                >
                  {caseItem.placeholder ? (
                    <span className="absolute right-3 top-3 rounded-full border border-border bg-surface-muted px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-text-subtle">
                      Placeholder
                    </span>
                  ) : null}
                  <div className="flex items-center gap-4">
                    <span className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl', colorClass)}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle">
                        {caseItem.vertical}
                      </p>
                      <h2 className="mt-1 text-lg font-extrabold tracking-tight text-text-strong sm:text-xl">
                        {caseItem.client}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-surface-soft p-5">
                    <p className="font-serif text-[44px] italic leading-none tracking-tight text-brand-400">
                      {caseItem.metric.value}
                    </p>
                    <p className="mt-2 text-[13px] font-bold text-text">{caseItem.metric.label}</p>
                  </div>

                  <div className="mt-6 grid gap-4 text-[14px] leading-relaxed text-text-muted">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle">Desafio</p>
                      <p className="mt-1">{caseItem.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle">Entrega</p>
                      <p className="mt-1">{caseItem.outcome}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SpecialistCta
        title="Quer um case parecido com o seu cenário?"
        description="Mandamos um material com cases por vertical e referência. Nada de press release — é leitura técnica."
      />
    </>
  );
}
