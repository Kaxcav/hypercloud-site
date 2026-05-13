# Design Polish — Spec

**Data:** 2026-05-13
**Status:** Brainstorming aprovado, aguardando review do spec

## Contexto

O site Hypercloud passou por refatoração estrutural (pricing-first) e troca de tipografia/paleta (Google Sans / Roboto Flex + cores oficiais Google) nos últimos 2 dias. O conteúdo e a arquitetura estão prontos, mas o **polimento visual** ainda está irregular:

- Hero tem peso visual menor do que deveria pra primeira impressão.
- PricingGrid em Enterprise (5 cards) aperta em `xl:grid-cols-5`.
- Seções não seguem uma anatomia consistente — cada uma resolve eyebrow/header/description do jeito que quis.
- Botões CTA têm 4-5 variantes de estilo inline ao longo do código, com pequenas diferenças.
- Footer não foi tocado nessa onda de mudanças.
- FAQ ganhou copy nova mas o componente em si continua com o visual antigo.
- Microinterações (hover lifts, stagger) variam por componente.

Objetivo dessa fase: passar uma sweep de polimento em 7 frentes para deixar o site coeso visualmente sem mudar a estrutura/conteúdo.

## Princípios da mudança

- **Coerência > criatividade.** O laranja Hypercloud + tipografia Google + cores Google nos produtos já estão definidos; essa sweep só consolida o uso.
- **Sem novos componentes pesados.** Helpers compartilhados (constantes string, função `cn`) — não criar `Button.tsx`/`Card.tsx`. Mantém estilo Tailwind inline.
- **Hero é único.** Tudo o que falo abaixo sobre "padronizar seção" se aplica a Badges, Pricing, Compare, Other, FAQ e CTA — Hero fica fora porque é o único bloco com BG foto/laranja.
- **Sem novas dependências.**

## Frente 1 — Hero refinement

Arquivo: `components/Hero.tsx`

**H1 ganha mais peso e quebra em 2 níveis visuais:**

```tsx
<h1 className="text-[44px] sm:text-[60px] lg:text-[80px] leading-[0.96] tracking-[-0.045em] font-extrabold text-white">
  Google Workspace com{' '}
  <span className="text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]">
    preço público.
  </span>
  <span className="block mt-3 text-[28px] sm:text-[36px] lg:text-[44px] font-medium leading-[1.15] text-white/85">
    Cloud, IA e produtividade — contrato direto.
  </span>
</h1>
```

- Linha 1 (90% do peso visual): "Google Workspace com preço público." — peso extrabold + tamanho maior.
- Linha 2 (apoio): "Cloud, IA e produtividade — contrato direto." em peso medium + 60% do tamanho + opacidade `white/85`. Marca semanticamente: o foco do hero é Workspace; os outros produtos são contextuais.

**Padding crescido:** `py-20 sm:py-28 lg:py-36` (era `py-16 sm:py-20 lg:py-24`). Hero ocupa mais real-estate vertical — primeira impressão deserves space.

**Faixa de 4 cores Google após o hero:** logo após `</section>` do Hero, adicionar uma faixa de 3px de altura com as 4 cores:

```tsx
<div className="h-[3px] w-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green" aria-hidden="true" />
```

A composição da home (`app/page.tsx`) intercala essa faixa entre `<Hero />` e `<BadgesShowcase />`. Assinatura visual instantânea de Google.

## Frente 2 — PricingGrid restructure

Arquivo: `components/PricingGrid.tsx`

**Mata o `xl:grid-cols-5`.** Grid passa a:

- Frontline (3 cards): `sm:grid-cols-2 lg:grid-cols-3`
- Enterprise (5 cards): `sm:grid-cols-2 lg:grid-cols-3` (5 cards = 3+2, segunda linha centralizada via `justify-items-center` e cards mantendo largura máxima própria; OU 3+2 alinhada à esquerda, é mais limpo)

Implementação: usar `lg:grid-cols-3` com classe condicional para o tier ativo. Não precisa de hack — 5 cards numa grade de 3 simplesmente quebra pra 3+2.

**Card Recomendado ganha spotlight real:**

- `lg:scale-[1.04]` (era sem escala)
- `ring-2 ring-brand-500/40` (era ring-1 com 30%)
- Selo "Recomendado" posicionado `-top-3.5` (era -top-3) com sombra
- z-index acima dos outros pra não ser cortado

**Cards calmos crescem padding e ganham respiro:**

- `p-6 → p-7` (todos os cards)
- Linha divisória fina entre preço e descrição do audience: `border-t border-border my-5` (atualmente o flow é solto)

## Frente 3 — Section rhythm

Arquivo novo: `components/SectionHeader.tsx` (já existe um na codebase com formato diferente — refatorar pra padrão único)

**Anatomia padrão:**

```tsx
type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;       // permite ReactNode pra ter span coloridos no meio
  description?: string;
  align?: 'center' | 'left';
  maxWidth?: 'narrow' | 'wide'; // narrow = max-w-2xl, wide = max-w-3xl
};
```

Renderiza:

```tsx
<div className={cn('mx-auto', align === 'center' ? 'text-center' : '', maxWidth === 'narrow' ? 'max-w-2xl' : 'max-w-3xl')}>
  <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-600">{eyebrow}</p>
  <h2 className="mt-3 text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-strong">{title}</h2>
  {description && <p className="mt-4 text-base sm:text-lg leading-relaxed text-text-muted">{description}</p>}
</div>
```

**Padding padrão de seção:** `py-20 sm:py-28 lg:py-32` em PricingGrid, CompareAllTable, OtherSolutions, FAQ. BadgesShowcase mantém `py-12 sm:py-14 lg:py-16` (é trust strip, não merece tanto espaço quanto seção de conteúdo).

**BG alternação (intencional):**

- BadgesShowcase: `bg-surface-card` (branco)
- PricingGrid: `bg-surface-base` (light gray neutro)
- CompareAllTable: `bg-surface-card` (branco)
- OtherSolutions: `bg-surface-soft` (cinza levemente mais escuro)
- FAQ: `bg-surface-card`
- SpecialistCta: já tem tratamento próprio (manter)

**Divider sutil** onde duas seções de mesma cor se tocam: `border-t border-border` no segundo bloco. Garante separação visual sem barulho.

## Frente 4 — Sistema de botões

Arquivo novo: `components/buttons.ts`

```ts
import { cn } from './ui';

const BASE = 'inline-flex items-center justify-center gap-2 rounded-md font-bold transition';

const SIZES = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-5 py-2.5 text-[13px]',
  lg: 'px-6 py-3 text-[13px] sm:text-[14px]'
} as const;

export function btnPrimary(size: keyof typeof SIZES = 'md', extra?: string) {
  return cn(BASE, SIZES[size], 'bg-brand-gradient text-white shadow-brand hover:opacity-95', extra);
}

export function btnSecondary(size: keyof typeof SIZES = 'md', extra?: string) {
  return cn(BASE, SIZES[size], 'border border-border bg-surface-card text-text-strong shadow-soft hover:border-brand-500/40 hover:shadow-medium', extra);
}

export function btnTertiary(extra?: string) {
  // tertiary não tem size — sempre tamanho de link
  return cn('inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand-600 hover:text-brand-700 transition', extra);
}
```

**Substituições por arquivo (search-and-replace):**

- `components/Hero.tsx`: "Ver planos" → `btnPrimary('lg', 'bg-white text-brand-700 shadow-[...] hover:bg-white/95')` (sobrescreve para o caso especial do hero com BG escuro)
- `components/PricingGrid.tsx`: CTAs dos cards → `btnPrimary('md')` (recomendado), `btnSecondary('md')` (calmos), "Ver tabela completa" → `btnTertiary()`
- `components/CompareAllTable.tsx`: "Ainda em dúvida..." → `btnPrimary('lg')`
- `components/OtherSolutions.tsx`: CTAs → `btnPrimary('md')`, "Ver editions" → `btnTertiary()`
- `components/EndpointVsCeu.tsx`: CTA → `btnPrimary('md')`
- `components/AtasStrip.tsx`: link "Ver todas as ATAs" → `btnTertiary()`
- `components/SpecialistCta.tsx`: CTA principal → `btnPrimary('lg')`
- `components/Navbar.tsx`: "Falar com Especialista" → `btnPrimary('md')`

Cuidado especial onde tem ícone à direita (`ArrowRight`, etc) — o `btnPrimary` já tem `gap-2`, então não precisa de margem extra no ícone. O componente fica `<button className={btnPrimary('md')}><Text /><ArrowRight /></button>`.

## Frente 5 — Footer

Arquivo: `components/Footer.tsx` (precisa ser inspecionado primeiro)

**Refresh estrutural:**

- Logo Hypercloud (versão horizontal) à esquerda
- 4 colunas de links:
  - **Soluções**: Workspace, Workspace with Gemini, Google Cloud, AppSheet, Setor Público
  - **Empresa**: Sobre, Cases, Suporte
  - **Portal**: Portal do Cliente, Dashboard, Falar com Especialista
  - **Legal**: Termos, Privacidade (placeholder se não existirem)
- Linha de rodapé com:
  - 4 dots Google (cores)
  - "Hypercloud Tecnologia LTDA · CNPJ XX.XXX.XXX/0001-XX · Contagem · MG"
  - "Premier Google Cloud Partner · ATAs vigentes"
  - Copyright "© 2026 Hypercloud"
  - Email + telefone repetidos (acessibilidade — usuários que chegam direto no rodapé)

**CNPJ é placeholder.** Marca com comment `// TODO: confirmar CNPJ com administrativo`.

**Tipografia:** Roboto Flex em tudo. Color: `text-text-muted` para links inativos, `hover:text-text-strong` nos links.

## Frente 6 — FAQ visual

Arquivo: `components/Faq.tsx`

**Header da seção:** usar `SectionHeader` (eyebrow "Dúvidas frequentes" + H2 + descrição).

**Acordeão:**

```tsx
<details className="group rounded-2xl border border-border bg-surface-card p-6 transition open:bg-surface-soft hover:border-brand-500/30">
  <summary className="flex cursor-pointer items-center justify-between list-none gap-4">
    <h3 className="text-[15px] sm:text-base font-bold text-text-strong">{item.question}</h3>
    <ChevronDown className="h-5 w-5 shrink-0 text-text-muted transition group-open:rotate-180 group-open:text-brand-500" />
  </summary>
  <p className="mt-4 text-[14px] leading-relaxed text-text-muted">{item.answer}</p>
</details>
```

- Usa `<details>` HTML nativo — sem precisar de state React. Acessível por default.
- Hover: borda destaca em brand.
- Aberto: bg muda pra `surface-soft`, chevron gira + ganha cor brand.

**Espaçamento:** `space-y-3` entre as perguntas (era denso).

**Reveal anima cada pergunta com stagger** — ver Frente 7.

## Frente 7 — Hover & microinterações

**Hover lift padrão para cards:** `hover:-translate-y-1` (era `-translate-y-0.5` em alguns lugares; padronizar pra `-1`).

Componentes afetados:
- PricingGrid cards (calmos; o Recomendado já tem scale, não acumula)
- OtherSolutions cards
- BadgesShowcase tiles
- AtasStrip cards
- EndpointVsCeu colunas
- FAQ details (no `:hover` da borda)

**Icons em hover:** wrapper rotaciona 6° + escala 1.1.

```tsx
<span className="... transition group-hover:rotate-6 group-hover:scale-110">
  <Icon className="h-5 w-5" />
</span>
```

Aplicar nos icones de:
- OtherSolutions cards
- Process steps (se sobrar — Process foi deletado)
- EndpointVsCeu

**Stagger entre cards numa grid:** já temos `Stagger` + `StaggerItem` em `MotionWrapper.tsx`. Aplicar em:

- BadgesShowcase grid de badges
- PricingGrid cards
- OtherSolutions cards
- FAQ items

**Shimmer no botão primário:** já tem implementado no Hero. Espalhar pra `btnPrimary` via background:

```ts
// dentro de btnPrimary, adicionar:
'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full'
```

Cuidado: isso só faz sentido em primary; secondary fica calmo.

## Mudanças de arquivos (resumo)

| Arquivo | Ação |
|---|---|
| `components/Hero.tsx` | refator — h1 em 2 níveis, padding aumenta, mantém |
| `app/page.tsx` | insere `<div className="h-[3px] bg-gradient ...">` entre Hero e BadgesShowcase |
| `components/BadgesShowcase.tsx` | aplica `SectionHeader`, stagger, lift padronizado |
| `components/PricingGrid.tsx` | grid `lg:grid-cols-3` para Enterprise, Recomendado com scale + ring forte, padding interno cresce, separador entre preço e descrição |
| `components/CompareAllTable.tsx` | usa `SectionHeader`, padding seção, btnPrimary final |
| `components/OtherSolutions.tsx` | `SectionHeader`, stagger, icon hover, btnPrimary |
| `components/Faq.tsx` | redesign acordeão com `<details>`, `SectionHeader`, stagger |
| `components/SpecialistCta.tsx` | revisão leve — `SectionHeader` + btnPrimary lg |
| `components/EndpointVsCeu.tsx` | icon hover + btnPrimary, `SectionHeader` |
| `components/AtasStrip.tsx` | btnTertiary, lift padronizado |
| `components/Navbar.tsx` | btnPrimary md |
| `components/Footer.tsx` | refresh completo (4 cols + 4-dot accent + dados institucionais) |
| `components/SectionHeader.tsx` | refator (já existe; padroniza pro novo shape) |
| `components/buttons.ts` | NOVO — helpers de classe |

**Não muda:** layout/conteúdo. Só estilo. Toda string visível ao usuário fica idêntica.

## Política de animações (ratifica)

- `Reveal` (`MotionWrapper.tsx`) continua usado em conteúdo abaixo da dobra
- Hero NÃO usa Reveal (usa motion inline `initial`/`animate` direto — fix do bug do hero invisível)
- Stagger é seguro para cards in-viewport-after-scroll
- `prefers-reduced-motion`: framer-motion já trata — não inventar lógica nova

## Dados que dependem do usuário

| Pendência | Bloqueia? | Plano B |
|---|---|---|
| CNPJ Hypercloud para o footer | Não | TODO comment no código; renderiza sem CNPJ até confirmar |
| Decisão sobre Termos/Privacidade no footer | Não | Links como placeholder pra `/termos` e `/privacidade` (rotas que não existem ainda); 404 silencioso até criar páginas |

## Critérios de sucesso

1. `npm run build` verde após cada frente
2. Lint + typecheck limpos
3. `grep "font-serif\|italic\|emerald-500"` em components/app continua zero
4. Visual: hero ocupa mais altura inicial, faixa 4-cor visível, PricingGrid Recomendado destaca, sections têm ritmo claro de bg alternation, footer "completo" (4 cols + endereço)
5. Hover em qualquer card de qualquer seção tem o mesmo lift de 4px
6. Nenhum botão CTA do site usa className inline customizado — todos passam por `btnPrimary/btnSecondary/btnTertiary` (exceto 1-2 casos com BG escuro como Hero que sobrescrevem)

## Fora do escopo dessa fase

- Mudanças de conteúdo, copy ou estrutura
- Mudança em paleta — orange brand + Google colors já fixos
- Mudança em tipografia — Roboto Flex + Roboto Mono já fixos
- Refator de páginas internas (`/sobre`, `/cases`, etc) — só componentes compartilhados serão tocados; páginas internas herdam automaticamente os botões/headers consolidados
- Telemetria/analytics
- Acessibilidade além do default (já tem `aria-label`, focus states do Tailwind; não vou auditar a fundo)
