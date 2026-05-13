// constants/gemini-editions.ts
export type GeminiEditionId = 'business' | 'standard' | 'plus' | 'frontline';

export type GeminiEdition = {
  id: GeminiEditionId;
  name: string;
  /** Público-alvo descrito pela Google. */
  audience: string;
  /** Storage pooled por usuário/mês. */
  storage: string;
  /** 3-4 destaques do edition. */
  highlights: string[];
};

export const geminiEditions: GeminiEdition[] = [
  {
    id: 'business',
    name: 'Gemini Enterprise Business',
    audience: '1–300 usuários',
    storage: '25 GiB pooled / usuário / mês',
    highlights: [
      'Conectores curados por segmento',
      'Segurança e compliance enterprise',
      'Acesso prioritário aos modelos mais recentes',
      'Code agent completo, Data Insights, Deep Research'
    ]
  },
  {
    id: 'standard',
    name: 'Gemini Enterprise Standard',
    audience: '1+ usuários',
    storage: '30 GiB pooled / usuário / mês',
    highlights: [
      'Ecossistema completo de conectores',
      'Enterprise Search com permissões',
      'Respostas combinadas (busca + geração)',
      'Criação no-code de agentes · Gemini Code Assist Standard'
    ]
  },
  {
    id: 'plus',
    name: 'Gemini Enterprise Plus',
    audience: '1+ usuários',
    storage: '75 GiB pooled / usuário / mês',
    highlights: [
      'Conectores completos',
      'Google Search e web grounding',
      'NotebookLM Enterprise (criação e publicação)',
      'Code agent completo, modelos prioritários'
    ]
  },
  {
    id: 'frontline',
    name: 'Gemini Enterprise Frontline',
    audience: '150+ usuários (Standard/Plus)',
    storage: '2 GiB pooled / usuário / mês',
    highlights: [
      'Conectores limitados',
      'Agentes no-code (apenas admin)',
      'Compliance enterprise',
      'Leitura de agentes pré-criados'
    ]
  }
];
