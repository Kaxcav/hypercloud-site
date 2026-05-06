# Hypercloud Redesign v2 — Design Spec

**Status:** approved by user (delegated, "maestro mode")
**Date:** 2026-05-06
**Owner:** jotapsilvestre@hotmail.com
**Direction confirmed:** C — bold reinvention, dark-first

## Goals

1. Saltar de "site B2B competente" para "site B2B com craft visível" — distintividade que justifica o posicionamento Premier Partner.
2. Adicionar um sistema de tema **dark default + light opcional** controlado pelo usuário, sem ser dark invertido.
3. Substituir o `mailto:` por captura de lead qualificada (multi-step).
4. Tornar o comparador útil (filtros, recomendação, link compartilhável) e adicionar uma calculadora de ordem de grandeza de investimento.
5. Adicionar momentos de craft que reforcem a percepção técnica: command palette `⌘K`, motion lapidado, dashboard real para o cliente logado.
6. Adicionar prova social hoje ausente (cases / clientes).

## Non-goals (v1)

- **Blog / Insights** — exige CMS ou MDX pipeline. Fora do v1.
- **Real backend para o lead form** além de envio por e-mail / endpoint Next API. Não vamos integrar CRM nessa rodada.
- **i18n** — site permanece pt-BR.
- **Real auth de cliente no dashboard** — o `/dashboard` continua mockado por trás do NextAuth atual; o conteúdo é estático/demo.
- **Refazer infraestrutura de deploy.** Mantemos Railway/Nixpacks.

## Visual System

### Tipografia

- **Inter** (já no projeto via `next/font/google`) — body, labels, UI. Pesos 400, 500, 600, 700, 800.
- **Instrument Serif italic** — display de marca, usado em momentos pontuais (palavras-chave em headlines, numerais de stats). Carregado via `next/font/google`. Substitui o uso decorativo de `font-style: italic` em headlines.
- **JetBrains Mono** — atalhos de teclado e valores monoespaçados (badge `⌘K`, snippets). Carregado via `next/font/google`.

Hierarquia:

| Token | Peso · Tamanho | Uso |
|---|---|---|
| `text-display-1` | Inter 800 / 64–96px / -.045em | Hero `<h1>` |
| `text-display-2` | Inter 700 / 40–56px / -.035em | Section heads |
| `text-h2` | Inter 700 / 28–36px / -.03em | Subsection heads |
| `text-h3` | Inter 700 / 20–24px / -.02em | Card titles |
| `text-eyebrow` | Inter 700 / 11px / .18em uppercase | Eyebrow / labels |
| `text-body` | Inter 400 / 15–17px / 1.55 leading | Parágrafos |
| `text-mono` | JetBrains Mono 500 / 12–13px | Atalhos / valores |
| `text-serif-display` | Instrument Serif italic / 1em | Acento serif em headlines |

Adicionar em `tailwind.config.ts` como `fontFamily: { sans, serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'], mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'] }`.

### Paleta

Brand orange é mantido. Adicionamos níveis de surface dark e tokens semânticos resolvidos por CSS variables (para o theme switcher).

```ts
// tailwind tokens (extras vs. estado atual)
colors: {
  brand: { /* mantido — 50..700 */ },

  // dark surfaces (novo)
  ink: {
    0:  '#050507',   // body bg
    1:  '#0A0A0D',   // section bg
    2:  '#13131A',   // card bg
    3:  '#1A1A23',   // border / divider
    4:  '#2A2A35',   // hover
    5:  '#3F3F4D',   // muted text on dark
  },
  // light surfaces (refinamento — creme, não branco puro)
  paper: {
    0:  '#FAFAF7',   // body bg
    1:  '#FFFFFF',   // section / card bg
    2:  '#F5F5F0',   // muted card bg
  },
}
```

Tokens semânticos (CSS vars): `--bg`, `--bg-section`, `--bg-card`, `--border`, `--text`, `--text-muted`, `--text-strong`, `--accent`. Ambos os temas resolvem para os mesmos nomes — Tailwind consome via `bg-[var(--bg-card)]` em componentes neutros, e classes diretas (`bg-ink-1`/`bg-paper-1`) onde for explícito.

### Theme system

**Arquitetura:**

- `data-theme="dark" | "light"` no `<html>`. CSS vars definidas em `:root[data-theme="dark"]` e `:root[data-theme="light"]`.
- Dark é o default. No primeiro carregamento, se nunca foi escolhido, segue `prefers-color-scheme`.
- Toggle no header (componente `ThemeToggle`). Persistência em `localStorage` (`hypercloud-theme`).
- Para evitar flash, um inline script roda no `<head>` (no-bundle) ANTES do React hydratar e seta `data-theme` direto.
- Motion: troca tem transição de 220ms (`bg-color`, `border-color`) só nos elementos chrome, **não** em mídias.
- Respeita `prefers-reduced-motion` desabilitando a transição.

**Light mode não é dark invertido.** Light é editorial em creme `#FAFAF7`, com badges em fundo branco puro pra contraste, sombras suaves, e laranja brand. Dark é o padrão de marca, mais "tech".

### Motion

`framer-motion` (já no projeto). Princípios:

1. **Scroll reveal** — elementos primários (headlines, cards de produto, stats) animam fade + translateY 12px ao entrar viewport. 350ms ease-out, stagger 60ms entre irmãos. Trigger uma vez (`once: true`).
2. **Stat counter** — `heroStats` na home animam de 0 ao valor final em 1.4s ease-out ao entrar viewport. Para "ATA" e "10+", usa transição alternativa (fade-in só).
3. **Pulse** — badges live ("● Premier Partner", "● Online") têm `box-shadow` pulsante 2s loop infinito.
4. **Cursor magnet** — botões CTA primário (apenas desktop, apenas `pointer: fine`) atraem o conteúdo até 12px em direção ao cursor com spring suave. Reset suave ao sair.
5. **Hero parallax** — painel direito do hero (product stack + floaters) tem parallax sutil de scroll: floaters movem em `y` oposto ao scroll com fator 0.06 a 0.12.
6. **Page transition** — `framer-motion` em `app/template.tsx` (não `layout.tsx`) faz fade entre rotas. Duração 220ms.

Tudo respeita `useReducedMotion()` — quando ativado, animações viram instantâneas (no-op fade).

## New Features

### F1 · Theme switcher

- Componente `components/ThemeToggle.tsx` (client). Botão ícone (sun/moon) no header (Navbar) desktop e mobile.
- `lib/theme.ts` — utilitários `getTheme()`, `setTheme(t)`, `subscribeTheme(cb)`.
- Inline script anti-flash em `app/layout.tsx` antes de `<body>`:

  ```html
  <script dangerouslySetInnerHTML={{ __html: `
    (function(){try{
      var s=localStorage.getItem('hypercloud-theme');
      var t=s||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
      document.documentElement.setAttribute('data-theme',t);
    }catch(e){document.documentElement.setAttribute('data-theme','dark')}})();
  `}} />
  ```

- CSS vars em `app/globals.css` por `[data-theme="dark"]` / `[data-theme="light"]`.

### F2 · Multi-step lead form

- Rota `/contato` (nova) e modal acionado por todos os CTAs "Falar com especialista" via shared component `<LeadFormDialog />`.
- 3 passos:
  1. **Empresa**: nome, porte (1-10, 11-50, 51-200, 200+), setor (Privado / Setor Público).
  2. **Necessidade**: multi-select dos 4 produtos + campo livre opcional.
  3. **Contato**: nome, e-mail corporativo, telefone, observações.
- API route `app/api/lead/route.ts` — POST. Valida com Zod. Envia e-mail via Resend (free tier) ou — fallback — para `mailto:` formatado se `RESEND_API_KEY` ausente.
- Estado em React (não Server Action no v1, pra suporte a modal). Tipos em `lib/lead.ts`.
- Após envio: tela de sucesso com próximos passos ("nosso especialista responde em até 1 dia útil").
- Dependência nova: `zod`, `@hookform/resolvers`, `react-hook-form`, opcional `resend`.

### F3 · Comparador v2

- Substitui `ComparisonTable.tsx`. Novo componente `ComparisonExplorer.tsx`.
- **Filtros** (chips no topo): "E-mail/colaboração", "IA aplicada", "Infra/dados", "Automação". Multi-select. Aciona destacar linhas relevantes da matriz.
- **Plano recomendado** computado (já existe `recommendedPlanId` em `constants/features.ts`) com badge "Recomendado pela Hypercloud".
- **Compartilhar comparação**: gera URL com `?planos=workspace-business,gemini-enterprise&filtros=ia` e o componente lê `searchParams` no mount.
- Mantém `featureMatrix` e `comparisonPlanIds` como source of truth.
- Mobile: tabela vira cards verticais empilhados com toggle de ver/ocultar features.

### F4 · Calculadora ROI / investimento

- Componente `InvestmentEstimator.tsx` na home (entre comparador e Specialist CTA) e em `/solucoes/[slug]`.
- Inputs: slider de N usuários (1–500+), select de plano (lê `constants/plans.ts`).
- Output: faixa estimada de investimento mensal/anual (range, não valor exato — preserva a política "sem preços públicos"). Os ranges são heurísticos definidos em `constants/pricing-ranges.ts` (faixa por plano, calibrável).
- CTA inline: "Receber proposta exata" → abre `<LeadFormDialog />`.

### F5 · Command palette ⌘K

- Componente `CommandPalette.tsx`. Atalho global `⌘K` / `Ctrl+K` registrado em `app/template.tsx` ou em um Provider.
- Comandos:
  - Navegação (Soluções, Comparador, Setor Público, Sobre, Suporte, Portal Cliente)
  - Ações ("Falar com especialista" → abre modal, "Comparar planos" → scroll/nav)
  - Tema ("Tema dark", "Tema light", "Tema sistema")
  - Solucao deep-links (atalho pra cada `/solucoes/[slug]`)
- Implementação leve, sem `cmdk` library — input + lista filtrável + setas. Foco trapping. ESC fecha.
- Render condicional por keyboard event; sempre presente no header como `kbd` clicável.

### F6 · Cases / Clientes

- Nova seção na home: `<Cases />`, entre soluções e comparador.
- Layout: 6–8 logos de clientes (placeholder até receber), 3 cases destacados em cards (cliente, vertical, métrica entregue, link "ler caso").
- Conteúdo em `constants/cases.ts`. Cases iniciais são placeholders genéricos (segmento + métrica) marcados como `placeholder: true`. Comentário no arquivo pedindo conteúdo real.
- Página `/cases` lista todos os cases (estática, RSC).

### F7 · Hero scroll-driven + motion

- Hero da home recebe motion completo:
  - Headline e badge: scroll reveal stagger
  - Painel direito: parallax dos floaters
  - Stats: counters animados ao entrar viewport
- Aplicado também em `/solucoes/[slug]` hero, `/setor-publico` hero, `/sobre` hero.
- Implementação: `MotionWrapper` (client) que encapsula `motion.div` com `whileInView` e `viewport: { once: true }`.

### F8 · Dashboard real (área logada)

- `/dashboard` deixa de ser placeholder. Vira mockup funcional de portal do cliente:
  - Header com user info (do `session`)
  - 3 cards de status: licenças ativas (mockado), tickets abertos (mockado), próxima renovação (mockado)
  - Seção "Atalhos rápidos": link admin Google Workspace, link admin Google Cloud, abrir ticket
  - Seção "Histórico": últimos 3 tickets com status (placeholder)
- Tudo client-side com dados estáticos em `constants/dashboard-mock.ts`. Comentário deixando claro que é mockup.
- Mantém o gating via NextAuth + middleware (não muda nada na auth).

## Updated Components

| Componente | Mudança |
|---|---|
| `Navbar` | Adiciona `ThemeToggle`, botão `⌘K`, vira tokenizado por CSS vars |
| `TopBar` | Cores via vars, mantém estrutura |
| `Footer` | Tokenizado, adiciona link `/cases` |
| `TrustStrip` | Logos com tratamento dark/light (filter brightness em dark se logo for color) |
| `ProductCard` | Tokenizado, refina motion (já usa framer) |
| `ComparisonTable` | **Removido**, substituído por `ComparisonExplorer` |
| `InternalHero` | Tokenizado + motion |
| `SectionHeader` | Tokenizado |
| `SpecialistCta` | CTA agora abre `<LeadFormDialog />` (não mailto:) |
| `Breadcrumbs` | Tokenizado |
| `PortalLoginForm` | Visual refinado, mantém providers |

Componentes novos:

- `ThemeToggle.tsx` (client)
- `ThemeProvider.tsx` (client) — context simples
- `CommandPalette.tsx` (client)
- `LeadFormDialog.tsx` (client)
- `LeadFormSteps.tsx` (client)
- `ComparisonExplorer.tsx` (client) — substitui `ComparisonTable`
- `InvestmentEstimator.tsx` (client)
- `Cases.tsx` (RSC) + `CaseCard.tsx`
- `MotionWrapper.tsx` (client)
- `StatCounter.tsx` (client)

## File Structure (additions)

```
app/
  api/lead/route.ts                 # F2 endpoint
  cases/page.tsx                    # F6 listagem
  contato/page.tsx                  # F2 versão página
  dashboard/page.tsx                # F8 mockup completo
  template.tsx                      # transição entre rotas

components/
  ThemeToggle.tsx                   # F1
  ThemeProvider.tsx                 # F1
  CommandPalette.tsx                # F5
  LeadFormDialog.tsx                # F2
  LeadFormSteps.tsx                 # F2
  ComparisonExplorer.tsx            # F3 (substitui ComparisonTable)
  InvestmentEstimator.tsx           # F4
  Cases.tsx                         # F6
  CaseCard.tsx                      # F6
  MotionWrapper.tsx                 # F7
  StatCounter.tsx                   # F7

constants/
  cases.ts                          # F6 placeholder data
  dashboard-mock.ts                 # F8 mock data
  pricing-ranges.ts                 # F4 heurística

lib/
  theme.ts                          # F1
  lead.ts                           # F2 schemas + sender
  shortcuts.ts                      # F5 keyboard helper

docs/
  superpowers/specs/                # este spec
```

`app/globals.css` ganha:
- bloco `@layer base` com `[data-theme="dark"]` / `[data-theme="light"]` definindo CSS vars
- keyframes para `pulse-ring`
- helper `.text-balance` (mantido)

`tailwind.config.ts` ganha:
- `colors.ink.{0..5}`, `colors.paper.{0..2}`
- `fontFamily.serif`, `fontFamily.mono`
- `keyframes.pulseRing` + `animation.pulseRing`

## Technical Architecture

- **Rendering:** mantém RSC por padrão. Marca `'use client'` somente nos componentes que precisam (lista acima). Home permanece RSC com filhos client.
- **State:** sem Redux/Zustand. Theme via context, palette via local state, lead form via `react-hook-form`.
- **Validação:** `zod` em todas as APIs (atualmente só `/api/lead`).
- **Acessibilidade:**
  - Todos os modais têm focus trap, ESC fecha, foco volta ao trigger.
  - `kbd` shortcuts anunciados via `aria-keyshortcuts`.
  - Theme toggle anuncia troca via `aria-label` dinâmico.
  - Motion respeita `prefers-reduced-motion`.
  - Contraste mínimo 4.5:1 nos dois temas (orange brand sobre dark é o ponto sensível — ajustar `brand.400` se falhar).
- **Performance:**
  - Fonts via `next/font` (já é assim) com `display: swap`.
  - Imagens com `<Image>` (mantém `unoptimized: true`).
  - Lazy-load do `LeadFormDialog`, `CommandPalette`, `InvestmentEstimator` via `dynamic(() => ..., { ssr: false })`.
  - `framer-motion` continua only-where-used; `MotionWrapper` exporta apenas o que precisa.

## Dependencies (additions)

```json
{
  "dependencies": {
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x"
  }
}
```

`resend` é opcional — só se `RESEND_API_KEY` estiver no env. Sem ela, o endpoint de lead loga e responde 200 (modo desenvolvimento), e o front mostra a tela de sucesso normalmente.

## Risks & Mitigations

| Risco | Mitigação |
|---|---|
| Flash of unstyled theme (FOUC) no primeiro paint | Inline script no `<head>` antes do React hydratar (descrito em F1) |
| Brand orange sobre dark surface ferir contraste WCAG AA | Auditar com ferramenta na implementação; usar `brand.300` (mais claro) onde necessário em texto sobre dark |
| `framer-motion` aumentar bundle inicial | Já está no projeto; só `MotionWrapper` é client; lazy-load `cmd palette` etc. |
| Comparador novo quebrar conteúdo existente | `featureMatrix` e `comparisonPlanIds` são preservados; só a apresentação muda |
| Multi-step form sem CRM integrado virar spam | Rate-limit simples na API route (memory/IP, 5/min); honeypot field |
| `mailto:` do `SpecialistCta` quebrar se Resend não configurado | Fallback automático já descrito |

## Acceptance Criteria

A v1 está pronta quando:

- [ ] Theme switcher funciona em todas as páginas, sem flash, persistente, segue OS quando intocado.
- [ ] Todas as páginas existentes (`/`, `/sobre`, `/setor-publico`, `/suporte`, `/portal-do-cliente`, `/dashboard`, `/solucoes/[slug]`) renderizam corretamente nos dois temas.
- [ ] `npm run lint` passa, `npx tsc --noEmit` passa, `npm run build` passa.
- [ ] CTAs "Falar com especialista" abrem o modal multi-step e o submit chega ao endpoint.
- [ ] Comparador v2 renderiza, filtros funcionam, plano recomendado é destacado, URL compartilhável é parseada no mount.
- [ ] Calculadora aparece na home e em pelo menos uma página de solução; slider e select atualizam o range de investimento.
- [ ] `⌘K` / `Ctrl+K` abre command palette; navegação por teclado e mouse funciona; ESC fecha.
- [ ] Seção Cases aparece na home e a página `/cases` lista todos.
- [ ] `/dashboard` (logado) mostra o mockup de portal completo.
- [ ] Hero da home tem motion: scroll reveal, stat counter, parallax, pulse no badge.
- [ ] Site funciona com `prefers-reduced-motion: reduce` (sem animações).
- [ ] Atende AA WCAG nos dois temas (verificado em pelo menos hero, comparador, footer).

## Out of scope (parking lot)

- Blog / Insights (CMS pipeline)
- i18n
- Auth real do dashboard com integração ao backend Hypercloud
- A/B testing / feature flags
- Storybook
- Analytics avançado (manter o que houver)
