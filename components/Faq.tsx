'use client';

import { SectionHeader } from '@/components/SectionHeader';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const items: FaqItem[] = [
  {
    id: 'preco',
    question: 'Por que vocês não publicam preço?',
    answer:
      'Porque o valor final depende de volume, prazo de contrato e veículo de aquisição. Publicar tabela ignoraria condições por ATA e contratos plurianuais que normalmente reduzem o custo. Mandamos a cotação fechada em até 1 dia útil.'
  },
  {
    id: 'faturamento',
    question: 'Vocês emitem nota? Como funciona o faturamento?',
    answer:
      'Sim. Hypercloud é revendedora Premier Partner — faturamos direto em BRL com impostos nacionais inclusos. Boletos/NF-e mensais com acompanhamento do gestor de conta.'
  },
  {
    id: 'governo',
    question: 'Conseguem fornecer para governo e setor público?',
    answer:
      'Sim. Mantemos ATAs vigentes (ARP CIMPAR, CIASC-SC e outras) prontas para carona/adesão, além de atender licitações e pregões com suporte a Lei 14.133/2021.'
  },
  {
    id: 'prazo',
    question: 'Quanto tempo leva para contratar e ativar?',
    answer:
      'Setor privado: provisionamento das licenças e início do plano em 24h a 72h. Setor público: conforme o rito do veículo de aquisição (adesão a ATA, dispensas ou pregão).'
  },
  {
    id: 'sla',
    question: 'Como funciona o suporte técnico e SLA?',
    answer:
      'Atendimento em português por especialistas certificados no Brasil. SLA de resposta em até 1h para incidentes graves no plano Enterprise.'
  },
  {
    id: 'migracao',
    question: 'Posso migrar de outro provedor (Microsoft 365, Exchange, etc.)?',
    answer:
      'Sim. Oferecemos metodologia completa de migração de e-mails, arquivos do Drive/OneDrive e permissões sem interrupção do trabalho dos colaboradores.'
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
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => openLead('FAQ')}
              className="mt-4"
            >
              Não achou? Pergunta direto
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
