// components/CaseStudies.tsx
import { AlertTriangle, ImageIcon, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';
import { caseStudies, hasPublishedCase } from '@/constants/case-studies';

export function CaseStudies() {
  return (
    <section className="border-b border-border bg-surface-base py-20 sm:py-24">
      <div className="container-shell">
        <SectionHeader
          title="O caminho do problema até o número."
          description="Cada case mostra o mesmo percurso: o que estava travado, o que foi feito e o resultado que apareceu na conta do cliente."
          maxWidth="narrow"
        />

        {/* Trava editorial visível: enquanto não houver case real liberado, a
            seção declara isso em vez de deixar o número passar por verdadeiro. */}
        {!hasPublishedCase ? (
          <div className="mx-auto mb-10 flex max-w-3xl items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/8 px-5 py-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-[13.5px] leading-relaxed text-text-default">
              <span className="font-bold text-text-strong">Conteúdo em preparação.</span>{' '}
              Os cases abaixo são ilustrativos e servem para mostrar a estrutura da entrega.
              Cliente, números e depoimentos reais entram após autorização de uso.
            </p>
          </div>
        ) : null}

        <Stagger className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <StaggerItem key={study.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card shadow-soft">
                <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
                  <div>
                    <p className="text-[14px] font-extrabold text-text-strong">{study.client}</p>
                    <p className="mt-0.5 text-[12.5px] text-text-muted">
                      {study.sector} · {study.size}
                    </p>
                  </div>
                  {/* CONFIRMAR: logo real do cliente. */}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface-muted text-text-subtle"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-5 px-6 py-6">
                  <Stage label="O desafio" body={study.challenge} />
                  <Stage label="A solução Hypercloud" body={study.solution} />
                </div>

                {/* O resultado é o argumento do case — ganha peso próprio. */}
                <div className="border-t border-border bg-surface-soft px-6 py-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-subtle">
                    Resultado
                  </p>
                  {/* CONFIRMAR: valor real do resultado. */}
                  <p
                    className={`mt-2 text-4xl font-extrabold tracking-tight ${
                      study.published ? 'text-text-strong' : 'text-text-subtle'
                    }`}
                  >
                    {study.result.value}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-text-muted">
                    {study.result.label}
                  </p>

                  {/* CONFIRMAR: depoimento do CTO ou responsável técnico. */}
                  {study.quote ? (
                    <figure className="mt-5 border-t border-border pt-5">
                      <Quote className="h-4 w-4 text-brand-500" aria-hidden="true" />
                      <blockquote className="mt-2 text-[13.5px] leading-relaxed text-text-default">
                        {study.quote.text}
                      </blockquote>
                      <figcaption className="mt-3 text-[12.5px] text-text-muted">
                        <span className="font-bold text-text-strong">{study.quote.author}</span> ·{' '}
                        {study.quote.role}
                      </figcaption>
                    </figure>
                  ) : (
                    <p className="mt-5 border-t border-dashed border-border pt-5 text-[12.5px] text-text-subtle">
                      Depoimento a publicar.
                    </p>
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Stage({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">
        {label}
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{body}</p>
    </div>
  );
}
