# Home Pricing-First — Spec

**Data:** 2026-05-12
**Status:** Brainstorming aprovado, aguardando review do spec

## Contexto

A home atual segue um funil de awareness → consideration → decision com 10 seções:

```
Hero → AtasStrip → Soluções (ProductCard) → WhyHypercloud → Cases →
ComparisonExplorer → Process → InvestmentEstimator → Faq → SpecialistCta
```

A política até aqui era "no public R$ values" — `InvestmentEstimator` mostra capacidade (storage, governance tier, AI tier), não preço. `ComparisonExplorer` filtra planos sem mostrar valor. Todas as conversões passam pelo modal `LeadFormDialog`.

A direção comercial mudou: o cliente decide na home com preço aberto. Inspiração visual:
[`workspace.google.com/pricing`](https://workspace.google.com/pricing).

Dados disponíveis:

- **Workspace (8 SKUs com R$):** Frontline Starter R$30, Frontline Standard R$70, Frontline Plus R$93, Enterprise Essentials R$58, Enterprise Essentials Plus R$116, Enterprise Starter R$63,90, Enterprise Standard R$156,20, Enterprise Plus R$203. Matriz V/X de 22 features agrupadas em 6 blocos (Geral, Armaz., Colab., Comun., Segur., Compl.).
  Fonte: `Tabela Comparativa Google Workspace Enterprise.xlsx` (idêntico ao Google Sheets compartilhado).
- **Gemini Enterprise (4 editions sem R$):** Business, Standard, Plus, Frontline — capacidades extraídas de `docs.cloud.google.com/gemini/enterprise/docs/editions?hl=pt-br`.
- **CEU (Chrome Enterprise Upgrade):** matriz 1×6 vs. Workspace Enterprise Plus Endpoint Management. Fonte: `Workspace Enterprise Plus vs. CEU.xlsx`.
- **Cloud, AppSheet:** sem planilhas — vão como "cotação na conversa".
- **Badges/credenciais:** arquivos a serem enviados pelo usuário. Placeholder inicial: os 6 JPEGs em `public/logo/logos partner/`.

## Decisões do brainstorming

| | Escolha | |
|---|---|---|
| Q1 — escopo "tirar funil" | **A** | Pricing-first puro; remove WhyHypercloud / Process / InvestmentEstimator / ProductCards. |
| Q2 — outros produtos na home | **B** | Workspace pricing + faixa "Outras soluções Google" com cards de Gemini, Cloud, AppSheet. |
| Q3 — pricing Cloud/AppSheet | **B** | Placeholder "cotação na conversa" enquanto o usuário não envia planilhas. |
| Q3.5 — CEU | **II** *(call do designer)* | Move pra dentro de `/solucoes/google-workspace` como bloco comparativo. Não entra na home. |
| Q4 — badges | *(call do designer)* | Logo abaixo do hero, antes do pricing. Trust before price. |

## Princípios da mudança

- **Preço Workspace é público.** Frontline (3 SKUs) e Enterprise (5 SKUs) em valor de tabela `R$/usuário/mês`.
- **Política de cotação preservada onde não há tabela.** Cloud, Gemini standalone, AppSheet seguem "cotação na conversa". Quando o usuário enviar planilhas, ganham página dedicada no mesmo padrão.
- **Hero compacto.** Sem stats grandes, sem painel direito. Só headline + 2 CTAs + foto laranja (mantida).
- **Lead form continua o único canal de conversão.** Todo CTA "Falar com Especialista" abre `useLeadDialog()` — passa contexto (nome do plano, tier) pra qualificar.
- **Sem novas dependências.** Toda a tabela e os tabs implementados com componentes locais e tailwind. `framer-motion`, `lucide-react`, `react-hook-form` continuam suficientes.
- **`Reveal` continua quebrado para conteúdo above-the-fold.** Em todos os blocos novos que vivem na primeira dobra (Hero, BadgesShowcase, e o primeiro viewport do PricingGrid), animação de entrada é feita com `motion.div` inline usando `initial`/`animate` direto — não `whileInView`. `Reveal` (o componente compartilhado) não muda; quem usa `Reveal` continua sendo o conteúdo abaixo da dobra (FAQ, OtherSolutions). A prop `immediate` adicionada e revertida no commit `9e5b709f` **não** é reintroduzida.

## Nova estrutura da home

| # | Seção | Ação | Componente |
|---|---|---|---|
| 1 | Hero | refator (compacto) | `components/Hero.tsx` |
| 2 | Badges showcase | **NOVO** | `components/BadgesShowcase.tsx` |
| 3 | Pricing Workspace (tabs Frontline/Enterprise) | **NOVO** | `components/PricingGrid.tsx` |
| 4 | Compare-all Workspace (V/X 22×8) | **NOVO** (substitui ComparisonExplorer) | `components/CompareAllTable.tsx` |
| 5 | Outras soluções Google | **NOVO** | `components/OtherSolutions.tsx` |
| 6 | FAQ (copy pivot) | reuso, copy atualizada | `components/Faq.tsx` |
| 7 | SpecialistCta | mantém | `components/SpecialistCta.tsx` |

**Sai da home:**

- `AtasStrip` → continua sendo importado só em `/setor-publico` (já carrega o conteúdo ATAs na rota dedicada).
- `Soluções` grid de `ProductCard` → some.
- `WhyHypercloud` → some.
- `Cases` → move pra `/cases` (rota já existe). Componente em si fica disponível, só sai da home.
- `Process` → some.
- `InvestmentEstimator` → some.

## Mudanças por arquivo

### `constants/plans.ts` — refator completo

Tipo novo:

```ts
export type Plan = {
  id: string;
  tier: 'frontline' | 'enterprise';
  name: string;                     // "Frontline Starter", "Enterprise Plus", etc.
  shortName: string;                // "Starter", "Plus" — pro card
  pricePerUser: number;             // BRL/mês — 30, 70, 93, 58, 116, 63.9, 156.2, 203
  audience: string;                 // 1 frase
  featured: boolean;                // marca "Mais vendido" no tier
  highlights: string[];             // 4-5 bullets do card
  cta: string;                      // default "Falar com Especialista"
};

export const plans: Plan[] = [ /* 8 planos */ ];
```

- Os planos antigos com `category: 'gemini' | 'cloud' | 'appsheet' | 'publico'` saem desse arquivo.
- `categories` (export atual com 6 entries) some.
- Os 4 `Workspace Starter/Standard/Plus/Enterprise` antigos viram os 8 novos. Os IDs novos seguem padrão `wks-fl-starter`, `wks-fl-std`, `wks-fl-plus`, `wks-ent-essentials`, `wks-ent-essentials-plus`, `wks-ent-starter`, `wks-ent-std`, `wks-ent-plus`.
- `featured: true` em `wks-fl-plus` e `wks-ent-std` (escolha conservadora — Plus do Frontline e Standard do Enterprise são tipicamente os "mais vendidos" da família).

### `constants/features.ts` — refator completo

Tipo novo:

```ts
export type CellValue =
  | { kind: 'check' }
  | { kind: 'cross' }
  | { kind: 'text'; value: string };   // "5GB", "1TB", "100", "10k", "Ilim."

export type FeatureRow = {
  block: 'Geral' | 'Armaz.' | 'Colab.' | 'Comun.' | 'Segur.' | 'Compl.';
  feature: string;
  values: Record<PlanId, CellValue>;   // 8 chaves, uma por SKU
};

export const featureMatrix: FeatureRow[] = [ /* 21 rows (sem a linha "Valor de Tabela") */ ];
```

- O `featureMatrix` antigo é substituído por esta estrutura.
- `comparisonPlanIds` e `recommendedPlanId` saem (eram usados pelo ComparisonExplorer).
- A linha de preços (row "Valor de tabela") não fica aqui — o preço vive em `plans.ts`. O `CompareAllTable` renderiza preço a partir de `plans` e a matriz a partir de `featureMatrix`.

### `constants/gemini-editions.ts` — NOVO

```ts
export type GeminiEdition = {
  id: string;
  name: string;
  audience: string;
  storage: string;
  highlights: string[];
};

export const geminiEditions: GeminiEdition[] = [
  { id: 'business', ... },
  { id: 'standard', ... },
  { id: 'plus', ... },
  { id: 'frontline', ... },
];
```

Conteúdo extraído da página oficial de editions. Sem preço — usado no card "Workspace with Gemini" da seção `OtherSolutions`, mas o detalhamento entra só na página `/solucoes/gemini-enterprise`.

### `constants/badges.ts` — NOVO

```ts
export type Badge = {
  file: string;       // "google-cloud-premier.svg" — quando vierem novos
  alt: string;
  tier?: string;      // "Premier", "Select", etc. — pra agrupamento visual
};

export const badges: Badge[] = [ /* placeholder usa os 6 JPEGs atuais */ ];
```

Quando o usuário enviar os arquivos definitivos:
- Coloca em `public/logo/badges/`.
- Atualiza `badges` apontando pros novos arquivos.
- Tudo mais (`BadgesShowcase`) continua funcionando.

### `constants/pricing-ranges.ts` — DEPRECIADO

Arquivo continua existindo (tem `ScalePlan`/`scalePlans` usados pelo `InvestmentEstimator`), mas como o estimator sai da home, fica órfão. **Mantenho o arquivo + tipo** caso o estimator seja restaurado em outra página no futuro, mas remove o import de qualquer lugar.

### `components/Hero.tsx` — refator

Versão atual tem badge + H1 grande + parágrafo + 3 CTAs + 4 stats + pill "Credenciais oficiais". Encolhe pra:

- Badge superior "Premier Google Cloud Partner · ATAs vigentes" — mantém
- H1 nova (mais curta): "Google Workspace, Cloud e IA — preço aberto, contrato direto."
- Parágrafo de apoio (1 linha): "Veja os planos, compare e fale com um especialista. Sem funil enrolado."
- 2 CTAs:
  - Primário "Ver planos" (link `#pricing`, scroll suave)
  - Secundário "Falar com Especialista" (abre lead form sem context)
- **Sem stats, sem painel direito, sem pill de credenciais.** A foto laranja BG e o overlay continuam exatamente iguais.
- `useScroll`/`useTransform` do parallax da foto: mantém.
- `Reveal` continua sendo usado mas com fix: dentro do Hero, troca `Reveal` por `motion.div` com `initial`/`animate` direto (não `whileInView`) — evita o bug do hero invisível no load reportado em 12/05 e revertido em `9e5b709f`.

### `components/BadgesShowcase.tsx` — NOVO

Seção logo abaixo do Hero. Layout:

```
─── PREMIER GOOGLE CLOUD PARTNER · CREDENCIAIS OFICIAIS ──────────

  [ logo ]   [ logo ]   [ logo ]   [ logo ]   [ logo ]   [ logo ]
   Select     Select     Premier    Select     Workspace  Cloud
   Tech       Services   Co-Sell    Tech       Premier    Comp.

           Hypercloud é uma das poucas no Brasil com
           Premier Partner e ATAs vigentes para o setor público.
```

- Grid responsivo: 2 colunas mobile, 6 desktop.
- Cada badge: tile branco, badge image, label "Select Technology Partner" etc.
- Logo lê de `constants/badges.ts`. Mesma estrutura de loop do `TrustStrip` atual, mas tile mais limpo e com label textual abaixo da imagem.
- Frase de fechamento: 1 linha centralizada. Usa as 2 ATAs reais como cred.
- **Quando os arquivos novos chegarem,** só troca o array em `constants/badges.ts`. Componente não muda.

### `components/PricingGrid.tsx` — NOVO

Centro da home. Layout:

```
                          [ Frontline ]  [ Enterprise ]   ← tabs

  ┌────────────┐  ┌────────────┐  ┌────────────┐
  │ Starter    │  │ Standard   │  │ Plus      ★│   ← Frontline tab
  │ R$ 30      │  │ R$ 70      │  │ R$ 93      │
  │ /usuário/m │  │ /usuário/m │  │ /usuário/m │
  │ ...        │  │ ...        │  │ ...        │
  │ [Falar]    │  │ [Falar]    │  │ [Falar]    │
  └────────────┘  └────────────┘  └────────────┘

  Valores de tabela. Sujeitos a condições comerciais e ATAs vigentes.
```

- **Tabs:** Frontline (3 cards) ↔ Enterprise (5 cards). Estado controlado, `useState`. URL hash atualiza pra `#pricing-frontline` / `#pricing-enterprise` pra deep-link (com `useEffect` lendo `window.location.hash` no mount).
- **Card highlight:** `featured: true` em `plans.ts` ganha borda `brand-500`, selo "Mais vendido", shadow mais forte.
- **CTA:** todos abrem `useLeadDialog().open(\`Pricing — ${plan.name}\`)`. Contexto vai pro modal.
- **Enterprise (5 cards):** em viewports `< xl`, vira scroll horizontal com snap (não quebra em 2 linhas). `≥ xl`, grid de 5 colunas.
- **Bullets do card:** 4-5 features de destaque. Hard-coded por plano em `constants/plans.ts` na prop `highlights` (já no shape novo).
- **Footer pequeno:** "Valores de tabela…" + link "Ver tabela completa" → smooth scroll pra `#compare-all`.

### `components/CompareAllTable.tsx` — NOVO

Substitui `ComparisonExplorer`. Layout:

```
Compare todos os planos Workspace

┌─────────────────────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ Recurso             │ FL.S │ FL.M │ FL.P │ E.E. │ E.E+ │ E.S  │ E.St │ E.P  │
├─────────────────────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ R$/usuário/mês      │ 30   │ 70   │ 93   │ 58   │ 116  │ 63,9 │156,2 │ 203  │
├─────────────────────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┤
│ GERAL                                                                       │
├─────────────────────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┤
│ Gmail corporativo   │  ✓   │  ✓   │  ✓   │  ✗   │  ✗   │  ✓   │  ✓   │  ✓   │
│ Limite de usuários  │ Ilim │ Ilim │ Ilim │ Ilim │ Ilim │ Ilim │ Ilim │ Ilim │
...
```

- Header sticky com nome dos planos.
- Linhas agrupadas por bloco (Geral, Armaz., Colab., Comun., Segur., Compl.) com row separadora cinza claro pra cada bloco.
- Células `check` → ✓ verde, `cross` → ✗ vermelho-suave (não vermelho-alarme), `text` → string raw monospace.
- Em mobile (`< md`), tabela rola horizontal com gradient hint à direita. Coluna de feature `position: sticky; left: 0` pra ficar visível.
- Sem filtros, sem URL share — features cortadas vs `ComparisonExplorer` atual. Volta a ser tabela de leitura.
- CTA no final: "Ainda em dúvida? Falar com um especialista" → lead form com context "Compare — Workspace".

### `components/OtherSolutions.tsx` — NOVO

Faixa de 3 cards logo abaixo do compare-all:

```
Outras soluções Google que vendemos.

┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│ ▲ Gemini Enterprise │  │ ☁ Google Cloud     │  │ ⚙ AppSheet         │
│                     │  │                     │  │                     │
│ 4 editions com IA   │  │ Infra, dados, IA    │  │ Apps no-code        │
│ aplicada (Business, │  │ e segurança sob     │  │ pra automação de    │
│ Standard, Plus,     │  │ arquitetura.        │  │ processos internos. │
│ Frontline).         │  │                     │  │                     │
│                     │  │ Cotação na conversa.│  │ Cotação na conversa.│
│ Cotação na conversa.│  │                     │  │                     │
│                     │  │ Falar com Especial. │  │ Falar com Especial. │
│ Ver editions →      │  │                     │  │                     │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

- **Card Gemini:** link "Ver editions" → `/solucoes/gemini-enterprise`. CTA também abre lead form com context "Gemini Enterprise". Lista 4 editions na descrição.
- **Card Cloud:** sem link de detalhe — só CTA "Falar com Especialista" com context "Google Cloud". (Quando chegar planilha, vira `/solucoes/google-cloud` com pricing igual Workspace.)
- **Card AppSheet:** idem Cloud.
- Quando o usuário enviar mais planilhas, troca o "Cotação na conversa" pelo card de pricing + link "Ver planos".

### `components/Faq.tsx` — copy pivot

Componente fica, mas as perguntas mudam pra alinhar com o novo discurso pricing-first. Sugestão de perguntas (5-6, não 10+):

1. **Os preços são finais?** Não — são valores de tabela. Há condições por volume, ATAs e contratos plurianuais. Cotação fechada na conversa.
2. **Vocês emitem nota? Como funciona o faturamento?** Sim. Hypercloud é revendedora Premier Partner — fatura direto. Boletos/NF-e mensais com gestor de conta.
3. **Conseguem fornecer pra governo?** Sim. ATAs vigentes (ARP CIMPAR, CIASC-SC e outras). Veja `/setor-publico` para os caminhos formais.
4. **Quanto tempo leva pra contratar?** Setor privado: 24-72h após validação. Setor público: depende do veículo de aquisição (adesão a ATA, pregão, contratação direta).
5. **Suporte? SLA?** Atendimento nacional, time dedicado. SLAs personalizáveis para Enterprise.
6. **Posso migrar de outro provedor (M365, Zoho, etc.)?** Sim. Há plano de migração consultivo. Já fizemos centenas.

O componente em si (acordeão, animação) não muda.

### `components/SpecialistCta.tsx` — mantém

Sem mudança. É o último bloco antes do footer, com headline "Pronto pra conversar?" + CTA lead form.

### Removidos do projeto

- `components/ProductCard.tsx`
- `components/WhyHypercloud.tsx`
- `components/Process.tsx`
- `components/InvestmentEstimator.tsx`
- `components/ComparisonExplorer.tsx`
- `components/StatCounter.tsx` (sem stats no hero)
- `components/TrustStrip.tsx` (já fora do app/page.tsx desde o redesign anterior — finaliza remoção)

### Movidos (não removidos)

- `components/AtasStrip.tsx` — usado em `/setor-publico` ao invés da home. Já existe a página, basta importar lá.
- `components/Cases.tsx` — usado em `/cases` (rota já existe). Sai da home.

### `app/page.tsx` — recompõe

```tsx
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

### `app/setor-publico/page.tsx` — adiciona AtasStrip + Cases

Página já existe com hero e ATAs próprias. **Inserir** `<AtasStrip />` logo abaixo do `InternalHero` e `<Cases />` no meio do conteúdo (depois dos caminhos de aquisição, antes do CTA final). Cuidado: a página já tem uma lista própria de `atas` interna — verificar se a `AtasStrip` duplica conteúdo e, se duplicar, remover uma das duas (preferir `AtasStrip` por ser mais visual; substituir a lista interna).

### `app/solucoes/google-workspace/page.tsx` — adiciona bloco CEU

Após o conteúdo de Workspace, inserir bloco "Gestão de dispositivos: Endpoint Management vs Chrome Enterprise Upgrade" com a tabela 1×6 do arquivo `Workspace Enterprise Plus vs. CEU.xlsx`. Componente novo dedicado `components/EndpointVsCeu.tsx` (5-6 rows, tabela simples 2 colunas).

### `CLAUDE.md` — atualiza política

Substituir o trecho atual sobre `constants/pricing-ranges.ts` ("No public R$ values…") por:

> **Preços tabelados Workspace são públicos** em `constants/plans.ts` (8 SKUs). O `PricingGrid` mostra `R$/usuário/mês` direto. **Cloud, Gemini standalone e AppSheet** seguem "cotação na conversa" — sem preço público enquanto não houver tabela definida pela direção comercial. `constants/pricing-ranges.ts` é legado (era usado pelo `InvestmentEstimator`, removido).

Adicionar na seção "Static content sources":

- `constants/badges.ts` — credenciais Google e parceiros mostrados no `BadgesShowcase`. Arquivos de imagem ficam em `public/logo/badges/` (ou continuam em `public/logo/logos partner/` como placeholder).
- `constants/gemini-editions.ts` — 4 editions de Gemini Enterprise pro card de `OtherSolutions`. Sem preço.

Remover referências a componentes deletados (`InvestmentEstimator`, `ComparisonExplorer`, `WhyHypercloud`, `Process`, `ProductCard`) da seção "Routing & rendering" da home.

## Política de preços (consolidada)

- **Workspace**: 8 valores de tabela públicos. Frontline R$30-R$93, Enterprise R$58-R$203. Disclaimer no `PricingGrid`: "Valores de tabela. Sujeitos a condições comerciais e ATAs vigentes."
- **Cloud, Gemini, AppSheet, CEU**: cotação na conversa. CTA "Falar com Especialista" passa contexto pro lead form.
- **Setor público**: preços de tabela valem como referência; preço efetivo depende de ATA/edital. `AtasStrip` no `/setor-publico` reforça isso.
- **Quando o usuário enviar planilhas Cloud/AppSheet**, criar `constants/cloud-plans.ts` / `constants/appsheet-plans.ts` no mesmo molde de `plans.ts` e replicar o `PricingGrid` em página dedicada.

## Dados que dependem do usuário

| Pendência | Bloqueia? | Plano B se demorar |
|---|---|---|
| Arquivos das badges definitivos | Não | `BadgesShowcase` usa os 6 JPEGs em `public/logo/logos partner/` como placeholder, com layout já refinado. |
| Planilhas Cloud / AppSheet | Não | Cards de `OtherSolutions` ficam com "Cotação na conversa". Quando chegar, vira página dedicada. |
| Decisão final sobre quais 2 planos marcar como `featured: true` | Não | Default `wks-fl-plus` e `wks-ent-std`. Trocar é alteração 1-linha em `plans.ts`. |
| Texto definitivo dos `highlights` (bullets do card) | Não | Default extraído da matriz V/X — 4-5 bullets com as features mais marcantes de cada plano. |

## O que NÃO entra nesse spec

- Redesign de `/sobre`, `/suporte`, `/portal-do-cliente`, `/dashboard`.
- Refator de `/cases` — fica a mesma, só recebe o componente `Cases` migrado da home.
- Refator de `/solucoes/[slug]` pra outros slugs além de `google-workspace`.
- Política de SEO / metadata — `app/layout.tsx` `metadataBase` continua igual.
- Tradução EN/ES.
- Integração com pagamento direto / checkout — Hypercloud continua vendendo via consultor, lead form é o canal.
- Telemetria de cliques nos cards de pricing (Q4 candidate).

## Sucesso

Após implementação:

1. Home tem 7 seções (vs 10 atuais), com pricing na 3ª.
2. Preço Workspace visível sem clique (em até 1 scroll do hero).
3. Badges visíveis acima da dobra ou no primeiro scroll.
4. Tempo até primeiro CTA com contexto: ≤ 2 scrolls.
5. Sem componentes mortos no `app/page.tsx`.
6. Lint + typecheck limpos.
7. CLAUDE.md atualizado refletindo política de preço nova.
