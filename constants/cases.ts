export type GoogleCredential = {
  id: string;
  badgeKey: string;
  title: string;
  category: 'Specialization' | 'Expertise' | 'Partner Tier';
  description: string;
  guarantee: string;
};

export const googleCredentials: GoogleCredential[] = [
  {
    id: 'premier-partner',
    badgeKey: 'premier-partner',
    title: 'Google Cloud Premier Partner',
    category: 'Partner Tier',
    description: 'Nível máximo de parceria com a Google Cloud no Brasil, exigindo volume de negócios auditado e corpo técnico altamente certificado.',
    guarantee: 'Acesso direto a engajamento de engenharia da Google e condições contratuais diferenciadas.'
  },
  {
    id: 'work-transformation',
    badgeKey: 'work-transformation-ent',
    title: 'Work Transformation - Enterprise',
    category: 'Specialization',
    description: 'Especialização técnica formal concedida após auditoria de casos complexos de migração e arquitetura de colaboração em grande escala.',
    guarantee: 'Metodologia homologada pela Google para migração de dados sem interrupção operacional.'
  },
  {
    id: 'google-cloud-sell',
    badgeKey: 'sell-expert',
    title: 'Google Cloud Sell & Service Expert',
    category: 'Expertise',
    description: 'Capacitação completa para comercialização, faturamento nacional (BRL) e gestão continuada de ambiente Google Cloud.',
    guarantee: 'Faturamento direto em reais com suporte e faturamento customizado para empresas e governo.'
  },
  {
    id: 'appsheet-certified',
    badgeKey: 'appsheet-certified',
    title: 'AppSheet Certified Professional',
    category: 'Expertise',
    description: 'Certificação em desenvolvimento e governança de aplicações no-code/low-code integradas ao Workspace e GCP.',
    guarantee: 'Criação de aplicativos de processo com governança de dados e controle de acesso enterprise.'
  }
];

export const trackRecord = [
  { value: 'Premier', label: 'Partner Google Cloud' },
  { value: '100%', label: 'Faturamento em BRL / Impostos Nacionais' },
  { value: 'ATAs', label: 'Vigentes para Adesão Pública' },
  { value: '10+', label: 'Anos de atuação no mercado de TI' }
] as const;
