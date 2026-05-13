// components/OtherSolutions.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BrainCircuit, Cloud, Workflow } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary, btnTertiary } from '@/components/buttons';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';
import { geminiEditions } from '@/constants/gemini-editions';

type Card = {
  icon: typeof Cloud;
  /** Cor Google oficial do produto. */
  iconBg: string;
  iconColor: string;
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
      iconBg: 'bg-google-blue/10',
      iconColor: 'text-google-blue',
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
      iconBg: 'bg-google-green/10',
      iconColor: 'text-google-green-dark',
      eyebrow: 'Infra & dados',
      title: 'Google Cloud',
      description:
        'Infraestrutura, dados, IA e segurança sob arquitetura. Projeto consultivo com Vertex AI e Cloud IAM.',
      leadContext: 'Google Cloud'
    },
    {
      icon: Workflow,
      iconBg: 'bg-google-yellow/15',
      iconColor: 'text-amber-600',
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
      <div className="container-shell py-20 sm:py-28 lg:py-32">
        <SectionHeader
          eyebrow="Outras soluções Google"
          title={
            <>
              Além do Workspace,{' '}
              <span className="font-extrabold text-gradient-brand">também vendemos.</span>
            </>
          }
          description="Cloud, IA standalone e automação no-code — cotação consultiva, sem tabela pública."
          maxWidth="narrow"
        />

        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition group-hover:rotate-6 group-hover:scale-110 ${card.iconBg} ${card.iconColor}`}>
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
                      className={btnPrimary('md')}
                    >
                      Falar com Especialista
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    {card.detailHref && card.detailLabel ? (
                      <Link href={card.detailHref} className={btnTertiary()}>
                        {card.detailLabel}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
