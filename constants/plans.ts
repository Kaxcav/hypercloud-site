export type Plan = {
  id: string;
  slug: string;
  name: string;
  category: 'workspace' | 'gemini' | 'gcp' | 'appsheet' | 'publico';
  summary: string;
  audience: string;
  cta: string;
  compare: {
    model: string;
    storage: string;
    meetings: string;
    ai: string;
    security: string;
    admin: string;
    idealFor: string;
  };
};

export const plans: Plan[] = [
  {
    id: 'workspace-starter',
    slug: 'google-workspace',
    name: 'Google Workspace Starter',
    category: 'workspace',
    summary: 'Entrada profissional com Gmail corporativo, Drive, Meet e Gemini em recursos iniciais.',
    audience: 'Empresas em início de estruturação digital.',
    cta: 'Falar com Especialista',
    compare: {
      model: 'Plano de entrada',
      storage: '30 GB por usuário',
      meetings: 'Até 100 participantes',
      ai: 'Gemini no Gmail e app Gemini',
      security: 'Controles essenciais',
      admin: 'Admin Console padrão',
      idealFor: 'Pequenas equipes'
    }
  },
  {
    id: 'workspace-standard',
    slug: 'google-workspace',
    name: 'Google Workspace Standard',
    category: 'workspace',
    summary: 'Mais colaboração com armazenamento maior, gravação no Meet e ampliação do uso do Gemini.',
    audience: 'Empresas em crescimento com times mais colaborativos.',
    cta: 'Falar com Especialista',
    compare: {
      model: 'Mais vendido',
      storage: '2 TB por usuário',
      meetings: 'Até 150 participantes',
      ai: 'Gemini em Gmail, Docs, Meet e NotebookLM',
      security: 'Governança intermediária',
      admin: 'Administração ampliada',
      idealFor: 'Equipes em expansão'
    }
  },
  {
    id: 'workspace-plus',
    slug: 'google-workspace',
    name: 'Google Workspace Plus',
    category: 'workspace',
    summary: 'Mais governança com Vault, armazenamento ampliado e controles avançados.',
    audience: 'Empresas com maior exigência de segurança e retenção.',
    cta: 'Falar com Especialista',
    compare: {
      model: 'Governança reforçada',
      storage: '5 TB por usuário',
      meetings: 'Até 500 participantes',
      ai: 'Gemini ampliado por suíte',
      security: 'Vault e gestão avançada',
      admin: 'Controles e retenção',
      idealFor: 'Operações estruturadas'
    }
  },
  {
    id: 'workspace-enterprise',
    slug: 'google-workspace',
    name: 'Google Workspace Enterprise',
    category: 'workspace',
    summary: 'Escala institucional com compliance avançado, DLP e limites mais altos de reunião.',
    audience: 'Grandes empresas, instituições e Setor Público.',
    cta: 'Solicitar Diagnóstico',
    compare: {
      model: 'Enterprise',
      storage: 'Conforme política da organização',
      meetings: 'Até 1000 participantes',
      ai: 'Gemini conforme escopo enterprise',
      security: 'DLP, Vault, Cloud Identity Premium',
      admin: 'Administração enterprise',
      idealFor: 'Instituições e grandes operações'
    }
  },
  {
    id: 'gemini-enterprise',
    slug: 'gemini-enterprise',
    name: 'Gemini Enterprise',
    category: 'gemini',
    summary: 'IA do Google aplicada ao Gmail, Docs, Meet e fluxos de trabalho corporativos.',
    audience: 'Organizações que querem produtividade com IA no dia a dia.',
    cta: 'Falar com Especialista',
    compare: {
      model: 'IA aplicada',
      storage: 'Conforme o ambiente Google',
      meetings: 'Resumos e apoio no Meet',
      ai: 'Gemini em Gmail, Docs, Meet e app Gemini',
      security: 'Políticas do ambiente Google',
      admin: 'Gestão conforme tenant Google',
      idealFor: 'Times que querem acelerar produção'
    }
  },
  {
    id: 'google-cloud',
    slug: 'google-cloud',
    name: 'Google Cloud Platform',
    category: 'gcp',
    summary: 'Infraestrutura, dados, segurança e modernização em Google Cloud com abordagem consultiva.',
    audience: 'Empresas e instituições com projetos de cloud e transformação digital.',
    cta: 'Solicitar Diagnóstico',
    compare: {
      model: 'Projeto consultivo',
      storage: 'Sob arquitetura',
      meetings: 'Sob escopo do projeto',
      ai: 'Vertex AI e integrações sob demanda',
      security: 'Arquitetura e compliance sob projeto',
      admin: 'Cloud IAM e governança por ambiente',
      idealFor: 'Modernização e dados'
    }
  },
  {
    id: 'appsheet',
    slug: 'appsheet',
    name: 'AppSheet',
    category: 'appsheet',
    summary: 'Aplicações sem código para processos internos, automação e produtividade operacional.',
    audience: 'Equipes que precisam automatizar rápido com baixo atrito.',
    cta: 'Falar com Especialista',
    compare: {
      model: 'No-code',
      storage: 'Conforme integrações',
      meetings: 'N/A',
      ai: 'Pode combinar com Gemini e Workspace',
      security: 'Políticas por app e tenant',
      admin: 'Controle por ambiente AppSheet',
      idealFor: 'Automação de processos'
    }
  },
  {
    id: 'setor-publico',
    slug: 'setor-publico',
    name: 'Setor Público com Google',
    category: 'publico',
    summary: 'Google Workspace, Cloud e governança para instituições e estruturas públicas.',
    audience: 'Órgãos, instituições e governo.',
    cta: 'Falar com Especialista',
    compare: {
      model: 'Institucional',
      storage: 'Sob escopo institucional',
      meetings: 'Conforme plano ou projeto',
      ai: 'Gemini e Workspace sob contexto institucional',
      security: 'Governança e requisitos públicos',
      admin: 'Jornada dedicada e atendimento consultivo',
      idealFor: 'Setor Público e instituições'
    }
  }
];

export const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'gemini', label: 'Gemini' },
  { id: 'gcp', label: 'Google Cloud' },
  { id: 'appsheet', label: 'AppSheet' },
  { id: 'publico', label: 'Setor Público' }
] as const;
