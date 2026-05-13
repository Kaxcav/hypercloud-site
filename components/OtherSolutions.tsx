// components/OtherSolutions.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BrainCircuit, Cloud, Workflow } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { geminiEditions } from '@/constants/gemini-editions';

type Card = {
  icon: typeof Cloud;
  eyebrow: string;
  title: string;
  description: string;
  extra?: string;
  detailHref?: string;
  detailLabel?: string;
  leadContext: string;
};

export function OtherSolutions() {
  const { open: openLead } = useLeadDialog();

  const cards: Card[] = [
    {
      icon: BrainCircuit,
      eyebrow: 'IA aplicada',
      title: 'Gemini Enterprise',
      description:
        '4 editions com IA produtiva e Code Assist: Business, Standard, Plus e Frontline.',
      extra: geminiEditions.map((e) => e.name.replace('Gemini Enterprise ', '')).join(' · '),
      detailHref: '/solucoes/gemini-enterprise',
      detailLabel: 'Ver editions',
      leadContext: 'Gemini Enterprise'
    },
    {
      icon: Cloud,
      eyebrow: 'Infra & dados',
      title: 'Google Cloud',
      description:
        'Infraestrutura, dados, IA e segurança sob arquitetura. Projeto consultivo com Vertex AI e Cloud IAM.',
      leadContext: 'Google Cloud'
    },
    {
      icon: Workflow,
      eyebrow: 'Automação no-code',
      title: 'AppSheet',
      description:
        'Apps sem código para automatizar processos internos, formulários e aprovações com baixo atrito.',
      leadContext: 'AppSheet'
    }
  ];

  return (
    <section
      aria-label="Outras soluções Google"
      className="border-y border-border bg-surface-soft"
    >
      <div className="container-shell py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
            Outras soluções Google
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
            Além do Workspace,{' '}
            <span className="font-serif italic font-normal text-gradient-brand">
              também vendemos.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Cloud, IA standalone e automação no-code — cotação consultiva, sem tabela
            pública.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="flex flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-subtle">
                  {card.eyebrow}
                </p>
                <h3 className="mt-1.5 text-xl font-extrabold text-text-strong">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-text-muted">
                  {card.description}
                </p>
                {card.extra ? (
                  <p className="mt-2 font-mono text-[11.5px] font-semibold text-brand-600">
                    {card.extra}
                  </p>
                ) : null}
                <p className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                  Cotação na conversa
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => openLead(card.leadContext)}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-4 py-2.5 text-[12.5px] font-bold text-white shadow-brand transition hover:opacity-95"
                  >
                    Falar com Especialista
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  {card.detailHref && card.detailLabel ? (
                    <Link
                      href={card.detailHref}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand-600 transition hover:text-brand-700"
                    >
                      {card.detailLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
