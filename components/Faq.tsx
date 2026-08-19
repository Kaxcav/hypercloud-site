'use client';

import { Users } from 'lucide-react';
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

// Objeções primeiro: são o que trava a decisão de um comprador B2B.
// As perguntas comerciais (preço, nota, prazo) vêm depois.
const items: FaqItem[] = [
  {
    id: 'adocao',
    question: 'Minha equipe tem resistência a mudanças. Vocês treinam?',
    answer:
      'Treinamos — e não só a TI. O onboarding inclui treinamento prático com as pessoas que vão usar a ferramenta todo dia. A ferramenta é cerca de 10% do processo: o resto é adoção, e é exatamente aí que a maioria dos projetos trava.'
  },
  {
    id: 'plantao',
    question: 'Deu problema crítico numa sexta às 18h. Quem atende?',
    answer:
      'Engenharia de plantão, por canal direto. Você não passa por um Nível 1 lendo script: fala com quem tem acesso ao ambiente e autonomia para resolver.'
  },
  {
    id: 'contrato-vigente',
    question: 'Já tenho contrato com a Google por outro parceiro. Dá pra conversar?',
    answer:
      'Dá. Fazemos uma auditoria gratuita do ambiente atual e mostramos os caminhos de otimização — inclusive os que não passam por trocar de fornecedor. Se o melhor cenário for manter o que você já tem, a gente diz isso.'
  },
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
              title="Sem surpresas no contrato, sem chamados sem resposta."
              description="Respondemos direto ao ponto as maiores preocupações dos Diretores e CTOs antes de trocar de parceiro."
              align="left"
            />

            {/* Humanização do time. As fotos reais entram aqui — enquanto não
                chegam, o slot fica honesto em vez de preenchido com stock. */}
            {/* CONFIRMAR: fotos reais do time (3 a 4 rostos, enquadramento
                consistente) para substituir os slots neutros abaixo. */}
            <div className="mt-2 rounded-2xl border border-border bg-surface-soft p-6">
              <div className="flex -space-x-2.5" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-surface-soft bg-surface-muted text-text-subtle"
                  >
                    <Users className="h-4 w-4" />
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[15px] font-semibold leading-relaxed text-text-strong">
                Aqui você não fala com robôs. Fala com engenheiros que conhecem o seu negócio
                pelo nome.
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => openLead('FAQ')}
              className="mt-5"
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
