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
    question: 'Por que vocês não publicam preços?',
    answer:
      'Porque preço de Workspace, Cloud ou AppSheet depende de N usuários, plano, comprometimento anual, descontos por ATA e configuração específica. Publicar preço fixo seria desonesto e quase sempre maior do que o que efetivamente fechamos. A cotação leva 1 dia útil.'
  },
  {
    question: 'Vocês atendem fora de Minas Gerais?',
    answer:
      'Sim. Atendimento nacional. A operação é em Contagem (MG), mas implementações são feitas remotamente, presencial quando o projeto exige. Já temos clientes em mais de 15 estados.'
  },
  {
    question: 'Como funciona a venda pra Setor Público?',
    answer:
      'Três caminhos: (1) adesão a ATAs nossas já homologadas, sem novo processo licitatório; (2) participação em pregões eletrônicos/presenciais com equipe dedicada; (3) contratação direta pelas hipóteses da Lei 14.133/21. Programa de Integridade publicado.'
  },
  {
    question: 'Qual a diferença entre Workspace Plus e Enterprise?',
    answer:
      'Plus já entrega Vault, DLP e Take notes do Gemini — cobre 90% das operações estruturadas. Enterprise é para quando você precisa de Cloud Identity Premium, S/MIME, Meet de até 1.000 ou armazenamento sob política institucional. O comparador interativo na home detalha cada item.'
  },
  {
    question: 'Posso migrar do Microsoft 365 sem perder histórico?',
    answer:
      'Sim. Migração de e-mail, calendário, contatos e arquivos com retenção de timestamps e permissões originais. Conduzimos com ferramentas oficiais Google Workspace Migrate e ferramenta proprietária para casos com regras complexas de DLP/Vault.'
  },
  {
    question: 'Quanto tempo leva uma implementação típica?',
    answer:
      'Diagnóstico em 1-3 dias, proposta em 3-7 dias, implementação em 2-12 semanas dependendo do porte. Empresa de 50 pessoas com Workspace migra em 2-3 semanas. Operação Enterprise com 2 mil usuários, DLP, integração SSO leva 8-12.'
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
