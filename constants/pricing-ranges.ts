/**
 * Configuração de cada plano para o estimador de escala.
 * Sem valores monetários — preserva política de "sem preços públicos".
 * Mostra o que vem incluído em cada plano à medida que a operação cresce.
 */

export type ScalePlan = {
  planId: string;
  label: string;
  shortLabel: string;
  audience: string;
  storagePerUserGb: number; // 0 = personalizado
  meetCap: number;
  highlights: string[];
  governance: 'Essencial' | 'Intermediária' | 'Avançada' | 'Enterprise';
  aiTier: 'Essencial' | 'Ampliado' | 'Take notes' | 'Enterprise';
};

export const scalePlans: ScalePlan[] = [
  {
    planId: 'workspace-starter',
    label: 'Google Workspace Starter',
    shortLabel: 'Starter',
    audience: 'Pequenas equipes em entrada',
    storagePerUserGb: 30,
    meetCap: 100,
    governance: 'Essencial',
    aiTier: 'Essencial',
    highlights: ['Gmail corporativo', 'Drive + Docs', 'Gemini essencial']
  },
  {
    planId: 'workspace-standard',
    label: 'Google Workspace Standard',
    shortLabel: 'Standard',
    audience: 'Equipes em crescimento',
    storagePerUserGb: 2048,
    meetCap: 150,
    governance: 'Intermediária',
    aiTier: 'Ampliado',
    highlights: ['Gravação Meet', 'Drives compartilhados', 'Gemini ampliado']
  },
  {
    planId: 'workspace-plus',
    label: 'Google Workspace Plus',
    shortLabel: 'Plus',
    audience: 'Operações estruturadas',
    storagePerUserGb: 5120,
    meetCap: 500,
    governance: 'Avançada',
    aiTier: 'Take notes',
    highlights: ['Vault + DLP', 'Take notes Gemini', 'NotebookLM Plus']
  },
  {
    planId: 'workspace-enterprise',
    label: 'Google Workspace Enterprise',
    shortLabel: 'Enterprise',
    audience: 'Grandes empresas e instituições',
    storagePerUserGb: 0, // personalizado
    meetCap: 1000,
    governance: 'Enterprise',
    aiTier: 'Enterprise',
    highlights: ['DLP + S/MIME', 'Cloud Identity Premium', 'Meet até 1.000']
  }
];

export function findPlan(planId: string) {
  return scalePlans.find((p) => p.planId === planId) ?? scalePlans[1];
}

export function formatStorage(perUserGb: number, users: number): string {
  if (perUserGb === 0) return 'Personalizado';
  const totalGb = perUserGb * users;
  if (totalGb >= 1024) {
    const tb = totalGb / 1024;
    return tb >= 100
      ? `${Math.round(tb).toLocaleString('pt-BR')} TB`
      : `${tb.toFixed(1).replace('.', ',')} TB`;
  }
  return `${totalGb.toLocaleString('pt-BR')} GB`;
}

export function formatNumber(n: number) {
  return n.toLocaleString('pt-BR');
}
