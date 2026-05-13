# Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polimento visual em 7 frentes coordenadas no site Hypercloud, sem mudança de conteúdo — Hero refinement, PricingGrid restructure, anatomia padronizada de seção via `SectionHeader`, sistema de botões consolidado via helpers em `buttons.ts`, Footer refresh, FAQ redesign visual com `<details>`, e sweep de hover/microinterações coordenadas.

**Architecture:** 4 fases — A) foundation (cria os 2 helpers que tudo mais consome), B) mudanças visuais grandes 1 por seção, C) sweep de consistência aplicando os helpers em cada componente restante, D) build + push final. Cada task commit individual. Sem fases-branch — direto em `main` (padrão do projeto). Sem novos componentes React; só helpers de classe + refator visual.

**Tech Stack:** Next.js 14 App Router · TypeScript strict (`noEmit`) · TailwindCSS · framer-motion · lucide-react · zero novas deps.

**Spec:** `docs/superpowers/specs/2026-05-13-design-polish-design.md`

**Verificação padrão** (rodar ao fim de cada task que mexe em código):
```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```
Esperado: `✔ No ESLint warnings or errors` + sem erros TS.

**User authorized direct push to main** (padrão do projeto). Commits intermediários NÃO pushed; push final na Task D.1.

---

## Phase A — Foundation

### Task A.1: Cria helpers de botão em `components/buttons.ts`

**Files:**
- Create: `components/buttons.ts`

- [ ] **Step 1: Escrever arquivo**

```ts
// components/buttons.ts
// Helpers de classe Tailwind para os 3 variantes de botão usados no site.
// Não é um componente React — só constantes de classe pra evitar inconsistências
// entre os ~15 CTAs inline espalhados.

import { cn } from './ui';

const BASE = 'inline-flex items-center justify-center gap-2 rounded-md font-bold transition';

const SIZES = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-5 py-2.5 text-[13px]',
  lg: 'px-6 py-3 text-[13px] sm:text-[14px]'
} as const;

export type BtnSize = keyof typeof SIZES;

/**
 * Botão primário — CTAs principais. Brand gradient + shadow brand + texto branco.
 * Aplica um shimmer sutil no :hover.
 *
 * Uso:
 *   <button className={btnPrimary('md')}>...</button>
 *   <Link href="..." className={btnPrimary('lg', 'self-start')}>...</Link>
 */
export function btnPrimary(size: BtnSize = 'md', extra?: string) {
  return cn(
    BASE,
    SIZES[size],
    'relative overflow-hidden bg-brand-gradient text-white shadow-brand hover:opacity-95',
    'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full',
    extra
  );
}

/**
 * Botão secundário — alternativa calma. Outline em surface-card.
 */
export function btnSecondary(size: BtnSize = 'md', extra?: string) {
  return cn(
    BASE,
    SIZES[size],
    'border border-border bg-surface-card text-text-strong shadow-soft hover:border-brand-500/40 hover:shadow-medium',
    extra
  );
}

/**
 * Botão terciário — link estilo. Sem padding/border, só texto.
 * Não tem `size` — sempre o mesmo tamanho de link inline.
 *
 * Uso típico:
 *   <Link className={btnTertiary()}>Ver editions <ArrowUpRight /></Link>
 */
export function btnTertiary(extra?: string) {
  return cn(
    'inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand-600 hover:text-brand-700 transition',
    extra
  );
}
```

- [ ] **Step 2: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```
Esperado: clean. ESLint pode warning que `btnSecondary` está unused — pode ignorar, vai ser consumido nas próximas tasks.

- [ ] **Step 3: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/buttons.ts && git commit -m "feat(ui): adiciona helpers btnPrimary/Secondary/Tertiary"
```

---

### Task A.2: Refatora `components/SectionHeader.tsx`

**Files:**
- Modify: `components/SectionHeader.tsx`

**Estado atual** (já existe; 23 linhas; tem `eyebrow`, `title`, `description`, `centered`):
```tsx
type SectionHeaderProps = { eyebrow, title, description?, centered? };
```
- Eyebrow renderiza como pill com `border-brand-500/30 bg-brand-500/10` (visual de chip)
- Title tamanho fixo `text-3xl sm:text-4xl lg:text-[44px]`
- `centered={true|false}` controla alinhamento

**Mudança:** simplifica o eyebrow pra um `<p>` uppercase (alinhado com workspace.google.com pricing — sem chips). Adiciona `maxWidth` prop. Sobe os tamanhos do title pra `lg:text-5xl`. Aceita ReactNode no título (já aceitava).

- [ ] **Step 1: Substituir arquivo completo**

```tsx
// components/SectionHeader.tsx
type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Default 'center'. 'left' usa alinhamento à esquerda sem max-w forçado. */
  align?: 'center' | 'left';
  /** Default 'wide' (max-w-3xl). 'narrow' usa max-w-2xl. */
  maxWidth?: 'narrow' | 'wide';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  maxWidth = 'wide'
}: SectionHeaderProps) {
  const widthClass = maxWidth === 'narrow' ? 'max-w-2xl' : 'max-w-3xl';
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`mb-12 ${widthClass} ${alignClass}`}>
      <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

**Watch:** o SectionHeader já é consumido pelo `Faq.tsx` (e talvez outros). Se algum consumidor passa `centered={true}`, a prop não existe mais — agora é `align="center"` (que é o default, então maioria nem precisa passar). Erros do tipo `Property 'centered' does not exist` na fase de typecheck devem ser corrigidos: trocar `centered={true}` por `align="center"` (ou remover, é default), e `centered={false}` por `align="left"`.

Procurar consumidores:
```bash
grep -rn "SectionHeader" /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign/components/ /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign/app/ --include="*.tsx"
```

Se houver consumidor com `centered=...`, faça a substituição (Edit) antes de prosseguir.

- [ ] **Step 3: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/SectionHeader.tsx && git commit -m "refactor(ui): SectionHeader em texto uppercase + align/maxWidth props"
```

(Se outros consumidores precisaram update no Step 2, inclua-os no `git add`.)

---

## Phase B — Mudanças visuais grandes (1 task por seção)

### Task B.1: Hero refinement + faixa Google de 4 cores

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Mudanças no Hero:**
- H1 quebra em **2 níveis visuais** — "Google Workspace com preço público." (peso máximo) + "Cloud, IA e produtividade — contrato direto." (peso menor, span block)
- Padding cresce: `py-16 sm:py-20 lg:py-24` → `py-20 sm:py-28 lg:py-36`
- Tamanho da H1 sobe nos breakpoints

**Mudança em `app/page.tsx`:**
- Insere uma `<div>` de 3px com gradient azul/vermelho/amarelo/verde Google entre `<Hero />` e `<BadgesShowcase />`

- [ ] **Step 1: Atualizar `components/Hero.tsx`**

Encontrar o bloco do `<motion.h1>` (linhas ~64-75) e substituir por:

```tsx
<motion.h1
  initial={REVEAL.initial}
  animate={REVEAL.animate}
  transition={{ ...REVEAL.transition, delay: 0.06 }}
  className="mt-7 text-balance text-[44px] font-extrabold leading-[0.96] tracking-[-0.045em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] sm:text-[60px] lg:text-[80px]"
>
  Google Workspace com{' '}
  <span className="font-extrabold tracking-[-0.02em] text-white">
    preço público.
  </span>
  <span className="mt-4 block text-[26px] font-medium leading-[1.18] tracking-[-0.02em] text-white/85 sm:text-[34px] lg:text-[42px]">
    Cloud, IA e produtividade — contrato direto.
  </span>
</motion.h1>
```

Encontrar o container vertical do hero (linha ~51, contém `py-16 sm:py-20 lg:py-24`) e substituir:

```tsx
<div className="container-shell relative py-20 sm:py-28 lg:py-36">
```

- [ ] **Step 2: Atualizar `app/page.tsx`** — inserir faixa 4-cor

Após `<Hero />` e antes de `<BadgesShowcase />`, inserir:

```tsx
<div
  className="h-[3px] w-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"
  aria-hidden="true"
/>
```

O JSX completo de `app/page.tsx` deve ficar:

```tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <div
        className="h-[3px] w-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"
        aria-hidden="true"
      />
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

- [ ] **Step 3: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```
Esperado: clean.

**Sanity check Tailwind**: `via-google-red` + `via-google-yellow` na mesma classe pode parecer inválido mas o Tailwind 3.x suporta múltiplos `via-*` em gradientes lineares. Se der erro de classe inválida, troca o gradient pra inline style:

```tsx
<div
  className="h-[3px] w-full"
  style={{ background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC04 66%, #34A853 100%)' }}
  aria-hidden="true"
/>
```

- [ ] **Step 4: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/Hero.tsx app/page.tsx && git commit -m "feat(hero): H1 em 2 niveis visuais + padding aumentado + faixa 4-cor Google"
```

---

### Task B.2: PricingGrid restructure — Recomendado spotlight + grid limpa

**Files:**
- Modify: `components/PricingGrid.tsx`

**Mudanças:**
1. Mata `xl:grid-cols-5`. Frontline e Enterprise usam ambos `sm:grid-cols-2 lg:grid-cols-3`.
2. Header da seção: troca markup inline por `<SectionHeader>`.
3. Card Recomendado ganha spotlight real: `scale-[1.04] z-10`, `ring-2 ring-brand-500/40`, selo elevado `-top-3.5`, sombra mais forte.
4. Cards calmos: padding `p-6 → p-7`, separador `border-t border-border my-5` entre preço e descrição.
5. CTAs dos cards usam `btnPrimary('md')` (recomendado) e `btnSecondary('md')` (calmos).

- [ ] **Step 1: Adicionar imports**

No topo do arquivo, adicionar:

```tsx
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary, btnSecondary } from '@/components/buttons';
```

- [ ] **Step 2: Substituir o header da seção**

Encontrar o bloco que começa em `<div className="mx-auto max-w-2xl text-center">` (após a abertura do `<div className="container-shell py-20...">`) e que termina com o `</p>` da descrição. Substituir todo o bloco pelo `<SectionHeader>`:

```tsx
<SectionHeader
  eyebrow="Preços Google Workspace"
  title={
    <>
      Tabela aberta.{' '}
      <span className="font-extrabold text-gradient-brand">Cotação na conversa.</span>
    </>
  }
  description="Valores de tabela em BRL por usuário/mês. Sujeitos a condições comerciais e ATAs vigentes."
  maxWidth="narrow"
/>
```

- [ ] **Step 3: Atualizar a grid de cards**

Encontrar o `<div>` que abre os cards (`<div id={activeTier === ...} className={cn('mt-10 grid gap-5', ...)}>`) e simplificar:

```tsx
<div
  id={activeTier === 'frontline' ? 'pricing-frontline' : 'pricing-enterprise'}
  className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
>
  {visiblePlans.map((plan) => (
    <PricingCard key={plan.id} plan={plan} onContact={openLead} />
  ))}
</div>
```

- [ ] **Step 4: Atualizar o `PricingCard`**

Encontrar a função `function PricingCard(...)` no fim do arquivo e substituir o JSX retornado por:

```tsx
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
        'relative flex flex-col rounded-2xl border bg-surface-card p-7 transition',
        plan.recommended
          ? 'z-10 border-brand-500/60 shadow-[0_28px_60px_-30px_rgba(249,115,22,0.55)] ring-2 ring-brand-500/40 lg:scale-[1.04]'
          : 'border-border shadow-soft hover:-translate-y-1 hover:shadow-medium'
      )}
    >
      {plan.recommended ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white shadow-brand">
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

      <div className="my-5 border-t border-border" />

      <p className="text-[12.5px] leading-relaxed text-text-muted">
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
        className={plan.recommended ? btnPrimary('md', 'mt-7 w-full') : btnSecondary('md', 'mt-7 w-full')}
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

Cuidado: o tipo de `plan.cta` precisa estar OK. Lembrar que `WorkspacePlan` tem `cta: string`. ✓

- [ ] **Step 5: Atualizar o disclaimer final**

Encontrar o `<p>` que tem "Valores de tabela. Sujeitos a..." (perto do fim do componente PricingGrid). Manter o conteúdo mas garantir que a classe usa `<a>` com `btnTertiary` em vez de inline. Substituir o `<a className="underline ...">Ver tabela completa de recursos</a>` por:

```tsx
<a href="#compare-all" className="underline underline-offset-2 hover:text-text-muted">
  Ver tabela completa de recursos
</a>
```

(Esse caso é uma exceção — não usa btnTertiary porque precisa do underline + comportamento de texto inline. Deixa assim.)

- [ ] **Step 6: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 7: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/PricingGrid.tsx && git commit -m "feat(pricing): SectionHeader + grid 3-col + Recomendado spotlight + btns helpers"
```

---

### Task B.3: FAQ redesign visual com `<details>`

**Files:**
- Modify: `components/Faq.tsx`

**Estado atual:** já usa `SectionHeader`, mas o acordeão é via `useState` + `<button>` + `<div className="grid grid-rows-...">` (com transição de altura). 6 perguntas, 3 marcadas com `// ⚠ TODO`. Tem um CTA "Não achou? Pergunta direto" próximo ao header.

**Mudança:** troca por `<details>` HTML nativo (acessível por default, sem state React). Remove `useState`. Mantém SectionHeader e o CTA. Aplica `btnSecondary` no CTA "Não achou?".

- [ ] **Step 1: Substituir arquivo completo**

```tsx
'use client';

import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { btnSecondary } from '@/components/buttons';

type FaqItem = {
  question: string;
  answer: string;
};

const items: FaqItem[] = [
  {
    question: 'Os preços são finais?',
    answer:
      'Não — são valores de tabela. Há condições por volume, ATAs e contratos plurianuais. Cotação fechada na conversa.'
  },
  {
    question: 'Vocês emitem nota? Como funciona o faturamento?',
    answer:
      'Sim. Hypercloud é revendedora Premier Partner — faturamos direto. Boletos/NF-e mensais com gestor de conta.'
  },
  {
    question: 'Conseguem fornecer para governo?',
    answer:
      'Sim. ATAs vigentes (ARP CIMPAR, CIASC-SC e outras). Veja /setor-publico para os caminhos formais de aquisição.'
  },
  // ⚠ TODO: confirmar com comercial Hypercloud antes de production — prazos chutados
  {
    question: 'Quanto tempo leva para contratar?',
    answer:
      'Setor privado: 24-72h após validação. Setor público: depende do veículo de aquisição (adesão a ATA, pregão, contratação direta).'
  },
  // ⚠ TODO: confirmar com comercial Hypercloud antes de production — SLAs por tier
  {
    question: 'Suporte? SLA?',
    answer:
      'Atendimento nacional, time dedicado. SLAs personalizáveis para Enterprise.'
  },
  // ⚠ TODO: confirmar com comercial Hypercloud antes de production — usar numero real se quiser quantificar
  {
    question: 'Posso migrar de outro provedor (M365, Zoho, etc.)?',
    answer:
      'Sim. Plano de migração consultivo já estruturado.'
  }
];

export function Faq() {
  const { open: openLead } = useLeadDialog();

  return (
    <section className="bg-surface-card py-20 sm:py-28 lg:py-32">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Perguntas frequentes"
              title={
                <>
                  Direto ao{' '}
                  <span className="font-extrabold text-gradient-brand">ponto</span>.
                </>
              }
              description="As 6 perguntas que aparecem em quase toda primeira conversa. Se a sua não tá aqui, fala com a gente."
              align="left"
            />
            <button
              type="button"
              onClick={() => openLead()}
              className={btnSecondary('md', 'mt-2')}
            >
              Não achou? Pergunta direto
            </button>
          </div>

          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.question}>
                <details className="group rounded-2xl border border-border bg-surface-card p-5 transition open:bg-surface-soft open:border-brand-500/40 hover:border-brand-500/30 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-[14.5px] font-bold tracking-tight text-text-strong sm:text-[15.5px]">
                      {item.question}
                    </span>
                    <ChevronDown className="h-5 w-5 shrink-0 text-text-muted transition group-open:rotate-180 group-open:text-brand-500" />
                  </summary>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-text-muted sm:text-[14px]">
                    {item.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

Mudanças destacadas:
- Remove `useState`, remove `Minus`/`Plus` imports.
- Adiciona `ChevronDown` import.
- Adiciona `btnSecondary` import.
- Usa `<details>` + `<summary>` HTML nativo.
- Usa `group-open:rotate-180` no chevron.
- Section padding sobe pra `py-20 sm:py-28 lg:py-32`.
- BG da section explicitamente `bg-surface-card` (era `bg-surface-base` que herdava da page).
- `align="left"` no SectionHeader (mantém o layout split com a grid).

⚠ **Important:** `<summary>` por default tem um disclosure triangle nativo do browser. O CSS adiciona `list-none` pra removê-lo. Em Firefox/Safari, pode precisar de regras extras (`::-webkit-details-marker` / `summary::marker`). Se aparecer um triangle nativo no Firefox, adicionar no `globals.css`:

```css
summary::-webkit-details-marker { display: none; }
summary::marker { content: ''; }
```

Mas só fazer isso se aparecer — não preventivo.

- [ ] **Step 2: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/Faq.tsx && git commit -m "feat(faq): redesign com <details> nativo + btnSecondary"
```

---

### Task B.4: Footer refresh

**Files:**
- Modify: `components/Footer.tsx`

**Estado atual:** 4 colunas grid 4/2/3/3 com Sobre/Soluções/Atendimento/Compliance, redes sociais, e bar inferior com "© 2026 Hypercloud · CNPJ XX.XXX.XXX/0001-XX · Feito no Brasil". Já tem placeholder de CNPJ.

**Mudanças mínimas:**
- 4-color Google dots ao lado do CNPJ no bar inferior.
- Item "Comparar Planos" troca ancor pra `#compare-all` (já estava bom de Task 3.1 do plan anterior).
- "Premier Google Cloud Partner" no rodapé inferior — explicito.
- Padronizar hover dos links com `transition hover:text-text-strong` (atualmente é `hover:text-brand-400` — vai contrastar mal com a paleta Google neutra; melhor manter neutro).
- Remove o badge "Partnered with Google Cloud" no canto inferior direito (redundante com BadgesShowcase agora).

- [ ] **Step 1: Substituir arquivo completo**

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-soft">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Image
            src="/logo/lg.hypercloud_horizontal.png"
            alt="Hypercloud"
            width={220}
            height={56}
            className="h-10 w-auto dark:brightness-0 dark:invert"
          />
          <p className="mt-5 max-w-sm text-[13px] leading-7 text-text-muted">
            Google Workspace, Workspace with Gemini, Google Cloud e AppSheet com foco em performance, autoridade e transformação digital para empresas e setor público.
          </p>

          <ul className="mt-6 space-y-3 text-[13px] text-text-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-text-subtle" />
              <span>Contagem · MG · Atendimento nacional</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-text-subtle" />
              <a href="tel:3140424483" className="transition hover:text-text-strong">
                (31) 4042-4483
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-text-subtle" />
              <a href="mailto:contato@hypercloud.com.br" className="transition hover:text-text-strong">
                contato@hypercloud.com.br
              </a>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {[
              { href: 'https://www.linkedin.com/', label: 'LinkedIn', Icon: Linkedin },
              { href: 'https://www.instagram.com/', label: 'Instagram', Icon: Instagram },
              { href: 'https://www.facebook.com/', label: 'Facebook', Icon: Facebook }
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-card text-text-muted transition hover:border-brand-500/40 hover:text-text-strong"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Soluções</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/solucoes/google-workspace" className="transition hover:text-text-strong">Google Workspace</Link></li>
            <li><Link href="/solucoes/gemini-enterprise" className="transition hover:text-text-strong">Gemini Enterprise</Link></li>
            <li><Link href="/solucoes/google-cloud" className="transition hover:text-text-strong">Google Cloud</Link></li>
            <li><Link href="/solucoes/appsheet" className="transition hover:text-text-strong">AppSheet</Link></li>
            <li><Link href="/#pricing" className="transition hover:text-text-strong">Preços</Link></li>
            <li><Link href="/#compare-all" className="transition hover:text-text-strong">Comparar Planos</Link></li>
            <li><Link href="/cases" className="transition hover:text-text-strong">Cases e Clientes</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Atendimento</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/sobre" className="transition hover:text-text-strong">Sobre a Hypercloud</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Setor Público · ATAs</Link></li>
            <li><Link href="/portal-do-cliente" className="transition hover:text-text-strong">Portal do Cliente</Link></li>
            <li><Link href="/suporte" className="transition hover:text-text-strong">Suporte e Chamados</Link></li>
            <li><a href="mailto:comercial@hypercloud.com.br" className="transition hover:text-text-strong">comercial@hypercloud.com.br</a></li>
            <li><a href="mailto:licitacoes@hypercloud.com.br" className="transition hover:text-text-strong">licitacoes@hypercloud.com.br</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Compliance & Legal</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Programa de Integridade</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Código de Ética</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Canal de Ouvidoria</Link></li>
            <li><Link href="/" className="transition hover:text-text-strong">Política de Privacidade</Link></li>
            <li><Link href="/" className="transition hover:text-text-strong">Termos de Uso</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col items-start justify-between gap-3 py-5 text-[12px] text-text-subtle sm:flex-row sm:items-center">
          <p className="flex items-center gap-2">
            {/* Google 4-color dot row — assinatura visual */}
            <span className="flex items-center gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-google-blue" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-red" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-yellow" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-green" />
            </span>
            <span>© {year} Hypercloud · Premier Google Cloud Partner</span>
          </p>
          <p className="flex items-center gap-2">
            {/* TODO: confirmar CNPJ com administrativo Hypercloud */}
            <span>CNPJ XX.XXX.XXX/0001-XX</span>
            <span className="hidden sm:inline">·</span>
            <span>Feito no Brasil</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

Mudanças destacadas vs versão anterior:
- Remove `ShieldCheck` import (não usado mais).
- Adiciona "Preços" como item separado em Soluções, antes de "Comparar Planos".
- Hover color trocado de `hover:text-brand-400` pra `hover:text-text-strong` (mais neutro, alinhado com Google look).
- Ícones do contato em `text-text-subtle` (era `text-brand-400` — laranja sobressaía demais).
- Remove o cartão "Partnered with Google Cloud" no canto inferior direito (vira parte do bar inferior).
- Adiciona 4-color dots row no bar inferior, esquerda.
- "Premier Google Cloud Partner" no bar inferior junto com copyright.
- `// TODO: confirmar CNPJ com administrativo Hypercloud` comment marca o placeholder explicitamente.

- [ ] **Step 2: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 3: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/Footer.tsx && git commit -m "feat(footer): refresh com 4-dots Google + Premier badge + hover neutro"
```

---

## Phase C — Consistency sweep

### Task C.1: CompareAllTable — SectionHeader + buttons + stagger

**Files:**
- Modify: `components/CompareAllTable.tsx`

- [ ] **Step 1: Adicionar imports**

```tsx
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary } from '@/components/buttons';
```

- [ ] **Step 2: Substituir o header da seção**

Encontrar o bloco que começa `<div className="mx-auto max-w-3xl text-center">` (logo após `<div className="container-shell py-20...">`) com eyebrow "Tabela completa" + h2 "Compare todos..." + p. Substituir tudo por:

```tsx
<SectionHeader
  eyebrow="Tabela completa"
  title="Compare todos os planos Workspace."
  description={`${workspaceFeatures.length} recursos · 8 SKUs · sem letrinha miúda.`}
/>
```

- [ ] **Step 3: Atualizar container padding**

Substituir `py-20 sm:py-24 lg:py-28` por `py-20 sm:py-28 lg:py-32`.

- [ ] **Step 4: Substituir o CTA final**

Encontrar o `<button>` "Ainda em dúvida? Falar com um especialista" no fim do componente. Substituir className inline por `btnPrimary('lg')`:

```tsx
<button
  type="button"
  onClick={() => openLead('Compare — Workspace')}
  className={btnPrimary('lg')}
>
  Ainda em dúvida? Falar com um especialista
</button>
```

(O `gap-2` e `rounded-md` já vêm no btnPrimary, então pode remover.)

- [ ] **Step 5: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 6: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/CompareAllTable.tsx && git commit -m "refactor(compare-all): SectionHeader + btnPrimary + padding padronizado"
```

---

### Task C.2: OtherSolutions — SectionHeader + buttons + icon hover + stagger

**Files:**
- Modify: `components/OtherSolutions.tsx`

- [ ] **Step 1: Adicionar imports**

```tsx
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary, btnTertiary } from '@/components/buttons';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';
```

- [ ] **Step 2: Substituir o header**

Encontrar o bloco `<div className="mx-auto max-w-2xl text-center">` com eyebrow "Outras soluções Google" + h2 + p. Substituir por:

```tsx
<SectionHeader
  eyebrow="Outras soluções Google"
  title={
    <>
      Além do Workspace,{' '}
      <span className="font-extrabold text-gradient-brand">também vendemos.</span>
    </>
  }
  description="Cloud, IA standalone e automação no-code — cotação consultiva, sem tabela pública."
  maxWidth="narrow"
/>
```

- [ ] **Step 3: Padding da seção**

Trocar `py-20 sm:py-24` por `py-20 sm:py-28 lg:py-32`.

- [ ] **Step 4: Envolver grid em Stagger**

Encontrar `<div className="mt-10 grid gap-5 lg:grid-cols-3">` e substituir por `<Stagger>`:

```tsx
<Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
  {cards.map((card) => {
    const Icon = card.icon;
    return (
      <StaggerItem key={card.title}>
        <div className="group flex h-full flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition group-hover:rotate-6 group-hover:scale-110 ${card.iconBg} ${card.iconColor}`}>
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
              className={btnPrimary('md')}
            >
              Falar com Especialista
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            {card.detailHref && card.detailLabel ? (
              <Link href={card.detailHref} className={btnTertiary()}>
                {card.detailLabel}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
        </div>
      </StaggerItem>
    );
  })}
</Stagger>
```

Mudanças destacadas:
- `<div>` outer da card vira filho de `<StaggerItem>`.
- `group flex h-full flex-col` — `h-full` garante que os cards no Stagger têm altura igual.
- Hover lift padronizado pra `-translate-y-1` (era `-translate-y-0.5`).
- Icon wrapper ganha `transition group-hover:rotate-6 group-hover:scale-110` — micro-interação consistente.
- CTAs usam `btnPrimary('md')` e `btnTertiary()`.

- [ ] **Step 5: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 6: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/OtherSolutions.tsx && git commit -m "refactor(other-solutions): SectionHeader + Stagger + icon hover + btns helpers"
```

---

### Task C.3: EndpointVsCeu — SectionHeader + buttons + icon hover

**Files:**
- Modify: `components/EndpointVsCeu.tsx`

- [ ] **Step 1: Adicionar imports**

```tsx
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary } from '@/components/buttons';
```

- [ ] **Step 2: Substituir o header**

Encontrar o bloco do título no JSX (`<div className="mx-auto max-w-3xl text-center">` com eyebrow "Gestão de dispositivos" + h2 + p). Substituir por:

```tsx
<SectionHeader
  eyebrow="Gestão de dispositivos"
  title={
    <>
      Endpoint Management vs{' '}
      <span className="font-extrabold text-gradient-brand">Chrome Enterprise Upgrade.</span>
    </>
  }
  description="Comprar Workspace Enterprise Plus dá controle sobre dados e usuários no Google. CEU controla o dispositivo ChromeOS (hardware + sistema). Não são substitutos — são complementares em cenários com fleet Chromebook."
/>
```

(A descrição perde os `<span className="font-semibold">` inline porque SectionHeader só aceita string. Se for crítico manter o destaque, pode trocar `description` por `description=` em um node React, mas SectionHeader hoje só aceita string. Decisão: aceitar perda do destaque inline aqui — a descrição ainda comunica a ideia.)

- [ ] **Step 3: Atualizar padding**

Trocar `py-20 sm:py-24` por `py-20 sm:py-28 lg:py-32`.

- [ ] **Step 4: Icon hover nas ColumnCard**

Encontrar a função `ColumnCard` (`function ColumnCard(...)`). No JSX, achar o wrapper do ícone:

```tsx
<span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
  <Icon className="h-5 w-5" />
</span>
```

Substituir por:

```tsx
<span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 transition group-hover:rotate-6 group-hover:scale-110">
  <Icon className="h-5 w-5" />
</span>
```

E adicionar `group` na div externa do ColumnCard:

```tsx
<div className="group rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
```

(Trocar também o hover lift de `-translate-y-0.5` para `-translate-y-1` se estiver presente.)

- [ ] **Step 5: CTA usa btnPrimary**

Encontrar o `function CTAButton()`:

```tsx
function CTAButton() {
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

Substituir className por `btnPrimary('md')`:

```tsx
function CTAButton() {
  const { open: openLead } = useLeadDialog();
  return (
    <button
      type="button"
      onClick={() => openLead('Workspace + CEU')}
      className={btnPrimary('md')}
    >
      Falar com Especialista
    </button>
  );
}
```

- [ ] **Step 6: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 7: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/EndpointVsCeu.tsx && git commit -m "refactor(endpoint-ceu): SectionHeader + icon hover + btnPrimary"
```

---

### Task C.4: BadgesShowcase — Stagger + lift padronizado

**Files:**
- Modify: `components/BadgesShowcase.tsx`

**Mudanças:**
- Envolver a grade dos badges em `<Stagger>` / `<StaggerItem>` para animação coordenada.
- Padronizar hover lift pra `-translate-y-1` (era `-translate-y-0.5`).
- Não usa `SectionHeader` (BadgesShowcase é trust strip, header pequeno tipo eyebrow centralizado; mantém o eyebrow atual).

- [ ] **Step 1: Adicionar import**

```tsx
import { Stagger, StaggerItem } from '@/components/MotionWrapper';
```

- [ ] **Step 2: Substituir a grid**

Encontrar `<div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7">` e trocar `<div>` por `<Stagger>`:

```tsx
<Stagger className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7">
  {badges.map((badge) => (
    <StaggerItem key={badge.file}>
      <div className="group flex h-full flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-surface-soft p-4 transition hover:-translate-y-1 hover:border-brand-500/40 hover:bg-surface-card hover:shadow-medium">
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
    </StaggerItem>
  ))}
</Stagger>
```

(O wrapper anterior tinha o `<div>` da tile como filho direto do `<div className="grid">`. Agora há um `<StaggerItem>` no meio — o tile precisa receber `h-full` pra preencher a altura do `StaggerItem`.)

- [ ] **Step 3: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 4: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/BadgesShowcase.tsx && git commit -m "refactor(badges): Stagger + lift padronizado em -translate-y-1"
```

---

### Task C.5: AtasStrip — btnTertiary no link "Ver todas as ATAs"

**Files:**
- Modify: `components/AtasStrip.tsx`

- [ ] **Step 1: Adicionar import**

```tsx
import { btnTertiary } from '@/components/buttons';
```

- [ ] **Step 2: Substituir o Link "Ver todas as ATAs"**

Encontrar:

```tsx
<Link
  href="/setor-publico"
  className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand-600 transition hover:text-brand-700"
>
  Ver todas as ATAs e caminhos de aquisição
  <ArrowUpRight className="h-3.5 w-3.5" />
</Link>
```

Substituir className inline por `btnTertiary('mt-4')`:

```tsx
<Link href="/setor-publico" className={btnTertiary('mt-4')}>
  Ver todas as ATAs e caminhos de aquisição
  <ArrowUpRight className="h-3.5 w-3.5" />
</Link>
```

(O `extra` arg do btnTertiary recebe `'mt-4'` pra manter o margin top.)

- [ ] **Step 3: Padronizar hover lift dos ATA cards**

Encontrar:
```tsx
className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-soft px-4 py-3.5 transition hover:-translate-y-0.5 hover:border-brand-500/40 hover:bg-surface-card hover:shadow-medium"
```

Trocar `-translate-y-0.5` por `-translate-y-1`.

- [ ] **Step 4: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 5: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/AtasStrip.tsx && git commit -m "refactor(atas-strip): btnTertiary + hover lift padronizado"
```

---

### Task C.6: SpecialistCta — SectionHeader inline + btnPrimary + btnSecondary

**Files:**
- Modify: `components/SpecialistCta.tsx`

**Estado atual:** componente tem seu próprio header inline (badge + h2 + p), 2 CTAs (Iniciar conversa + WhatsApp), e uma lista de "3 passos" lateral. É um bloco rico — não vou refatorar pra usar `SectionHeader` (a estrutura é diferente).

Mudanças mínimas: trocar os 2 botões pelos helpers.

- [ ] **Step 1: Adicionar import**

```tsx
import { btnPrimary, btnSecondary } from '@/components/buttons';
```

- [ ] **Step 2: Trocar o botão "Iniciar conversa"**

Encontrar:
```tsx
<button
  type="button"
  onClick={() => openLead()}
  className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-6 py-3.5 text-sm font-bold text-white shadow-brand transition hover:opacity-95"
>
  Iniciar conversa
  <ArrowRight className="h-4 w-4" />
</button>
```

Substituir por:
```tsx
<button
  type="button"
  onClick={() => openLead()}
  className={btnPrimary('lg')}
>
  Iniciar conversa
  <ArrowRight className="h-4 w-4" />
</button>
```

- [ ] **Step 3: Trocar o link "WhatsApp direto"**

Encontrar:
```tsx
<a
  href="https://wa.me/5531992391683?text=Olá,%20quero%20falar%20com%20um%20especialista%20da%20Hypercloud."
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-5 py-3.5 text-sm font-bold text-text transition hover:border-brand-500/40 hover:text-text-strong"
>
  <MessageCircle className="h-4 w-4 text-brand-400" />
  WhatsApp direto
</a>
```

Substituir por:
```tsx
<a
  href="https://wa.me/5531992391683?text=Olá,%20quero%20falar%20com%20um%20especialista%20da%20Hypercloud."
  target="_blank"
  rel="noreferrer"
  className={btnSecondary('lg')}
>
  <MessageCircle className="h-4 w-4 text-brand-400" />
  WhatsApp direto
</a>
```

- [ ] **Step 4: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 5: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/SpecialistCta.tsx && git commit -m "refactor(specialist-cta): troca botoes para helpers btnPrimary/Secondary"
```

---

### Task C.7: Navbar — btnPrimary no "Falar com Especialista"

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Adicionar import**

```tsx
import { btnPrimary } from '@/components/buttons';
```

- [ ] **Step 2: Trocar o botão "Falar com Especialista" desktop**

Encontrar (no JSX desktop, próximo ao final do `<div className="ml-auto hidden items-center gap-2 lg:flex">`):

```tsx
<button
  type="button"
  onClick={() => openLead('Vamos entender seu cenário em três passos rápidos.')}
  className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-4 py-2 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
>
  Falar com Especialista
</button>
```

Substituir por:
```tsx
<button
  type="button"
  onClick={() => openLead('Vamos entender seu cenário em três passos rápidos.')}
  className={btnPrimary('md')}
>
  Falar com Especialista
</button>
```

- [ ] **Step 3: Trocar o botão "Falar com Especialista" mobile**

No menu mobile (`{open ? (...) : null}`), encontrar:

```tsx
<button
  type="button"
  onClick={() => {
    setOpen(false);
    openLead();
  }}
  className="rounded-md bg-brand-gradient px-4 py-3 text-center text-sm font-bold text-white shadow-brand transition hover:opacity-95"
>
  Falar com Especialista
</button>
```

Substituir por:
```tsx
<button
  type="button"
  onClick={() => {
    setOpen(false);
    openLead();
  }}
  className={btnPrimary('md', 'w-full')}
>
  Falar com Especialista
</button>
```

(O `extra='w-full'` garante que o botão ocupa a largura toda no menu mobile, o que o original fazia por padrão.)

- [ ] **Step 4: Verify**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```

- [ ] **Step 5: Commit**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git add components/Navbar.tsx && git commit -m "refactor(navbar): btnPrimary nos CTAs desktop e mobile"
```

---

## Phase D — Final verification

### Task D.1: Build, smoke E2E manual + push

**Files:** *(read-only)*

- [ ] **Step 1: Final lint+typecheck**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx tsc --noEmit && npx next lint
```
Esperado: clean.

- [ ] **Step 2: Confirm commits unpushed**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git log --oneline origin/main..HEAD
```
Esperado: 13 commits (1 de A.1, 1 de A.2, 4 de B.1-B.4, 7 de C.1-C.7).

- [ ] **Step 3: Production build**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npx next build
```
Esperado: success. Tamanho do bundle JS pode variar levemente (`buttons.ts` adiciona ~600 bytes; o resto é substituição de classes). Páginas listadas: `/`, `/cases`, `/setor-publico`, `/sobre`, `/suporte`, `/portal-do-cliente`, `/dashboard`, `/solucoes/[slug]` (4 SSG variants), `/api/auth/[...nextauth]`, `/api/lead`, `/_not-found`. Sem warnings de hidratação ou page errors.

- [ ] **Step 4: Smoke check via dev server (curto)**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && npm run dev &
sleep 6
curl -s http://localhost:3000/ | grep -o "Google Workspace com" | head -1
kill %1
```

Esperado: prints `Google Workspace com` (confirma que o hero renderiza).

(Em ambiente Windows/gitbash o `&` background pode não funcionar igual; alternativa: pular este step e fazer smoke manual no Railway depois do push.)

- [ ] **Step 5: Push**

```bash
cd /c/Users/jotap/Downloads/hypercloud-redesign/hypercloud-redesign && git push origin main
```

Esperado: push success. Railway redeploya em ~2min.

- [ ] **Step 6: Report**

Final report: lista dos 13 commits, output do build (page list + sizes), smoke check status, push confirmation.

---

## Self-review

### Spec coverage

| Requisito do spec | Task |
|---|---|
| Frente 1 — Hero H1 em 2 níveis | B.1 |
| Frente 1 — Padding hero cresce | B.1 |
| Frente 1 — Faixa 4-cor Google entre Hero e Badges | B.1 (mexe em app/page.tsx) |
| Frente 2 — Mata xl:grid-cols-5 | B.2 |
| Frente 2 — Recomendado spotlight (scale, ring forte, selo elevado) | B.2 |
| Frente 2 — Padding interno cards p-6→p-7 | B.2 |
| Frente 2 — Separador entre preço e descrição | B.2 |
| Frente 3 — SectionHeader refatorado (eyebrow uppercase + maxWidth + align) | A.2 |
| Frente 3 — Anatomia padrão em todas as seções | B.2, B.3, C.1, C.2, C.3 |
| Frente 3 — Padding padrão py-20/28/32 | B.2, B.3, C.1, C.2, C.3 |
| Frente 3 — BG alternação intencional | B.3 (FAQ explícito), outras herdam |
| Frente 4 — buttons.ts com btnPrimary/Secondary/Tertiary | A.1 |
| Frente 4 — Aplicar btns em Hero, PricingGrid, Compare, Other, Endpoint, Atas, Specialist, Navbar | B.2, C.1, C.2, C.3, C.5, C.6, C.7 (Hero não usa btnPrimary por causa do BG escuro, é exceção documentada na spec) |
| Frente 5 — Footer refresh com 4-dots e Premier badge | B.4 |
| Frente 6 — FAQ acordeão `<details>` | B.3 |
| Frente 6 — FAQ usa SectionHeader (já usava) | B.3 (mantém) |
| Frente 6 — FAQ usa btnSecondary | B.3 |
| Frente 7 — Hover lift `-translate-y-1` padronizado | C.2, C.3, C.4, C.5 |
| Frente 7 — Icon rotate-6 + scale-110 em hover | C.2, C.3 |
| Frente 7 — Stagger nas grids | C.2 (Other), C.4 (Badges); FAQ não precisa (já tem espaçamento próprio) |
| Frente 7 — Shimmer no btnPrimary | A.1 (built-in via `before:`) |
| Política CNPJ placeholder marcado | B.4 (comment) |
| Política do Hero sem Reveal preservada | B.1 (continua com motion inline) |

Sem gaps. Política/animations: ratificada na A.1 (shimmer via pseudo-elemento) — não conflita com o framework existente.

### Placeholder scan

Procurei na minha cabeça: "TBD", "TODO" inline em código a escrever, "appropriate", "similar to Task N".

Hits:
- `B.4` mantém o `// TODO: confirmar CNPJ com administrativo` — esse é INTENCIONAL e listado em "Dados pendentes" no spec. ✓
- `B.3` mantém os `// ⚠ TODO` do FAQ — esses já existem no código atual e foram criados num spec anterior. ✓
- Não há outros TODOs/TBDs introduzidos pelo plano.

Sem placeholders.

### Type consistency

- `btnPrimary(size, extra)`, `btnSecondary(size, extra)`, `btnTertiary(extra)` — consistentes em A.1 e em todos os consumidores B.*/C.*.
- `SectionHeader` com `align?: 'center' | 'left'` e `maxWidth?: 'narrow' | 'wide'` — consistente em A.2 e em todos os consumidores.
- Nenhum nome de função/prop diverge entre tasks.

### Scope check

13 tasks distribuídas em 4 fases. Cada task tem código completo e verificação. Tamanho do plano ~1700 linhas — razoável. Sem necessidade de decomposição adicional.

Plano pronto pra execução.
