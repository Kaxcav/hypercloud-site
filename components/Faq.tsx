'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';

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
  const [open, setOpen] = useState<number | null>(0);
  const { open: openLead } = useLeadDialog();

  return (
    <section className="bg-surface-base py-20 sm:py-24 lg:py-28">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Perguntas frequentes"
              title={
                <>
                  Direto ao <span className="font-serif italic font-normal text-gradient-brand">ponto</span>.
                </>
              }
              description="As 6 perguntas que aparecem em quase toda primeira conversa. Se a sua não tá aqui, fala com a gente."
            />
            <button
              type="button"
              onClick={() => openLead()}
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-4 py-2.5 text-[13px] font-bold text-text transition hover:border-brand-500/40 hover:text-text-strong"
            >
              Não achou? Pergunta direto
            </button>
          </div>

          <ul className="space-y-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.question}
                  className={cn(
                    'overflow-hidden rounded-2xl border bg-surface-card transition',
                    isOpen ? 'border-brand-500/40 shadow-soft' : 'border-border hover:border-brand-500/20'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="text-[14.5px] font-bold tracking-tight text-text-strong sm:text-[15.5px]">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition',
                        isOpen
                          ? 'border-brand-500/40 bg-brand-500/10 text-brand-400'
                          : 'border-border bg-surface-soft text-text-muted'
                      )}
                    >
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-border px-5 py-4 text-[13.5px] leading-relaxed text-text-muted sm:px-6 sm:py-5">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
