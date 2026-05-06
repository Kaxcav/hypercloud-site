/**
 * Heurísticas de faixa de investimento por usuário/mês.
 * Não publica preço fixo — apenas sinaliza ordem de grandeza para o cliente.
 * Calibrar com a equipe comercial; estes valores são placeholders realistas em BRL.
 */

export type PricingRange = {
  planId: string;
  label: string;
  shortLabel: string;
  audience: string;
  perUserMonth: { min: number; max: number };
  highlights: string[];
};

export const pricingRanges: PricingRange[] = [
  {
    planId: 'workspace-starter',
    label: 'Google Workspace Starter',
    shortLabel: 'Starter',
    audience: 'Pequenas equipes em entrada',
    perUserMonth: { min: 35, max: 55 },
    highlights: ['30 GB / usuário', 'Meet até 100', 'Gemini essencial']
  },
  {
    planId: 'workspace-standard',
    label: 'Google Workspace Standard',
    shortLabel: 'Standard',
    audience: 'Equipes em crescimento',
    perUserMonth: { min: 70, max: 110 },
    highlights: ['2 TB / usuário', 'Gravação Meet', 'Gemini ampliado']
  },
  {
    planId: 'workspace-plus',
    label: 'Google Workspace Plus',
    shortLabel: 'Plus',
    audience: 'Operações estruturadas',
    perUserMonth: { min: 130, max: 200 },
    highlights: ['5 TB / usuário', 'Vault + DLP', 'Take notes Gemini']
  },
  {
    planId: 'workspace-enterprise',
    label: 'Google Workspace Enterprise',
    shortLabel: 'Enterprise',
    audience: 'Grandes empresas e instituições',
    perUserMonth: { min: 220, max: 360 },
    highlights: ['Sob política', 'DLP, S/MIME, Cloud Identity', 'Meet até 1.000']
  }
];

export function findRange(planId: string) {
  return pricingRanges.find((p) => p.planId === planId) ?? pricingRanges[1];
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}
