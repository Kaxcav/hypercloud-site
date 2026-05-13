# Pricing-First Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganizar a home Hypercloud para um modelo pricing-first (Google Workspace pricing-style) com preço Workspace público, badges em destaque acima da dobra, compare-all table substituindo o comparator interativo, e remoção do funil de conversão atual (WhyHypercloud, Process, InvestmentEstimator).

**Architecture:** Refator em 3 fases isoladas via branches separadas, cada uma pode ser merged independente. Fase 1: dados novos como ARQUIVOS NOVOS (não refator in-place), zero impacto visual. Fase 2: componentes novos renderizam em rota `/preview` (não-indexada) — home original intacta. Fase 3: cutover — home swap, anchors atualizados, código morto deletado, `/preview` removido. End state: 7 seções (Hero compacto, Badges, PricingGrid, CompareAll, OtherSolutions, Faq, SpecialistCta).

**Tech Stack:** Next.js 14 App Router · React 18 · TypeScript strict (`noEmit: true`) · TailwindCSS · framer-motion · lucide-react · react-hook-form + zod (existentes). Sem novas dependências.

**Spec:** `docs/superpowers/specs/2026-05-12-pricing-first-home-design.md`

**Deviation note:** Spec descreve refator in-place de `constants/plans.ts` e `constants/features.ts`. Plano implementa com arquivos novos (`constants/workspace-plans.ts`, `constants/workspace-features.ts`) durante Fases 1-2 pra zero risco de quebrar consumers atuais. Fase 3 deleta os arquivos antigos junto com seus consumers (ComparisonExplorer, ProductCard, etc) — end state idêntico ao spec.

**Verificação padrão (executada ao fim de toda task que mexe em código):**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign
npx tsc --noEmit && npx next lint
```

Esperado: sem erros TS, "✔ No ESLint warnings or errors". Se quebrar, ler o erro, corrigir, repetir antes de prosseguir.

---

## Phase 1 — Data Refactor

**Branch sugerida:** `feat/pricing-first-data` (ou direto em `main` se preferir o estilo atual do projeto).

**Objetivo:** Criar os 4 arquivos novos de constants sem tocar em nenhum componente. Home renderiza igual a antes; lint e typecheck passam limpos.

### Task 1.1: Create `constants/workspace-plans.ts`

**Files:**
- Create: `constants/workspace-plans.ts`

- [ ] **Step 1: Write file**

```ts
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
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

Esperado: limpo.

- [ ] **Step 3: Commit**

```bash
git add constants/workspace-plans.ts
git commit -m "feat(constants): adiciona workspace-plans.ts com 8 SKUs e preço público"
```

---

### Task 1.2: Create `constants/workspace-features.ts`

**Files:**
- Create: `constants/workspace-features.ts`

- [ ] **Step 1: Write file**

```ts
// constants/workspace-features.ts
import type { WorkspacePlanId } from './workspace-plans';

export type FeatureBlock = 'Geral' | 'Armaz.' | 'Colab.' | 'Comun.' | 'Segur.' | 'Compl.';

export type CellValue =
  | { kind: 'check' }
  | { kind: 'cross' }
  | { kind: 'text'; value: string };

export type WorkspaceFeatureRow = {
  block: FeatureBlock;
  feature: string;
  values: Record<WorkspacePlanId, CellValue>;
};

const check: CellValue = { kind: 'check' };
const cross: CellValue = { kind: 'cross' };
const text = (value: string): CellValue => ({ kind: 'text', value });

export const workspaceFeatures: WorkspaceFeatureRow[] = [
  // Geral
  {
    block: 'Geral',
    feature: 'Gmail (e-mail corporativo)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': cross,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Geral',
    feature: 'Limite de usuários',
    values: {
      'wks-fl-starter': text('Ilim.'),
      'wks-fl-std': text('Ilim.'),
      'wks-fl-plus': text('Ilim.'),
      'wks-ent-essentials': text('Ilim.'),
      'wks-ent-essentials-plus': text('Ilim.'),
      'wks-ent-starter': text('Ilim.'),
      'wks-ent-std': text('Ilim.'),
      'wks-ent-plus': text('Ilim.')
    }
  },
  // Armaz.
  {
    block: 'Armaz.',
    feature: 'Espaço por usuário',
    values: {
      'wks-fl-starter': text('5 GB'),
      'wks-fl-std': text('5 GB'),
      'wks-fl-plus': text('5 GB'),
      'wks-ent-essentials': text('1 TB'),
      'wks-ent-essentials-plus': text('5 TB'),
      'wks-ent-starter': text('1 TB'),
      'wks-ent-std': text('5 TB'),
      'wks-ent-plus': text('5 TB+')
    }
  },
  {
    block: 'Armaz.',
    feature: 'Drives compartilhados',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  // Colab.
  {
    block: 'Colab.',
    feature: 'Google Docs, Sheets, Slides',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Colab.',
    feature: 'AppSheet (apps sem código)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  // Comun.
  {
    block: 'Comun.',
    feature: 'Meet: participantes',
    values: {
      'wks-fl-starter': text('100'),
      'wks-fl-std': text('100'),
      'wks-fl-plus': text('100'),
      'wks-ent-essentials': text('150'),
      'wks-ent-essentials-plus': text('500'),
      'wks-ent-starter': text('250'),
      'wks-ent-std': text('500'),
      'wks-ent-plus': text('1.000')
    }
  },
  {
    block: 'Comun.',
    feature: 'Meet: gravação no Drive',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Comun.',
    feature: 'Meet: cancelamento de ruído',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Comun.',
    feature: 'Meet: transmissão ao vivo (domínio)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': text('10k'),
      'wks-ent-starter': cross,
      'wks-ent-std': text('10k'),
      'wks-ent-plus': text('100k')
    }
  },
  // Segur.
  {
    block: 'Segur.',
    feature: 'MDM básico (mobile)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'MDM avançado (wipe, app mgmt)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Context-Aware Access',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Central de Segurança',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Criptografia S/MIME',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': cross,
      'wks-ent-starter': cross,
      'wks-ent-std': cross,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Criptografia do lado do cliente (CSE)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': cross,
      'wks-ent-starter': cross,
      'wks-ent-std': cross,
      'wks-ent-plus': check
    }
  },
  // Compl.
  {
    block: 'Compl.',
    feature: 'Google Vault (retenção / eDiscovery)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Compl.',
    feature: 'DLP (Data Loss Prevention)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Compl.',
    feature: 'Cloud Identity Premium',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Compl.',
    feature: 'Regiões de Dados (Data Locality)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  }
];

/** Ordem fixa das colunas — usado pelo CompareAllTable como source of truth. */
export const workspacePlanOrder: WorkspacePlanId[] = [
  'wks-fl-starter',
  'wks-fl-std',
  'wks-fl-plus',
  'wks-ent-essentials',
  'wks-ent-essentials-plus',
  'wks-ent-starter',
  'wks-ent-std',
  'wks-ent-plus'
];

/** Colunas curadas para o modo mobile-compacto do CompareAllTable. */
export const workspacePlanMobileCurated: WorkspacePlanId[] = [
  'wks-fl-plus',
  'wks-ent-std',
  'wks-ent-plus'
];
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add constants/workspace-features.ts
git commit -m "feat(constants): adiciona workspace-features.ts com matriz 19x8 V/X/texto"
```

---

### Task 1.3: Create `constants/gemini-editions.ts`

**Files:**
- Create: `constants/gemini-editions.ts`

- [ ] **Step 1: Write file**

Conteúdo extraído da página `docs.cloud.google.com/gemini/enterprise/docs/editions?hl=pt-br`.

```ts
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
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add constants/gemini-editions.ts
git commit -m "feat(constants): adiciona gemini-editions.ts com 4 SKUs"
```

---

### Task 1.4: Create `constants/badges.ts`

**Files:**
- Create: `constants/badges.ts`

Placeholder usa os 6 JPEGs em `public/logo/logos partner/` enquanto os arquivos definitivos não chegam. Quando chegarem, basta substituir o array.

- [ ] **Step 1: Write file**

```ts
// constants/badges.ts
export type Badge = {
  /** Caminho relativo a `/public`. Ex: '/logo/logos partner/x.jpeg'. */
  file: string;
  alt: string;
  /** Label curta exibida abaixo do logo. Ex: "Select Technology Partner". */
  label: string;
  /** Família do badge — usado em filtros futuros, opcional. */
  family?: 'google-cloud' | 'google-workspace';
};

export const badges: Badge[] = [
  {
    file: '/logo/logos partner/google-clound_select-Tecnology_partner.jpeg',
    alt: 'Google Cloud Select Technology Partner',
    label: 'Select Technology Partner',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-clound_select-services-partner.jpeg',
    alt: 'Google Cloud Select Services Partner',
    label: 'Select Services Partner',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-clound_select-Co-sell_partner.jpeg',
    alt: 'Google Cloud Select Co-Sell Partner',
    label: 'Select Co-Sell Partner',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-clound_competency-chrome.jpeg',
    alt: 'Google Cloud Competency — Chrome Enterprise',
    label: 'Competency — Chrome Enterprise',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-workspace_premier-Co-sell-service_partner.jpeg',
    alt: 'Google Workspace Premier Co-Sell Service Partner',
    label: 'Premier Co-Sell Partner',
    family: 'google-workspace'
  },
  {
    file: '/logo/logos partner/google-workspace_select_tecnology_partner.jpeg',
    alt: 'Google Workspace Select Technology Partner',
    label: 'Select Technology Partner',
    family: 'google-workspace'
  }
];
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add constants/badges.ts
git commit -m "feat(constants): adiciona badges.ts com 6 credenciais placeholder"
```

---

### Task 1.5: Smoke-test Phase 1 — home renderiza igual

**Files:** *(read-only)*

- [ ] **Step 1: Start dev server**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign
npm run dev
```

Em outro terminal ou aba, abrir `http://localhost:3000/`.

- [ ] **Step 2: Visual smoke**

Verificar:
- Home renderiza exatamente como antes (Hero foto laranja, AtasStrip, ProductCard grid de Soluções, WhyHypercloud, Cases, ComparisonExplorer, Process, InvestmentEstimator, Faq, SpecialistCta).
- Console do browser sem erros.
- Navbar com links `Soluções` (#solucoes), `Comparar` (#comparador) — funcionando como antes.

- [ ] **Step 3: Parar dev server e prosseguir**

`Ctrl+C` no terminal do dev.

**Critério de merge Fase 1:** lint+typecheck limpos; home idêntica visualmente; sem novos consumers dos arquivos novos (eles existem mas nada importa deles ainda).

Se for branch separada: abrir PR `feat/pricing-first-data` → `main`, merge.

---

## Phase 2 — New Components in `/preview`

**Branch sugerida:** `feat/pricing-first-components` (a partir de `main` após Fase 1).

**Objetivo:** Criar todos os componentes da home nova + rota `/preview` que renderiza a composição completa. Home original em `/` continua intocada. Stakeholder revisa `/preview` antes da Fase 3.

### Task 2.1: Create `components/HeroV2.tsx` (hero compacto)

**Files:**
- Create: `components/HeroV2.tsx`

Diferenças vs `Hero.tsx` atual: sem stats grandes, sem painel direito de "Stack Google", sem pill de credenciais, sem o botão "Ver ATAs vigentes" (ATAs viraram seção `BadgesShowcase`/`AtasStrip` em outras páginas). Animação de entrada via `motion.div` inline com `animate` direto, não `whileInView` — previne o bug do hero invisível reportado em 12/05 e revertido em `9e5b709f`.

- [ ] **Step 1: Write file**

```tsx
// components/HeroV2.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';

const REVEAL = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }
};

export function HeroV2() {
  const { open: openLead } = useLeadDialog();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border"
    >
      {/* Background photo with orange tint */}
      <motion.div
        style={{ y: yPhoto }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src="/photos/hero-team.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(124,45,18,0.92)_0%,rgba(194,65,12,0.78)_45%,rgba(249,115,22,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </motion.div>

      <div className="container-shell relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={REVEAL.transition}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <PulseDot />
              Premier Google Cloud Partner · ATAs vigentes
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={{ ...REVEAL.transition, delay: 0.06 }}
            className="mt-6 text-balance text-[40px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] sm:text-[52px] lg:text-[64px] lg:leading-[0.98]"
          >
            Google Workspace com{' '}
            <span className="font-serif italic font-normal tracking-[-0.02em] text-white/95">
              preço público.
            </span>{' '}
            Cloud, IA e produtividade — contrato direto.
          </motion.h1>

          <motion.p
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={{ ...REVEAL.transition, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8"
          >
            Veja os planos, compare e fale com um especialista. Sem funil enrolado.
          </motion.p>

          <motion.div
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={{ ...REVEAL.transition, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition hover:bg-white/95"
            >
              Ver planos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => openLead()}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Falar com Especialista
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
    </span>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add components/HeroV2.tsx
git commit -m "feat(home-v2): adiciona HeroV2 compacto com motion inline"
```

---

### Task 2.2: Create `components/BadgesShowcase.tsx`

**Files:**
- Create: `components/BadgesShowcase.tsx`

- [ ] **Step 1: Write file**

```tsx
// components/BadgesShowcase.tsx
import Image from 'next/image';
import { badges } from '@/constants/badges';

export function BadgesShowcase() {
  return (
    <section
      aria-label="Credenciais Google e parceiros"
      className="border-b border-border bg-surface-card"
    >
      <div className="container-shell py-12 sm:py-14 lg:py-16">
        <div className="flex items-center justify-center gap-2.5">
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted sm:text-[11px]">
            Premier Google Cloud Partner · Credenciais oficiais
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => (
            <div
              key={badge.file}
              className="group flex flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-surface-soft p-4 transition hover:-translate-y-0.5 hover:border-brand-500/40 hover:bg-surface-card hover:shadow-medium"
            >
              <div className="flex h-16 items-center justify-center">
                <Image
                  src={badge.file}
                  alt={badge.alt}
                  width={140}
                  height={64}
                  className="max-h-[60px] w-auto object-contain"
                />
              </div>
              <p className="text-center text-[11.5px] font-bold leading-snug text-text-strong">
                {badge.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-7 text-center text-[12.5px] leading-relaxed text-text-muted">
          Hypercloud é uma das poucas no Brasil com{' '}
          <span className="font-bold text-text-strong">Premier Partner</span>{' '}
          e <span className="font-bold text-text-strong">ATAs vigentes</span> para o setor público.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add components/BadgesShowcase.tsx
git commit -m "feat(home-v2): adiciona BadgesShowcase com 6 credenciais em grid"
```

---

### Task 2.3: Create `components/PricingGrid.tsx`

**Files:**
- Create: `components/PricingGrid.tsx`

Componente client com tabs Frontline / Enterprise. Default = Enterprise. URL hash deep-link `#pricing-frontline` / `#pricing-enterprise`. Plano com `recommended: true` ganha borda brand + selo "Recomendado".

- [ ] **Step 1: Write file**

```tsx
// components/PricingGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import {
  workspacePlans,
  formatPlanPrice,
  type WorkspacePlan,
  type WorkspaceTier
} from '@/constants/workspace-plans';
import { cn } from '@/components/ui';

const tabs: { id: WorkspaceTier; label: string; hint: string }[] = [
  { id: 'frontline', label: 'Frontline', hint: 'Operação · suporte · campo' },
  { id: 'enterprise', label: 'Enterprise', hint: 'Empresas e instituições' }
];

export function PricingGrid() {
  const [activeTier, setActiveTier] = useState<WorkspaceTier>('enterprise');
  const { open: openLead } = useLeadDialog();

  // Deep-link via hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash === '#pricing-frontline') setActiveTier('frontline');
    if (hash === '#pricing-enterprise') setActiveTier('enterprise');
  }, []);

  const visiblePlans = workspacePlans.filter((p) => p.tier === activeTier);

  function handleTabChange(tier: WorkspaceTier) {
    setActiveTier(tier);
    if (typeof window !== 'undefined') {
      const newHash = tier === 'frontline' ? 'pricing-frontline' : 'pricing-enterprise';
      window.history.replaceState(null, '', `#${newHash}`);
    }
  }

  return (
    <div className="container-shell py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-600">
          Preços Google Workspace
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-5xl">
          Tabela aberta.{' '}
          <span className="font-serif italic font-normal text-gradient-brand">
            Cotação na conversa.
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Valores de tabela em BRL por usuário/mês. Sujeitos a condições comerciais
          e ATAs vigentes.
        </p>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Família de planos"
        className="mx-auto mt-10 inline-flex w-full max-w-sm rounded-full border border-border bg-surface-card p-1 shadow-soft sm:flex sm:justify-center"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTier;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex-1 rounded-full px-4 py-2 text-[13px] font-bold transition',
                active
                  ? 'bg-brand-gradient text-white shadow-brand'
                  : 'text-text-muted hover:text-text-strong'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-center text-[12px] text-text-subtle">
        {tabs.find((t) => t.id === activeTier)?.hint}
      </p>

      {/* Cards grid */}
      <div
        id={activeTier === 'frontline' ? 'pricing-frontline' : 'pricing-enterprise'}
        className={cn(
          'mt-10 grid gap-5',
          // Frontline = 3 cards, Enterprise = 5 cards
          activeTier === 'frontline'
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        )}
      >
        {visiblePlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} onContact={openLead} />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-[12px] leading-relaxed text-text-subtle">
        Valores de tabela. Sujeitos a condições comerciais e ATAs vigentes.{' '}
        <a href="#compare-all" className="underline underline-offset-2 hover:text-text-muted">
          Ver tabela completa de recursos
        </a>
        .
      </p>
    </div>
  );
}

function PricingCard({
  plan,
  onContact
}: {
  plan: WorkspacePlan;
  onContact: (context?: string) => void;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-surface-card p-6 transition',
        plan.recommended
          ? 'border-brand-500/60 shadow-[0_24px_60px_-30px_rgba(249,115,22,0.5)] ring-1 ring-brand-500/30'
          : 'border-border shadow-soft hover:-translate-y-0.5 hover:shadow-medium'
      )}
    >
      {plan.recommended ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white shadow-brand">
          Recomendado
        </span>
      ) : null}

      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
        {plan.tier === 'frontline' ? 'Frontline' : 'Enterprise'}
      </p>
      <h3 className="mt-1.5 text-xl font-extrabold text-text-strong">
        {plan.shortName}
      </h3>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-[40px] font-extrabold leading-none tracking-tight text-text-strong">
          {formatPlanPrice(plan.pricePerUser)}
        </span>
        <span className="text-[12.5px] font-medium text-text-muted">/usuário/mês</span>
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-text-muted">
        {plan.audience}
      </p>

      <ul className="mt-6 space-y-2">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span className="text-[13px] leading-snug text-text">{h}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onContact(`Pricing — ${plan.name}`)}
        className={cn(
          'mt-7 inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-[13px] font-bold transition',
          plan.recommended
            ? 'bg-brand-gradient text-white shadow-brand hover:opacity-95'
            : 'border border-border bg-surface-soft text-text-strong hover:border-brand-500/40'
        )}
      >
        {plan.cta}
      </button>

      <p className="mt-2 text-center text-[11px] text-text-subtle">
        Cotação para 50+ usuários
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add components/PricingGrid.tsx
git commit -m "feat(home-v2): adiciona PricingGrid com tabs Frontline/Enterprise"
```

---

### Task 2.4: Create `components/CompareAllTable.tsx`

**Files:**
- Create: `components/CompareAllTable.tsx`

Tabela 19 features × 8 planos. Desktop mostra todos os 8 com header sticky. Mobile default mostra apenas 3 curados; botão "Ver todos os 8 planos" expande pro horizontal-scroll com sticky feature column.

- [ ] **Step 1: Write file**

```tsx
// components/CompareAllTable.tsx
'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import {
  workspaceFeatures,
  workspacePlanOrder,
  workspacePlanMobileCurated,
  type CellValue,
  type FeatureBlock
} from '@/constants/workspace-features';
import {
  workspacePlans,
  formatPlanPrice,
  type WorkspacePlan,
  type WorkspacePlanId
} from '@/constants/workspace-plans';
import { cn } from '@/components/ui';

const BLOCK_ORDER: FeatureBlock[] = ['Geral', 'Armaz.', 'Colab.', 'Comun.', 'Segur.', 'Compl.'];
const BLOCK_LABEL: Record<FeatureBlock, string> = {
  Geral: 'Geral',
  'Armaz.': 'Armazenamento',
  'Colab.': 'Colaboração',
  Comun.: 'Comunicação',
  Segur.: 'Segurança',
  Compl.: 'Compliance'
};

export function CompareAllTable() {
  const [expanded, setExpanded] = useState(false);
  const { open: openLead } = useLeadDialog();

  const planMap = new Map(workspacePlans.map((p) => [p.id, p]));

  // Mobile: default mostra apenas 3 colunas; expanded mostra todas as 8.
  const mobileVisiblePlanIds = expanded ? workspacePlanOrder : workspacePlanMobileCurated;

  // Agrupa features por bloco preservando ordem
  const featuresByBlock = BLOCK_ORDER.map((block) => ({
    block,
    rows: workspaceFeatures.filter((f) => f.block === block)
  })).filter((g) => g.rows.length > 0);

  return (
    <div className="container-shell py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
          Tabela completa
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
          Compare todos os planos Workspace.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          {workspaceFeatures.length} recursos · 8 SKUs · sem letrinha miúda.
        </p>
      </div>

      {/* Mobile expand toggle */}
      <div className="mt-8 md:hidden">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full rounded-md border border-border bg-surface-card px-4 py-3 text-[12.5px] font-bold text-text-strong shadow-soft transition hover:border-brand-500/40"
        >
          {expanded ? 'Ocultar planos secundários' : 'Ver todos os 8 planos →'}
        </button>
        <p className="mt-2 text-center text-[11.5px] text-text-subtle">
          {expanded ? 'Role lateralmente para ver todos.' : 'Mostrando 3 destaques. Toque acima pra ver todos.'}
        </p>
      </div>

      <div
        className={cn(
          'mt-6 overflow-x-auto rounded-2xl border border-border bg-surface-card shadow-soft',
          // No mobile, quando expandido, força scroll horizontal.
          expanded ? '' : ''
        )}
      >
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-surface-soft">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-surface-soft px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-text-subtle"
              >
                Recurso
              </th>
              {/* Desktop: todas as 8 colunas */}
              {workspacePlanOrder.map((planId) => {
                const plan = planMap.get(planId);
                if (!plan) return null;
                const isMobileVisible = mobileVisiblePlanIds.includes(planId);
                return (
                  <th
                    key={planId}
                    scope="col"
                    className={cn(
                      'px-3 py-3.5 text-center',
                      // Mobile: esconde colunas fora do curated/expanded
                      isMobileVisible ? '' : 'hidden md:table-cell'
                    )}
                  >
                    <PlanHeader plan={plan} />
                  </th>
                );
              })}
            </tr>
            {/* Price row */}
            <tr className="border-b border-border bg-surface-soft/40">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-surface-soft/40 px-4 py-3 text-[12px] font-semibold text-text-muted"
              >
                Valor de tabela
              </th>
              {workspacePlanOrder.map((planId) => {
                const plan = planMap.get(planId);
                if (!plan) return null;
                const isMobileVisible = mobileVisiblePlanIds.includes(planId);
                return (
                  <td
                    key={planId}
                    className={cn(
                      'px-3 py-3 text-center text-[13px] font-bold text-text-strong',
                      isMobileVisible ? '' : 'hidden md:table-cell'
                    )}
                  >
                    {formatPlanPrice(plan.pricePerUser)}
                    <span className="block text-[10.5px] font-normal text-text-subtle">
                      /usuário/mês
                    </span>
                  </td>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {featuresByBlock.map(({ block, rows }) => (
              <RenderBlock
                key={block}
                block={block}
                rows={rows}
                planOrder={workspacePlanOrder}
                mobileVisiblePlanIds={mobileVisiblePlanIds}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={() => openLead('Compare — Workspace')}
          className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-6 py-3 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
        >
          Ainda em dúvida? Falar com um especialista
        </button>
        <p className="text-[11.5px] text-text-subtle">
          Resposta em até 1 dia útil.
        </p>
      </div>
    </div>
  );
}

function PlanHeader({ plan }: { plan: WorkspacePlan }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-text-subtle">
        {plan.tier === 'frontline' ? 'Frontline' : 'Enterprise'}
      </span>
      <span className="text-[12.5px] font-extrabold text-text-strong">
        {plan.shortName}
      </span>
      {plan.recommended ? (
        <span className="mt-0.5 inline-flex rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-brand-600">
          Recomendado
        </span>
      ) : null}
    </div>
  );
}

function RenderBlock({
  block,
  rows,
  planOrder,
  mobileVisiblePlanIds
}: {
  block: FeatureBlock;
  rows: typeof workspaceFeatures;
  planOrder: WorkspacePlanId[];
  mobileVisiblePlanIds: WorkspacePlanId[];
}) {
  return (
    <>
      <tr className="bg-surface-muted/60">
        <td
          colSpan={1 + planOrder.length}
          className="sticky left-0 z-10 bg-surface-muted/60 px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-muted"
        >
          {BLOCK_LABEL[block]}
        </td>
      </tr>
      {rows.map((row) => (
        <tr key={row.feature} className="border-b border-border last:border-b-0">
          <th
            scope="row"
            className="sticky left-0 z-10 bg-surface-card px-4 py-3 text-left text-[12.5px] font-medium text-text"
          >
            {row.feature}
          </th>
          {planOrder.map((planId) => {
            const cell = row.values[planId];
            const isMobileVisible = mobileVisiblePlanIds.includes(planId);
            return (
              <td
                key={planId}
                className={cn(
                  'px-3 py-3 text-center',
                  isMobileVisible ? '' : 'hidden md:table-cell'
                )}
              >
                <Cell value={cell} />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

function Cell({ value }: { value: CellValue }) {
  if (value.kind === 'check') {
    return (
      <span aria-label="Incluído" className="inline-flex">
        <Check className="h-4 w-4 text-emerald-500" />
      </span>
    );
  }
  if (value.kind === 'cross') {
    return (
      <span aria-label="Não incluído" className="inline-flex">
        <X className="h-4 w-4 text-text-subtle/60" />
      </span>
    );
  }
  return (
    <span className="font-mono text-[11.5px] font-semibold text-text">
      {value.value}
    </span>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add components/CompareAllTable.tsx
git commit -m "feat(home-v2): adiciona CompareAllTable com modo mobile-compacto"
```

---

### Task 2.5: Create `components/OtherSolutions.tsx`

**Files:**
- Create: `components/OtherSolutions.tsx`

3 cards: Gemini Enterprise (com link "Ver editions"), Google Cloud, AppSheet (ambos "cotação na conversa").

- [ ] **Step 1: Write file**

```tsx
// components/OtherSolutions.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BrainCircuit, Cloud, Workflow } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { geminiEditions } from '@/constants/gemini-editions';

type Card = {
  icon: typeof Cloud;
  eyebrow: string;
  title: string;
  description: string;
  extra?: string;
  detailHref?: string;
  detailLabel?: string;
  leadContext: string;
};

export function OtherSolutions() {
  const { open: openLead } = useLeadDialog();

  const cards: Card[] = [
    {
      icon: BrainCircuit,
      eyebrow: 'IA aplicada',
      title: 'Gemini Enterprise',
      description:
        '4 editions com IA produtiva e Code Assist: Business, Standard, Plus e Frontline.',
      extra: geminiEditions.map((e) => e.name.replace('Gemini Enterprise ', '')).join(' · '),
      detailHref: '/solucoes/gemini-enterprise',
      detailLabel: 'Ver editions',
      leadContext: 'Gemini Enterprise'
    },
    {
      icon: Cloud,
      eyebrow: 'Infra & dados',
      title: 'Google Cloud',
      description:
        'Infraestrutura, dados, IA e segurança sob arquitetura. Projeto consultivo com Vertex AI e Cloud IAM.',
      leadContext: 'Google Cloud'
    },
    {
      icon: Workflow,
      eyebrow: 'Automação no-code',
      title: 'AppSheet',
      description:
        'Apps sem código para automatizar processos internos, formulários e aprovações com baixo atrito.',
      leadContext: 'AppSheet'
    }
  ];

  return (
    <section
      aria-label="Outras soluções Google"
      className="border-y border-border bg-surface-soft"
    >
      <div className="container-shell py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
            Outras soluções Google
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
            Além do Workspace,{' '}
            <span className="font-serif italic font-normal text-gradient-brand">
              também vendemos.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Cloud, IA standalone e automação no-code — cotação consultiva, sem tabela
            pública.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="flex flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-subtle">
                  {card.eyebrow}
                </p>
                <h3 className="mt-1.5 text-xl font-extrabold text-text-strong">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-text-muted">
                  {card.description}
                </p>
                {card.extra ? (
                  <p className="mt-2 font-mono text-[11.5px] font-semibold text-brand-600">
                    {card.extra}
                  </p>
                ) : null}
                <p className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-text-subtle">
                  Cotação na conversa
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => openLead(card.leadContext)}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-4 py-2.5 text-[12.5px] font-bold text-white shadow-brand transition hover:opacity-95"
                  >
                    Falar com Especialista
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  {card.detailHref && card.detailLabel ? (
                    <Link
                      href={card.detailHref}
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand-600 transition hover:text-brand-700"
                    >
                      {card.detailLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git add components/OtherSolutions.tsx
git commit -m "feat(home-v2): adiciona OtherSolutions com 3 cards (Gemini, Cloud, AppSheet)"
```

---

### Task 2.6: Create `components/EndpointVsCeu.tsx`

**Files:**
- Create: `components/EndpointVsCeu.tsx`

Componente usado na página `/solucoes/google-workspace` na Fase 3. Criado agora para isolar a Fase 3.

- [ ] **Step 1: Write file**

```tsx
// components/EndpointVsCeu.tsx
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { Smartphone, Cpu } from 'lucide-react';

const rows: { dim: string; endpoint: string; ceu: string }[] = [
  {
    dim: 'Foco principal',
    endpoint: 'Usuário e dispositivos multiplataforma (iOS, Android, Windows, Mac).',
    ceu: 'Hardware ChromeOS — o dispositivo em si.'
  },
  {
    dim: 'Escopo de controle',
    endpoint: 'Gerencia o acesso aos dados da empresa em qualquer aparelho.',
    ceu: 'Gerencia o sistema operacional e o hardware do Chromebook.'
  },
  {
    dim: 'Nível de restrição',
    endpoint: 'Exige senha, criptografia e apaga dados corporativos remotamente.',
    ceu: 'Bloqueia portas USB, desativa hardware, força modo quiosque e impede login fora do domínio.'
  },
  {
    dim: 'Instalação / provisionamento',
    endpoint: 'Baseado em perfil de trabalho ou login do usuário.',
    ceu: 'Zero-touch enrollment: o dispositivo já sai da caixa configurado para a empresa.'
  },
  {
    dim: 'Atualizações',
    endpoint: 'Controla versões de apps específicos.',
    ceu: 'Controla versão do ChromeOS e agenda updates.'
  },
  {
    dim: 'Preço / licenciamento',
    endpoint: 'Assinatura mensal por usuário (recorrente).',
    ceu: 'Licença por dispositivo (geralmente perpétua pela vida útil do hardware).'
  }
];

export function EndpointVsCeu() {
  return (
    <section
      aria-label="Endpoint Management vs Chrome Enterprise Upgrade"
      className="border-y border-border bg-surface-soft"
    >
      <div className="container-shell py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
            Gestão de dispositivos
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
            Endpoint Management vs{' '}
            <span className="font-serif italic font-normal text-gradient-brand">
              Chrome Enterprise Upgrade.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Comprar Workspace Enterprise Plus dá controle sobre{' '}
            <span className="font-semibold text-text-strong">dados e usuários</span>{' '}
            no Google. CEU é uma licença separada que controla o{' '}
            <span className="font-semibold text-text-strong">dispositivo ChromeOS</span>{' '}
            (hardware + sistema). Não são substitutos — são complementares em
            cenários com fleet Chromebook.
          </p>
        </div>

        {/* Mobile: accordion-like stack. Desktop: 2 columns side by side. */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <ColumnCard
            icon={Smartphone}
            title="Workspace Enterprise Plus"
            subtitle="Endpoint Management"
            rows={rows}
            field="endpoint"
          />
          <ColumnCard
            icon={Cpu}
            title="Chrome Enterprise Upgrade"
            subtitle="CEU"
            rows={rows}
            field="ceu"
          />
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-relaxed text-text-muted">
          <span className="font-bold text-text-strong">Resumo:</span> se você não tem
          Chromebooks, Endpoint Management resolve. Se tem fleet de Chromebooks
          corporativos com necessidade de bloqueio físico/OS, CEU é obrigatório —
          vendemos as duas.
        </p>

        <div className="mt-6 flex justify-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}

function ColumnCard({
  icon: Icon,
  title,
  subtitle,
  rows,
  field
}: {
  icon: typeof Smartphone;
  title: string;
  subtitle: string;
  rows: { dim: string; endpoint: string; ceu: string }[];
  field: 'endpoint' | 'ceu';
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-subtle">
            {subtitle}
          </p>
          <h3 className="text-[15px] font-extrabold text-text-strong">{title}</h3>
        </div>
      </div>

      <dl className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.dim}>
            <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-subtle">
              {row.dim}
            </dt>
            <dd className="mt-1 text-[13px] leading-relaxed text-text">{row[field]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CTAButton() {
  // 'use client' do arquivo permite useLeadDialog dentro de componente filho
  // contanto que o pai (EndpointVsCeu) também rode no client. Sem 'use client'
  // no topo do arquivo isso quebraria.
  const { open: openLead } = useLeadDialog();
  return (
    <button
      type="button"
      onClick={() => openLead('Workspace + CEU')}
      className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-[12.5px] font-bold text-white shadow-brand transition hover:opacity-95"
    >
      Falar com Especialista
    </button>
  );
}
```

- [ ] **Step 2: Adicionar diretiva 'use client'**

O componente usa `useLeadDialog` no `CTAButton`. Precisa rodar no client. Adicionar no topo do arquivo:

```tsx
'use client';
```

(Sobrescrevendo o que foi escrito acima — basta confirmar que a primeira linha é `'use client';`.)

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 4: Commit**

```bash
git add components/EndpointVsCeu.tsx
git commit -m "feat(home-v2): adiciona EndpointVsCeu para /solucoes/google-workspace"
```

---

### Task 2.7: Create `app/preview/page.tsx`

**Files:**
- Create: `app/preview/page.tsx`

Rota não-indexada que renderiza a home nova composta. Stakeholder revisa visualmente antes de Fase 3.

- [ ] **Step 1: Write file**

```tsx
// app/preview/page.tsx
import type { Metadata } from 'next';
import { HeroV2 } from '@/components/HeroV2';
import { BadgesShowcase } from '@/components/BadgesShowcase';
import { PricingGrid } from '@/components/PricingGrid';
import { CompareAllTable } from '@/components/CompareAllTable';
import { OtherSolutions } from '@/components/OtherSolutions';
import { Faq } from '@/components/Faq';
import { SpecialistCta } from '@/components/SpecialistCta';

export const metadata: Metadata = {
  title: 'Preview — Home Pricing-First',
  description: 'Preview interno da nova home Hypercloud. Não indexar.',
  robots: { index: false, follow: false }
};

export default function PreviewPage() {
  return (
    <>
      <HeroV2 />
      <BadgesShowcase />
      <section id="pricing"><PricingGrid /></section>
      <section id="compare-all"><CompareAllTable /></section>
      <OtherSolutions />
      <Faq />
      <SpecialistCta />
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Visual smoke test em /preview**

```bash
npm run dev
```

Abrir `http://localhost:3000/preview`. Conferir:

1. HeroV2 renderiza com a foto laranja, headline nova ("Google Workspace com preço público. Cloud, IA e produtividade — contrato direto."), 2 CTAs ("Ver planos" branco, "Falar com Especialista" outline) — **texto deve aparecer no load**, sem precisar de scroll.
2. BadgesShowcase mostra 6 badges em grid (2 cols mobile, 3 md, 6 lg) com label embaixo.
3. PricingGrid abre na tab Enterprise (default), mostra 5 cards. Card "Enterprise Standard" com borda laranja e selo "Recomendado". Click na tab Frontline mostra 3 cards. URL hash atualiza pra `#pricing-enterprise` / `#pricing-frontline`.
4. CompareAllTable: em desktop mostra 8 colunas + header sticky. Em mobile (Ctrl+Shift+M no DevTools → portrait), default mostra 3 colunas + botão "Ver todos os 8 planos →". Clicar expande pro horizontal-scroll.
5. OtherSolutions: 3 cards (Gemini com "Ver editions" linkando pra `/solucoes/gemini-enterprise`, Cloud e AppSheet sem detail link).
6. Faq renderiza (copy ainda antiga — vai mudar na Fase 3).
7. SpecialistCta no final.

Sem erros no console.

- [ ] **Step 4: Commit**

```bash
git add app/preview/page.tsx
git commit -m "feat(home-v2): adiciona rota /preview com home nova composta"
```

**Critério de merge Fase 2:** lint+typecheck limpos. `/preview` renderiza ponta a ponta. Home `/` original intocada.

Se branch separada: abrir PR `feat/pricing-first-components` → `main`, merge.

---

## Phase 3 — Cutover

**Branch sugerida:** `feat/pricing-first-cutover` (a partir de `main` após Fase 2).

**Objetivo:** Trocar a home oficialmente, atualizar Navbar/CommandPalette/Footer com âncoras novas, integrar AtasStrip+Cases no `/setor-publico`, inserir EndpointVsCeu em `/solucoes/google-workspace`, deletar todo código morto, atualizar CLAUDE.md e remover a rota `/preview`.

### Task 3.1: Atualiza âncoras em Navbar, CommandPalette, Footer e páginas internas

**Files:**
- Modify: `components/Navbar.tsx:15-16`
- Modify: `components/CommandPalette.tsx:62`
- Modify: `components/Footer.tsx:69`
- Modify: `app/sobre/page.tsx:76`
- Modify: `app/setor-publico/page.tsx:75`
- Modify: `app/solucoes/[slug]/page.tsx:101,106,168`

Lista exata vem do `grep -r "#solucoes\|#comparador" components/ app/` rodado em 12/05.

- [ ] **Step 1: Atualiza `components/Navbar.tsx`**

Trocar o array `links` (lines 14-21):

```tsx
const links = [
  { href: '/#pricing', label: 'Soluções' },
  { href: '/#compare-all', label: 'Comparar' },
  { href: '/cases', label: 'Cases' },
  { href: '/setor-publico', label: 'Setor Público' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/suporte', label: 'Suporte' }
];
```

- [ ] **Step 2: Atualiza `components/CommandPalette.tsx`**

Procurar a linha que contém `'/#comparador'` (line ~62) e trocar pra `'/#compare-all'`. Se houver entry de `solucoes` com hash `'/#solucoes'`, trocar pra `'/#pricing'`.

Exemplo de mudança:
```tsx
// antes:
{ id: 'comparador', label: 'Comparar planos', group: 'Navegar', icon: Layers, run: go('/#comparador') },
// depois:
{ id: 'comparador', label: 'Comparar planos', group: 'Navegar', icon: Layers, run: go('/#compare-all') },
```

- [ ] **Step 3: Atualiza `components/Footer.tsx`**

Linha 69:
```tsx
// antes:
<li><Link href="/#comparador" className="transition hover:text-brand-400">Comparar Planos</Link></li>
// depois:
<li><Link href="/#compare-all" className="transition hover:text-brand-400">Comparar Planos</Link></li>
```

Se houver também `/#solucoes` no Footer, trocar pra `/#pricing` no mesmo arquivo.

- [ ] **Step 4: Atualiza `app/sobre/page.tsx`**

Linha 76:
```tsx
// antes:
secondaryCta={{ label: 'Ver soluções', href: '/#solucoes' }}
// depois:
secondaryCta={{ label: 'Ver planos', href: '/#pricing' }}
```

- [ ] **Step 5: Atualiza `app/setor-publico/page.tsx`**

Linha 75:
```tsx
// antes:
secondaryCta={{ label: 'Comparar soluções', href: '/#comparador' }}
// depois:
secondaryCta={{ label: 'Comparar planos', href: '/#compare-all' }}
```

- [ ] **Step 6: Atualiza `app/solucoes/[slug]/page.tsx`**

Trocar todas as 3 ocorrências:
- Line 101: `breadcrumbs={[{ label: 'Soluções', href: '/#solucoes' }` → `breadcrumbs={[{ label: 'Soluções', href: '/#pricing' }`
- Line 106: `secondaryCta={{ label: 'Comparar planos', href: '/#comparador' }}` → `secondaryCta={{ label: 'Comparar planos', href: '/#compare-all' }}`
- Line 168: `href="/#comparador"` → `href="/#compare-all"`

- [ ] **Step 7: Verifica que não sobrou âncora antiga**

```bash
grep -rn "#solucoes\|#comparador" components/ app/
```

Esperado: apenas matches em arquivos HTML legacy (`index.html`, `governo.html`, `sobre.html`) e em arquivos de docs (`docs/superpowers/specs/...md`). Se aparecer em algum `.tsx`/`.ts` de produção, corrigir antes de seguir.

- [ ] **Step 8: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 9: Commit**

```bash
git add components/Navbar.tsx components/CommandPalette.tsx components/Footer.tsx app/sobre/page.tsx app/setor-publico/page.tsx app/solucoes/[slug]/page.tsx
git commit -m "refactor(cutover): atualiza ancoras #solucoes -> #pricing e #comparador -> #compare-all"
```

---

### Task 3.2: Renomeia `HeroV2.tsx` → `Hero.tsx` (substitui antigo)

**Files:**
- Delete: `components/Hero.tsx` (atual)
- Rename: `components/HeroV2.tsx` → `components/Hero.tsx`

- [ ] **Step 1: Deletar Hero antigo**

```bash
git rm components/Hero.tsx
```

- [ ] **Step 2: Renomear HeroV2 → Hero**

```bash
git mv components/HeroV2.tsx components/Hero.tsx
```

- [ ] **Step 3: Atualizar o conteúdo do novo `Hero.tsx`**

Trocar `export function HeroV2()` por `export function Hero()` em `components/Hero.tsx` (linha ~17):

```tsx
export function Hero() {
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npx next lint
```

Pode aparecer erro temporário em `app/preview/page.tsx` (que importa `HeroV2`). Será corrigido na Task 3.7 quando deletarmos a rota `/preview`. Se quiser deixar limpo agora, atualize também `app/preview/page.tsx`:

```tsx
import { Hero } from '@/components/Hero';
// ... e usar <Hero /> no JSX em vez de <HeroV2 />
```

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx app/preview/page.tsx
git commit -m "refactor(cutover): renomeia HeroV2 -> Hero, substituindo o hero antigo"
```

---

### Task 3.3: Reescreve `app/page.tsx` para nova composição

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write file**

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';
import { BadgesShowcase } from '@/components/BadgesShowcase';
import { PricingGrid } from '@/components/PricingGrid';
import { CompareAllTable } from '@/components/CompareAllTable';
import { OtherSolutions } from '@/components/OtherSolutions';
import { Faq } from '@/components/Faq';
import { SpecialistCta } from '@/components/SpecialistCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BadgesShowcase />
      <section id="pricing"><PricingGrid /></section>
      <section id="compare-all"><CompareAllTable /></section>
      <OtherSolutions />
      <Faq />
      <SpecialistCta />
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

Pode aparecer "unused import" warnings nos arquivos antigos importados antes (que não importam mais nada). Não bloqueia — vai limpar nas Tasks 3.6 e 3.7.

- [ ] **Step 3: Smoke visual em `/`**

```bash
npm run dev
```

Abre `http://localhost:3000/`. Deve mostrar exatamente o mesmo que `/preview` mostrou na Fase 2. Sem erros no console.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "refactor(cutover): home nova composta — pricing-first"
```

---

### Task 3.4: Integra AtasStrip + Cases em `/setor-publico`

**Files:**
- Modify: `app/setor-publico/page.tsx`

A página `/setor-publico` já tem uma lista interna de ATAs (linhas ~30-41) e um InternalHero. Adicionar `<AtasStrip />` logo abaixo do InternalHero E `<Cases />` antes do CTA final. Cuidado: a lista interna de ATAs vai duplicar visualmente com `AtasStrip` — preferir o componente visual e remover a lista interna se estiver redundante.

- [ ] **Step 1: Ler arquivo atual**

```bash
cat app/setor-publico/page.tsx
```

Localizar (a) o array `atas` (linhas ~30-41 da versão atual) e o JSX que renderiza essa lista mais abaixo, (b) o JSX do CTA final perto do bottom.

- [ ] **Step 2: Adicionar imports**

No topo do arquivo, adicionar (se não existirem):

```tsx
import { AtasStrip } from '@/components/AtasStrip';
import { Cases } from '@/components/Cases';
```

- [ ] **Step 3: Inserir `<AtasStrip />` logo após o `<InternalHero ...>`**

No JSX da página, depois do `</InternalHero>` (ou do componente que renderiza o hero da página), adicionar:

```tsx
<AtasStrip />
```

- [ ] **Step 4: Remover lista interna de ATAs (se duplica com AtasStrip)**

Se a página já tem uma seção que renderiza o array `atas` em formato de cards, comentar / remover essa seção e o array correspondente. Critério: `AtasStrip` substitui visualmente. Se a página tinha conteúdo único na seção interna (ex: ata específica não-listada em `AtasStrip`), considerar manter ambos, mas o default é remover a interna.

Marcador concreto: procurar por `{atas.map(` no arquivo e deletar o bloco JSX que envolve esse map; depois deletar o array `const atas = [...]`.

- [ ] **Step 5: Inserir `<Cases />` antes do bloco final**

Localizar o último `<section>` da página (que costuma ser o CTA "Falar com Especialista"). Antes dele, adicionar:

```tsx
<Cases />
```

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 7: Smoke visual**

`npm run dev` → `http://localhost:3000/setor-publico`. Verificar:
- Hero interno como antes.
- AtasStrip aparece logo abaixo.
- Caminhos de aquisição (acquisitionPaths) seguem normais.
- Cases (com home grid de cases) aparece antes do CTA final.
- Nenhuma seção duplicada.

- [ ] **Step 8: Commit**

```bash
git add app/setor-publico/page.tsx
git commit -m "feat(setor-publico): adiciona AtasStrip e Cases; remove lista ATAs interna duplicada"
```

---

### Task 3.5: Insere EndpointVsCeu em `/solucoes/google-workspace`

**Files:**
- Modify: `app/solucoes/[slug]/page.tsx` (a página é dinâmica — precisa de lógica condicional pelo slug `google-workspace`)

O arquivo `[slug]/page.tsx` é uma página dinâmica que renderiza qualquer solução. Pra inserir o EndpointVsCeu apenas em `google-workspace`, vamos condicionalmente renderizar baseado em `slug`.

- [ ] **Step 1: Ler arquivo atual**

```bash
cat app/solucoes/[slug]/page.tsx
```

Localizar o JSX retornado e identificar onde inserir o `<EndpointVsCeu />` — sugestão: logo antes do bloco final de CTA ou do bloco "Falar com Especialista".

- [ ] **Step 2: Adicionar import condicional**

No topo do arquivo:

```tsx
import { EndpointVsCeu } from '@/components/EndpointVsCeu';
```

- [ ] **Step 3: Inserir condicionalmente baseado em slug**

No JSX, em um local apropriado (sugestão: depois do conteúdo principal, antes do CTA final), adicionar:

```tsx
{params.slug === 'google-workspace' ? <EndpointVsCeu /> : null}
```

Onde `params.slug` é o slug obtido via `params: { slug: string }` no componente. Se o componente já desestrutura `params.slug` em uma variável local, usar essa variável.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 5: Smoke visual**

`npm run dev` →:
- `http://localhost:3000/solucoes/google-workspace` deve mostrar o EndpointVsCeu antes do CTA final.
- `http://localhost:3000/solucoes/google-cloud` (e outros slugs) NÃO deve mostrar EndpointVsCeu.

- [ ] **Step 6: Commit**

```bash
git add app/solucoes/[slug]/page.tsx
git commit -m "feat(solucoes): adiciona EndpointVsCeu em /solucoes/google-workspace"
```

---

### Task 3.6: Atualiza copy do FAQ

**Files:**
- Modify: `components/Faq.tsx`

Substituir as perguntas/respostas atuais pelas 6 novas do spec. **As 3 respostas marcadas ⚠ contém dados quantitativos chutados** ("24-72h", SLA, "centenas de migrações") — PR de cutover NÃO deve ser merged até o comercial confirmar. Se não chegou confirmação, remover as 3 perguntas (#4, #5, #6) e ficar com 3 só.

- [ ] **Step 1: Ler arquivo atual**

```bash
cat components/Faq.tsx
```

Identificar a estrutura — provavelmente um array `faq` ou `questions` e o JSX que renderiza.

- [ ] **Step 2: Substituir o array de perguntas**

Substituir o array atual pelas 6 novas. Estrutura aproximada (ajustar conforme shape real do componente):

```tsx
const faq = [
  {
    q: 'Os preços são finais?',
    a: 'Não — são valores de tabela. Há condições por volume, ATAs e contratos plurianuais. Cotação fechada na conversa.'
  },
  {
    q: 'Vocês emitem nota? Como funciona o faturamento?',
    a: 'Sim. Hypercloud é revendedora Premier Partner — faturamos direto. Boletos/NF-e mensais com gestor de conta.'
  },
  {
    q: 'Conseguem fornecer para governo?',
    a: 'Sim. ATAs vigentes (ARP CIMPAR, CIASC-SC e outras). Veja /setor-publico para os caminhos formais de aquisição.'
  },
  // ⚠ os 3 abaixo dependem de confirmação do comercial Hypercloud. Se não houver
  // confirmação até o merge, REMOVER esses 3 itens deste array.
  {
    q: 'Quanto tempo leva para contratar?',
    a: 'Setor privado: 24-72h após validação. Setor público: depende do veículo de aquisição (adesão a ATA, pregão, contratação direta).'
  },
  {
    q: 'Suporte? SLA?',
    a: 'Atendimento nacional, time dedicado. SLAs personalizáveis para Enterprise.'
  },
  {
    q: 'Posso migrar de outro provedor (M365, Zoho, etc.)?',
    a: 'Sim. Plano de migração consultivo já estruturado.'
  }
];
```

Se a interface usa `id`, `question`, `answer` em vez de `q`, `a`, ajustar nomes.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 4: Smoke visual**

`npm run dev` → `http://localhost:3000/` → rolar até FAQ. Verificar:
- 6 perguntas (ou 3 se as ⚠ foram removidas).
- Acordeão abre/fecha.

- [ ] **Step 5: Commit**

```bash
git add components/Faq.tsx
git commit -m "feat(faq): copy pivot — 6 perguntas pricing-first (3 ⚠ pendentes confirmacao)"
```

---

### Task 3.7: Deleta componentes mortos

**Files:**
- Delete: `components/ProductCard.tsx`
- Delete: `components/WhyHypercloud.tsx`
- Delete: `components/Process.tsx`
- Delete: `components/InvestmentEstimator.tsx`
- Delete: `components/ComparisonExplorer.tsx`
- Delete: `components/StatCounter.tsx`
- Delete: `components/TrustStrip.tsx`

- [ ] **Step 1: Verificar que nada importa esses componentes**

```bash
grep -rn "ProductCard\|WhyHypercloud\|Process\|InvestmentEstimator\|ComparisonExplorer\|StatCounter\|TrustStrip" components/ app/ --include="*.tsx" --include="*.ts"
```

Esperado: matches apenas nos próprios arquivos a deletar (e talvez em spec/plan docs, ignorar esses). Se aparecer import em algum outro arquivo de produção, esse arquivo precisa parar de importar antes — provavelmente uma página esquecida na Fase 3.

- [ ] **Step 2: Deletar arquivos**

```bash
git rm components/ProductCard.tsx
git rm components/WhyHypercloud.tsx
git rm components/Process.tsx
git rm components/InvestmentEstimator.tsx
git rm components/ComparisonExplorer.tsx
git rm components/StatCounter.tsx
git rm components/TrustStrip.tsx
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(cleanup): deleta 7 componentes substituidos pelo refator pricing-first"
```

---

### Task 3.8: Deleta constants legados (`plans.ts`, `features.ts`, `pricing-ranges.ts`)

**Files:**
- Delete: `constants/plans.ts`
- Delete: `constants/features.ts`
- Delete: `constants/pricing-ranges.ts`

- [ ] **Step 1: Verificar que nada importa esses constants**

```bash
grep -rn "from '@/constants/plans'\|from '@/constants/features'\|from '@/constants/pricing-ranges'\|from '../constants/plans'\|from '../constants/features'\|from '../constants/pricing-ranges'" components/ app/ --include="*.tsx" --include="*.ts"
```

Esperado: zero matches. Se aparecer algo, corrigir o consumer antes (provavelmente parou aqui porque um componente do Step 3.7 não foi de fato deletado).

- [ ] **Step 2: Deletar arquivos**

```bash
git rm constants/plans.ts
git rm constants/features.ts
git rm constants/pricing-ranges.ts
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(cleanup): deleta constants/plans, features e pricing-ranges legados"
```

---

### Task 3.9: Atualiza `CLAUDE.md` com nova política e arquitetura

**Files:**
- Modify: `CLAUDE.md`

Atualizar três trechos: (a) "Static content sources" — adicionar novos constants, remover legados; (b) política de preços; (c) "Routing & rendering" da home.

- [ ] **Step 1: Substituir o trecho sobre `constants/pricing-ranges.ts`**

Procurar em `CLAUDE.md` o trecho que diz:
> `constants/pricing-ranges.ts` — capacity/scale data the `InvestmentEstimator` uses (storage per user, meet cap, governance tier, AI tier). **No public R$ values** — the estimator shows capacity, not price. The filename is legacy from when it stored prices; the exported types now are `ScalePlan` / `scalePlans`. Don't add monetary fields back here — the policy is "cotação na conversa".

Substituir por:

```md
- `constants/workspace-plans.ts` — 8 SKUs Google Workspace com **preços públicos** (`pricePerUser: number`) em BRL/usuário/mês. Tipo `WorkspacePlan` com `tier` (`'frontline' | 'enterprise'`), `recommended` (exatamente 1 plano marcado), `highlights` (bullets do card). Consumido por `PricingGrid` e `CompareAllTable`.
- `constants/workspace-features.ts` — matriz V/X 19 features × 8 planos, agrupada em 6 blocos (Geral, Armaz., Colab., Comun., Segur., Compl.). Tipo `WorkspaceFeatureRow` com `values: Record<WorkspacePlanId, CellValue>` onde `CellValue` é discriminated union (`check` | `cross` | `text`). Consumido por `CompareAllTable`.
- `constants/gemini-editions.ts` — 4 editions Gemini Enterprise (Business, Standard, Plus, Frontline) **sem preço**. Consumido por `OtherSolutions`.
- `constants/badges.ts` — credenciais Google e parceiros mostrados no `BadgesShowcase`. Arquivos de imagem em `public/logo/logos partner/` (placeholder) ou `public/logo/badges/` (definitivo, futuro).

**Política de preços:** Workspace tem preços tabelados públicos. Cloud, Gemini standalone, AppSheet e CEU seguem "cotação na conversa" — sem preço público enquanto não houver tabela definida pela direção comercial.
```

- [ ] **Step 2: Substituir o trecho "Routing & rendering" da home**

Procurar em `CLAUDE.md` o trecho que descreve a ordem das seções da home (provavelmente menciona TrustStrip → Hero → ProductCard grid → WhyHypercloud → Cases → ComparisonExplorer → ...).

Substituir por:

```md
- `app/page.tsx` orchestra a home pricing-first em 7 seções: `Hero` (foto laranja com headline curta e 2 CTAs) → `BadgesShowcase` (6 credenciais Google em grid) → `PricingGrid` (id=`pricing`, tabs Frontline/Enterprise com 8 cards Workspace) → `CompareAllTable` (id=`compare-all`, tabela 19×8 V/X/texto com modo mobile-compacto de 3 colunas) → `OtherSolutions` (3 cards: Gemini editions, Google Cloud, AppSheet — todos "cotação na conversa") → `Faq` → `SpecialistCta`. **Não existem mais** seções com hash `#solucoes` ou `#comparador` — qualquer link interno deve usar `#pricing` ou `#compare-all`.
```

- [ ] **Step 3: Verificar referências a componentes deletados em CLAUDE.md**

Procurar e remover/atualizar referências a:
- `InvestmentEstimator`
- `ComparisonExplorer`
- `WhyHypercloud`
- `Process` (como componente)
- `ProductCard`
- `StatCounter`
- `TrustStrip`

Search:
```bash
grep -n "InvestmentEstimator\|ComparisonExplorer\|WhyHypercloud\|Process.tsx\|ProductCard\|StatCounter\|TrustStrip" CLAUDE.md
```

Cada hit revisar: trechos que descrevem comportamento desses componentes podem ser deletados; trechos que falam genericamente do funil podem ser ajustados.

- [ ] **Step 4: Adicionar nota sobre o bug do hero invisível**

No final da seção "Theme system" ou em uma nova subseção "Animation gotchas", adicionar:

```md
### Animation gotchas

- `Reveal` (`components/MotionWrapper.tsx`) usa `whileInView` que pode não disparar para conteúdo **above-the-fold** em alguns browsers. O bug ficou visível em 12/05 (hero invisível até clicar em Soluções) e foi revertido. Componentes da primeira dobra (`Hero`, parte do `BadgesShowcase`) usam `motion.div` inline com `initial`/`animate` direto em vez de `Reveal`. Não reintroduzir a prop `immediate` em `Reveal`.
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx next lint
```

(CLAUDE.md não é compilado, mas a verificação confirma que não quebramos nada acidentalmente.)

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(claude): atualiza politica de precos e arquitetura da home pricing-first"
```

---

### Task 3.10: Remove rota `/preview`

**Files:**
- Delete: `app/preview/page.tsx`

- [ ] **Step 1: Deletar arquivo**

```bash
git rm app/preview/page.tsx
```

Verificar se a pasta `app/preview` ficou vazia. Se sim, o git já remove ela na próxima operação. Se houver outros arquivos (não deveria), avaliar.

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore(cleanup): remove rota /preview apos cutover"
```

---

### Task 3.11: Verificação final do cutover

**Files:** *(read-only)*

- [ ] **Step 1: Grep cleanup zero**

```bash
grep -rn "#solucoes\|#comparador" components/ app/ --include="*.tsx" --include="*.ts"
```

Esperado: zero matches (excluindo eventuais arquivos HTML legacy em raiz que não fazem parte do build).

```bash
grep -rn "ProductCard\|WhyHypercloud\|Process\|InvestmentEstimator\|ComparisonExplorer\|StatCounter\|TrustStrip" components/ app/ --include="*.tsx" --include="*.ts"
```

Esperado: zero matches.

```bash
grep -rn "@/constants/plans\|@/constants/features\|@/constants/pricing-ranges" components/ app/ --include="*.tsx" --include="*.ts"
```

Esperado: zero matches.

- [ ] **Step 2: Lint + typecheck**

```bash
npx tsc --noEmit && npx next lint
```

Esperado: limpo.

- [ ] **Step 3: Build de produção**

```bash
npm run build
```

Esperado: build completa sem erros. Páginas listadas: `/`, `/cases`, `/setor-publico`, `/sobre`, `/suporte`, `/portal-do-cliente`, `/dashboard`, `/solucoes/[slug]` (3 ou 4 slugs).

- [ ] **Step 4: Smoke E2E**

```bash
npm run dev
```

Navegar manualmente:

1. `/` (home nova):
   - Hero foto laranja + headline + 2 CTAs aparecem **no load** (sem scroll necessário).
   - BadgesShowcase com 6 badges.
   - PricingGrid abre em Enterprise; tab Frontline mostra 3; selo "Recomendado" no Standard.
   - CompareAllTable: desktop 8 colunas; mobile 3 + botão expandir.
   - OtherSolutions 3 cards.
   - Faq abre.
   - SpecialistCta.
   - Console sem erros.

2. `/cases` — Cases page (já existia) inalterada visualmente.

3. `/setor-publico`:
   - Hero interno.
   - AtasStrip novo.
   - 3 caminhos de aquisição.
   - Cases.
   - CTA final.

4. `/solucoes/google-workspace`:
   - Hero interno.
   - Conteúdo Workspace.
   - **EndpointVsCeu novo**.
   - CTA final.

5. `/solucoes/google-cloud` (ou outro slug):
   - **SEM** EndpointVsCeu (apenas em google-workspace).

6. `/sobre`, `/suporte`, `/portal-do-cliente`, `/dashboard` — funcionais, sem 404 nos links de breadcrumb.

7. Navbar:
   - Click em "Soluções" → vai pra `/#pricing` (e rola até PricingGrid).
   - Click em "Comparar" → vai pra `/#compare-all`.

8. Lead form:
   - Click em qualquer CTA "Falar com Especialista" abre o modal.
   - Context apropriado aparece (ex: "Pricing — Enterprise Standard" se clicou no card recomendado).

- [ ] **Step 5: Se branch separada, abrir PR**

```bash
gh pr create --base main --head feat/pricing-first-cutover --title "Pricing-first home cutover" --body "$(cat <<'EOF'
## Summary
- Substitui a home funil-based pela versão pricing-first (workspace.google.com/pricing style)
- Preço Workspace público em 8 SKUs (Frontline + Enterprise)
- Adiciona BadgesShowcase, PricingGrid (tabs), CompareAllTable, OtherSolutions, EndpointVsCeu
- Remove ProductCard grid, WhyHypercloud, Process, InvestmentEstimator, ComparisonExplorer, StatCounter, TrustStrip
- Atualiza âncoras (`#solucoes` → `#pricing`, `#comparador` → `#compare-all`) em Navbar, CommandPalette, Footer e páginas internas
- Integra AtasStrip + Cases em /setor-publico
- Insere EndpointVsCeu em /solucoes/google-workspace

## Test plan
- [ ] Home `/` renderiza ponta-a-ponta (Hero → Badges → Pricing → Compare → Other → Faq → CTA)
- [ ] Hero NÃO fica invisível no load
- [ ] PricingGrid tabs funcionam; URL hash atualiza
- [ ] CompareAllTable mobile-compacto + expand funcionam
- [ ] Todos os CTAs abrem lead form com context apropriado
- [ ] Navbar/Footer/CommandPalette sem âncoras quebradas
- [ ] /setor-publico tem AtasStrip e Cases sem duplicar
- [ ] /solucoes/google-workspace tem EndpointVsCeu; outros slugs não
- [ ] `npm run build` sem erros
- [ ] 3 perguntas ⚠ do FAQ confirmadas pelo comercial OU removidas
EOF
)"
```

Senão, se fluxo é commit direto em `main`, push:

```bash
git push origin main
```

**Critério de merge Fase 3:**
- Todos os greps de verificação retornam zero.
- `npm run build` completa.
- 3 perguntas ⚠ do FAQ tiveram resposta confirmada pelo comercial OU foram removidas.
- Smoke E2E manual aprovado.

---

## Self-review

Após escrever todas as tasks, revisão final:

### Spec coverage

| Requisito do spec | Task que entrega |
|---|---|
| Home com 7 seções (Hero / Badges / Pricing / Compare / Other / Faq / CTA) | 3.3 |
| Hero compacto com headline "Workspace com preço público. Cloud, IA e produtividade — contrato direto." | 2.1 + 3.2 |
| Foto laranja BG mantida no Hero | 2.1 (preservado de implementação anterior) |
| BadgesShowcase com 6 badges placeholder | 2.2 |
| PricingGrid tabs Frontline/Enterprise, default Enterprise | 2.3 |
| 8 SKUs com R$, recommended em wks-ent-std | 1.1 + 2.3 |
| Deep-link `#pricing-frontline` / `#pricing-enterprise` | 2.3 |
| CompareAllTable 19×8 V/X/texto agrupada em blocos | 2.4 |
| Mobile-compacto = 3 colunas curadas + botão expandir | 2.4 |
| OtherSolutions com Gemini (link editions) + Cloud + AppSheet | 2.5 |
| FAQ copy pivot com 3 perguntas ⚠ marcadas | 3.6 |
| AtasStrip + Cases em /setor-publico | 3.4 |
| EndpointVsCeu em /solucoes/google-workspace | 2.6 + 3.5 |
| Navbar / CommandPalette / Footer / páginas internas com âncoras novas | 3.1 |
| Hero não-invisível no load (motion inline em vez de Reveal) | 2.1 (REVEAL inline) |
| Deletar ProductCard, WhyHypercloud, Process, InvestmentEstimator, ComparisonExplorer, StatCounter, TrustStrip | 3.7 |
| Deletar constants/plans, features, pricing-ranges legados | 3.8 |
| CLAUDE.md atualizado | 3.9 |
| Remover rota /preview após cutover | 3.10 |
| Política de preços documentada | 3.9 |

Sem gaps.

### Placeholder scan

Procurei na minha cabeça por: TBD, TODO, "appropriate error handling", "similar to Task N".

- "appropriate" / "appropriately": apenas em descrições de UX (não em código de implementação).
- Nenhum "TODO", "TBD", "implement later".
- Algumas tasks (3.4, 3.5, 3.6) dependem de ler conteúdo atual do arquivo antes de modificar — mas o "what to look for" está descrito concretamente (linha aprox, padrão grep).
- Task 3.4 tem um "if duplica com AtasStrip" — decisão concreta de implementação (remover lista interna), não placeholder.

### Type consistency

- `WorkspacePlan` definido na Task 1.1, importado/usado em Tasks 2.3 (`PricingGrid`) e 2.4 (`CompareAllTable`). Campos: `id, tier, name, shortName, pricePerUser, audience, recommended, highlights, cta`. Consistentes.
- `WorkspacePlanId` discriminated union — usado em `Record<WorkspacePlanId, CellValue>` na Task 1.2. Consistente.
- `WorkspaceFeatureRow` na Task 1.2, importado em Task 2.4. Consistente.
- `CellValue` na Task 1.2, usado em Task 2.4. Consistente.
- `Badge` na Task 1.4, usado em Task 2.2. Consistente.
- `GeminiEdition` na Task 1.3, usado em Task 2.5. Consistente.

Sem inconsistências detectadas.

### Scope check

Plano é grande (3 fases, ~22 tasks, ~1.500 linhas) mas focado em uma transição coerente. As 3 fases podem deployar independentemente e cada uma deixa o site em estado funcional:

- Fase 1: zero impacto visual. Pure data layer.
- Fase 2: home original intacta; nova home apenas em `/preview`. Stakeholder pode revisar e dar go/no-go.
- Fase 3: cutover único.

Sem necessidade de decomposição adicional. Plano pronto pra execução.
