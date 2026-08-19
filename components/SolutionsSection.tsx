// components/SolutionsSection.tsx
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  TrendingDown,
  Workflow
} from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary, btnSecondary, btnTertiary } from '@/components/ui/buttons';
import { Reveal, Stagger, StaggerItem } from '@/components/MotionWrapper';
import { geminiEditions } from '@/constants/gemini-editions';

type Card = {
  icon: typeof Cloud;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  /** Linha de benefício humano — o que muda para as pessoas, não para o servidor. */
  benefit?: string;
  extra?: string;
  detailHref?: string;
  detailLabel?: string;
  leadContext: string;
};

// O que a auditoria olha. São práticas de FinOps, não números de cliente —
// qualquer percentual de economia vive na calculadora, marcado para confirmação.
const auditoria = [
  'Inventário de licenças, contas ociosas e edições superdimensionadas',
  'Right-sizing de máquinas, storage e retenção de dados',
  'Descontos por volume, compromissos de uso e governança de gasto recorrente'
];

export function SolutionsSection() {
  const { open: openLead } = useLeadDialog();

  const cards: Card[] = [
    {
      icon: BrainCircuit,
      iconBg: 'bg-google-blue/10',
      iconColor: 'text-google-blue',
      title: 'Gemini Enterprise',
      description:
        '4 editions com IA produtiva e Code Assist: Business, Standard, Plus e Frontline.',
      benefit:
        'IA não vai substituir o seu time. Vai libertá-lo das tarefas repetitivas para focar no que realmente gera receita.',
      extra: geminiEditions.map((e) => e.name.replace('Gemini Enterprise ', '')).join(' · '),
      detailHref: '/solucoes/gemini-enterprise',
      detailLabel: 'Ver editions',
      leadContext: 'Gemini Enterprise'
    },
    {
      icon: Cloud,
      iconBg: 'bg-google-green/10',
      iconColor: 'text-google-green-dark',
      title: 'Google Cloud',
      description:
        'Infraestrutura, dados, IA e segurança sob arquitetura. Projeto consultivo com Vertex AI e Cloud IAM.',
      benefit: 'Migração conduzida em janelas combinadas — sem parar a operação.',
      detailHref: '/solucoes/google-cloud',
      detailLabel: 'Ver solução',
      leadContext: 'Google Cloud'
    },
    {
      icon: Workflow,
      iconBg: 'bg-google-yellow/15',
      iconColor: 'text-amber-600',
      title: 'AppSheet',
      description:
        'Apps sem código para automatizar processos internos, formulários e aprovações com baixo atrito.',
      benefit: 'Tira a planilha do meio do processo e devolve as horas da equipe.',
      detailHref: '/solucoes/appsheet',
      detailLabel: 'Ver solução',
      leadContext: 'AppSheet'
    }
  ];

  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-titulo"
      className="border-y border-border bg-surface-soft"
    >
      <div className="container-shell py-20 sm:py-28 lg:py-32">
        <SectionHeader
          title={<span id="solucoes-titulo">Começamos pela conta que você já paga.</span>}
          description="Antes de vender licença nova, auditamos o ambiente atual. É o caminho mais curto entre a primeira conversa e um resultado que aparece no orçamento."
          maxWidth="narrow"
        />

        {/* FinOps lidera a seção com peso próprio: é a dor de CFO e CTO.
            Painel largo de propósito — não um quarto card igual aos outros. */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-brand-500/25 bg-surface-card p-6 shadow-medium sm:p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/12 text-brand-600">
                  <TrendingDown className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
                  Otimização de Custos (FinOps)
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
                  Licença ociosa, edição maior do que a necessidade e arquitetura sem ajuste são
                  as três origens mais comuns de desperdício em nuvem. A auditoria do ambiente
                  atual é gratuita e não exige troca de fornecedor.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="#simular-economia" className={btnPrimary('lg')}>
                    Simular Economia em Nuvem
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => openLead('FinOps — auditoria de custos')}
                    className={btnSecondary('lg')}
                  >
                    Falar com Engenheiro
                  </button>
                </div>
              </div>

              <ul className="flex flex-col justify-center gap-4 border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                {auditoria.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] leading-relaxed text-text-default"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-6 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition motion-safe:group-hover:scale-110 ${card.iconBg} ${card.iconColor}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-text-strong">{card.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-text-muted">
                    {card.description}
                  </p>
                  {card.benefit ? (
                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-text-default">
                      {card.benefit}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {card.extra ? (
                    <p className="mt-4 text-[11.5px] font-semibold text-brand-600">{card.extra}</p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    {/* Secundário de propósito: o primário desta seção pertence
                        ao painel FinOps. Quatro botões de mesmo peso não têm líder. */}
                    <button
                      type="button"
                      onClick={() => openLead(card.leadContext)}
                      className={btnSecondary('md')}
                    >
                      Falar com Engenheiro
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
