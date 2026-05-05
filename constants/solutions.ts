import type { Metadata } from 'next';

export type SolutionContent = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  bullets: string[];
  metadata: Metadata;
};

export const solutions: SolutionContent[] = [
  {
    slug: 'google-workspace',
    title: 'Google Workspace para empresas e instituições',
    eyebrow: 'Google Workspace',
    description:
      'Gmail corporativo, Drive, Meet, Docs, Sheets e administração centralizada com Gemini integrado, em uma jornada comercial orientada por comparação de planos.',
    intro:
      'A Hypercloud posiciona o Google Workspace como oferta principal para organizações que precisam de produtividade, colaboração e governança em um ambiente Google reconhecido globalmente.',
    bullets: [
      'Comparação entre Starter, Standard, Plus e Enterprise',
      'Gmail corporativo com domínio profissional',
      'Meet, Drive, Docs, Sheets e Admin Console',
      'Gemini integrado à suíte conforme plano e escopo'
    ],
    metadata: {
      title: 'Google Workspace',
      description:
        'Compare e implemente Google Workspace com a Hypercloud para empresas e instituições.'
    }
  },
  {
    slug: 'gemini-enterprise',
    title: 'Gemini Enterprise para produtividade com IA',
    eyebrow: 'Gemini Enterprise',
    description:
      'IA aplicada ao trabalho em Gmail, Docs, Meet e app Gemini, com foco em ganho operacional, escrita, resumo de reuniões e aceleração da produção diária.',
    intro:
      'Gemini Enterprise entra como camada estratégica de IA para clientes que já usam ou querem ampliar o uso do ecossistema Google no dia a dia da organização.',
    bullets: [
      'Gemini no Gmail, Docs e Meet',
      'Apoio a escrita, resumo e pesquisa',
      'Integração com a jornada do Workspace',
      'Venda consultiva para ambientes empresariais e institucionais'
    ],
    metadata: {
      title: 'Gemini Enterprise',
      description:
        'Gemini Enterprise com a Hypercloud para produtividade com IA no ecossistema Google.'
    }
  },
  {
    slug: 'google-cloud',
    title: 'Google Cloud Platform com abordagem consultiva',
    eyebrow: 'Google Cloud Platform',
    description:
      'Infraestrutura, dados, segurança, IA e modernização em Google Cloud para empresas e instituições que precisam de escala, desempenho e governança.',
    intro:
      'A Hypercloud trata GCP como oferta consultiva de alta autoridade, conectando arquitetura, dados, segurança e transformação digital em ambientes críticos.',
    bullets: [
      'Infraestrutura e modernização em nuvem',
      'Dados, analytics e serviços de IA',
      'Segurança e governança em cloud',
      'Projetos empresariais e institucionais'
    ],
    metadata: {
      title: 'Google Cloud Platform',
      description:
        'Soluções Google Cloud com a Hypercloud para transformação digital, dados e infraestrutura.'
    }
  },
  {
    slug: 'appsheet',
    title: 'AppSheet para automação sem código',
    eyebrow: 'AppSheet',
    description:
      'Aplicações no-code para formulários, automações, aprovações e processos internos integrados ao ambiente Google.',
    intro:
      'AppSheet entra na arquitetura do site como oferta de automação operacional, ideal para organizações que querem acelerar processos sem depender de desenvolvimento tradicional.',
    bullets: [
      'Criação de apps internos sem código',
      'Formulários, fluxos e automações',
      'Integração com Google Workspace',
      'Uso corporativo e institucional'
    ],
    metadata: {
      title: 'AppSheet',
      description:
        'AppSheet com a Hypercloud para automação sem código integrada ao ecossistema Google.'
    }
  }
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
