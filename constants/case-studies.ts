// constants/case-studies.ts
//
// ############################################################
// # {/* CONFIRMAR: TODO o conteúdo deste arquivo é PLACEHOLDER */}
// #
// # Nenhum dado abaixo é real. Cliente, setor, porte, desafio,
// # solução, resultado e depoimento precisam vir do dono antes
// # de qualquer publicação.
// #
// # Enquanto `published` for false, o card renderiza em modo
// # rascunho, com aviso visível de que o dado é ilustrativo.
// # Trocar para true SOMENTE com dado real e autorização.
// ############################################################

export type CaseStudy = {
  id: string;
  /** Nome do cliente. CONFIRMAR — exige autorização de uso de marca. */
  client: string;
  /** Caminho do logo em /public. CONFIRMAR — arquivo ainda não existe. */
  logo?: string;
  sector: string;
  size: string;
  challenge: string;
  solution: string;
  /** Resultado mensurável — o número que sustenta o case. CONFIRMAR. */
  result: { value: string; label: string };
  /** Depoimento e cargo de quem assina. CONFIRMAR. */
  quote?: { text: string; author: string; role: string };
  /**
   * Trava editorial: enquanto false, a UI marca o card como ilustrativo.
   * Impede que placeholder vá ao ar parecendo case real.
   */
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'finops-industria',
    client: 'Cliente a confirmar',
    sector: 'Indústria',
    size: 'Porte a confirmar',
    challenge:
      'Fatura de nuvem crescendo acima do previsto, sem visibilidade de quais recursos e licenças sustentavam o aumento.',
    solution:
      'Auditoria de licenciamento e arquitetura, right-sizing de máquinas e renegociação do modelo de compromisso de uso.',
    result: { value: '-00%', label: 'na fatura mensal de nuvem' },
    published: false
  },
  {
    id: 'migracao-servicos',
    client: 'Cliente a confirmar',
    sector: 'Serviços',
    size: 'Porte a confirmar',
    challenge:
      'Migração de e-mail e arquivos de um ambiente legado sem poder parar a operação em nenhum momento do processo.',
    solution:
      'Migração em ondas com janelas combinadas, coexistência entre ambientes e treinamento das áreas antes do corte.',
    result: { value: '00%', label: 'de disponibilidade durante a migração' },
    published: false
  },
  {
    id: 'ia-operacao',
    client: 'Cliente a confirmar',
    sector: 'Setor a confirmar',
    size: 'Porte a confirmar',
    challenge:
      'Time consumido por tarefas repetitivas de triagem e preenchimento manual, com retrabalho e prazo comprometido.',
    solution:
      'Automação de processos com AppSheet e assistentes do Gemini aplicados às rotinas de maior volume da operação.',
    result: { value: '00h', label: 'devolvidas ao time por mês' },
    published: false
  }
];

/** Há algum case com dado real liberado? Controla o aviso da seção. */
export const hasPublishedCase = caseStudies.some((c) => c.published);
