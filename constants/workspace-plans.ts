// constants/workspace-plans.ts
export type WorkspaceTier = 'frontline' | 'enterprise';

export type WorkspacePlanId =
  | 'wks-fl-starter'
  | 'wks-fl-std'
  | 'wks-fl-plus'
  | 'wks-ent-essentials'
  | 'wks-ent-essentials-plus'
  | 'wks-ent-starter'
  | 'wks-ent-std'
  | 'wks-ent-plus';

export type WorkspacePlan = {
  id: WorkspacePlanId;
  tier: WorkspaceTier;
  /** Nome completo, ex: "Frontline Starter" */
  name: string;
  /** Nome curto para o card, ex: "Starter" */
  shortName: string;
  /** Preço por usuário por mês em BRL. */
  pricePerUser: number;
  /** 1 frase descrevendo público-alvo. */
  audience: string;
  /** Marca o plano com selo "Recomendado". Por design, EXATAMENTE 1 plano no array tem true. */
  recommended: boolean;
  /** 4-5 bullets que aparecem no card. */
  highlights: string[];
  /** Texto do botão. Default "Falar com Especialista". */
  cta: string;
};

export const workspacePlans: WorkspacePlan[] = [
  {
    id: 'wks-fl-starter',
    tier: 'frontline',
    name: 'Frontline Starter',
    shortName: 'Starter',
    pricePerUser: 30,
    audience: 'Operação de frontline com necessidade básica de Gmail e colaboração.',
    recommended: false,
    highlights: [
      'Gmail corporativo',
      '5 GB por usuário',
      'Docs, Sheets, Slides',
      'Meet até 100 participantes',
      'MDM básico e avançado'
    ],
    cta: 'Falar com Especialista'
  },
  {
    id: 'wks-fl-std',
    tier: 'frontline',
    name: 'Frontline Standard',
    shortName: 'Standard',
    pricePerUser: 70,
    audience: 'Frontline com governança intermediária e identidade reforçada.',
    recommended: false,
    highlights: [
      'Tudo do Starter',
      'Google Vault (retenção / eDiscovery)',
      'Context-Aware Access',
      'Cloud Identity Premium',
      'AppSheet incluso'
    ],
    cta: 'Falar com Especialista'
  },
  {
    id: 'wks-fl-plus',
    tier: 'frontline',
    name: 'Frontline Plus',
    shortName: 'Plus',
    pricePerUser: 93,
    audience: 'Frontline com governança avançada, DLP e Central de Segurança.',
    recommended: false,
    highlights: [
      'Tudo do Standard',
      'DLP (Data Loss Prevention)',
      'Central de Segurança',
      'Criptografia S/MIME',
      'Vault + Cloud Identity Premium'
    ],
    cta: 'Falar com Especialista'
  },
  {
    id: 'wks-ent-essentials',
    tier: 'enterprise',
    name: 'Enterprise Essentials',
    shortName: 'Essentials',
    pricePerUser: 58,
    audience: 'Empresa que já tem e-mail próprio e quer Drive, Docs e Meet com mais espaço.',
    recommended: false,
    highlights: [
      'SEM Gmail (use seu provedor atual)',
      '1 TB por usuário',
      'Drives compartilhados',
      'Meet até 150 + gravação',
      'AppSheet incluso'
    ],
    cta: 'Falar com Especialista'
  },
  {
    id: 'wks-ent-essentials-plus',
    tier: 'enterprise',
    name: 'Enterprise Essentials Plus',
    shortName: 'Essentials Plus',
    pricePerUser: 116,
    audience: 'Essentials com governança enterprise e Meet em larga escala.',
    recommended: false,
    highlights: [
      'SEM Gmail (use seu provedor atual)',
      '5 TB por usuário',
      'Meet até 500 + transmissão 10k',
      'Vault + DLP + Cloud Identity Premium',
      'Regiões de Dados (Data Locality)'
    ],
    cta: 'Falar com Especialista'
  },
  {
    id: 'wks-ent-starter',
    tier: 'enterprise',
    name: 'Enterprise Starter',
    shortName: 'Starter',
    pricePerUser: 63.9,
    audience: 'Entrada Enterprise com Gmail e Drives compartilhados.',
    recommended: false,
    highlights: [
      'Gmail corporativo',
      '1 TB por usuário',
      'Drives compartilhados',
      'Meet até 250 + gravação',
      'MDM avançado'
    ],
    cta: 'Falar com Especialista'
  },
  {
    id: 'wks-ent-std',
    tier: 'enterprise',
    name: 'Enterprise Standard',
    shortName: 'Standard',
    pricePerUser: 156.2,
    audience: 'Enterprise consolidado com governança avançada e capacidade reforçada.',
    recommended: true,
    highlights: [
      'Gmail corporativo',
      '5 TB por usuário',
      'Meet até 500 + transmissão 10k',
      'Vault + DLP + Central de Segurança',
      'Regiões de Dados'
    ],
    cta: 'Falar com Especialista'
  },
  {
    id: 'wks-ent-plus',
    tier: 'enterprise',
    name: 'Enterprise Plus',
    shortName: 'Plus',
    pricePerUser: 203,
    audience: 'Maior tier — compliance e criptografia ponta a ponta.',
    recommended: false,
    highlights: [
      'Tudo do Standard',
      '5 TB+ por usuário',
      'Meet até 1.000 + transmissão 100k',
      'Criptografia S/MIME e CSE',
      'Central de Segurança completa'
    ],
    cta: 'Falar com Especialista'
  }
];

/** Helper: formata pricePerUser para "R$ 30" ou "R$ 156,20" (com vírgula decimal pt-BR). */
export function formatPlanPrice(price: number): string {
  const integer = Math.trunc(price);
  const decimal = Math.round((price - integer) * 100);
  if (decimal === 0) return `R$ ${integer}`;
  return `R$ ${integer},${decimal.toString().padStart(2, '0')}`;
}
