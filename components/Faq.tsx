'use client';

import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { btnSecondary } from '@/components/buttons';

type FaqItem = {
  question: string;
  answer: string;
};

const items: FaqItem[] = [
  {
    question: 'Os preços são finais?',
    answer:
      'Não — são valores de tabela. Há condições por volume, ATAs e contratos plurianuais. Cotação fechada na conversa.'
  },
  {
    question: 'Vocês emitem nota? Como funciona o faturamento?',
    answer:
      'Sim. Hypercloud é revendedora Premier Partner — faturamos direto. Boletos/NF-e mensais com gestor de conta.'
  },
  {
    question: 'Conseguem fornecer para governo?',
    answer:
      'Sim. ATAs vigentes (ARP CIMPAR, CIASC-SC e outras). Veja /setor-publico para os caminhos formais de aquisição.'
  },
  // ⚠ TODO: confirmar com comercial Hypercloud antes de production — prazos chutados
  {
    question: 'Quanto tempo leva para contratar?',
    answer:
      'Setor privado: 24-72h após validação. Setor público: depende do veículo de aquisição (adesão a ATA, pregão, contratação direta).'
  },
  // ⚠ TODO: confirmar com comercial Hypercloud antes de production — SLAs por tier
  {
    question: 'Suporte? SLA?',
    answer:
      'Atendimento nacional, time dedicado. SLAs personalizáveis para Enterprise.'
  },
  // ⚠ TODO: confirmar com comercial Hypercloud antes de production — usar numero real se quiser quantificar
  {
    question: 'Posso migrar de outro provedor (M365, Zoho, etc.)?',
    answer:
      'Sim. Plano de migração consultivo já estruturado.'
  }
];

export function Faq() {
  const { open: openLead } = useLeadDialog();

  return (
    <section className="bg-surface-card py-20 sm:py-28 lg:py-32">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Perguntas frequentes"
              title={
                <>
                  Direto ao{' '}
                  <span className="font-extrabold text-gradient-brand">ponto</span>.
                </>
              }
              description="As 6 perguntas que aparecem em quase toda primeira conversa. Se a sua não tá aqui, fala com a gente."
              align="left"
            />
            <button
              type="button"
              onClick={() => openLead()}
              className={btnSecondary('md', 'mt-2')}
            >
              Não achou? Pergunta direto
            </button>
          </div>

          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.question}>
                <details className="group rounded-2xl border border-border bg-surface-card p-5 transition open:bg-surface-soft open:border-brand-500/40 hover:border-brand-500/30 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-[14.5px] font-bold tracking-tight text-text-strong sm:text-[15.5px]">
                      {item.question}
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-text-muted transition group-open:rotate-180 group-open:text-brand-500" />
                  </summary>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-text-muted sm:text-[14px]">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
