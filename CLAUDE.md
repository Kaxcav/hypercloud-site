# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next.js dev server (default port 3000)
npm run build            # Production build
npm run start            # Serve the production build (used by deploy targets)
npm run lint             # next lint (eslint-config-next; project disables react/no-unescaped-entities)
npx tsc --noEmit         # Type-check only (tsconfig already sets noEmit)
```

The host shell is PowerShell on Windows — these npm/npx commands work unchanged, but use PowerShell syntax for anything else (`$env:VAR`, `;` chaining, etc.).

There is no test suite configured.

## Architecture

Next.js 14 App Router site (TypeScript strict, React 18) for **Hypercloud** — a Google Cloud Premier Partner selling Google Workspace, Workspace with Gemini, Google Cloud and AppSheet to private enterprise and Brazilian public sector.

### Routing & rendering
- `app/` — App Router. Public marketing pages render as RSC; only files marked `'use client'` (e.g. `Navbar`, `Hero`, `PricingGrid`, `CompareAllTable`, `LeadFormDialog`, `CommandPalette`, `Faq`, `ThemeProvider`/`ThemeToggle`, `PortalLoginForm`, the providers in `LeadDialogProvider`/`CommandPaletteProvider`, and the `MotionWrapper` primitives) ship JS. The home `Hero` uses `framer-motion` `useScroll`/`useTransform` for parallax — keep it `'use client'`.
- `app/solucoes/[slug]/page.tsx` is statically generated via `generateStaticParams` from `constants/solutions.ts`. Adding a new solution = appending a `SolutionContent` to that file (no new route file needed).
- `app/page.tsx` orquestra a home pricing-first em 7 seções: `Hero` (foto laranja BG + headline curta + 2 CTAs) → `BadgesShowcase` (6 credenciais Google em grid) → `PricingGrid` (id=`pricing`, tabs Frontline/Enterprise, default Enterprise, 8 cards Workspace com R$/usuário/mês) → `CompareAllTable` (id=`compare-all`, tabela 20×8 V/X/texto agrupada em 6 blocos, modo mobile-compacto de 3 colunas curadas) → `OtherSolutions` (3 cards: Gemini editions, Google Cloud, AppSheet — todos "cotação na conversa") → `Faq` → `SpecialistCta`. **Não existem mais** seções com hash `#solucoes` ou `#comparador` na home — links internos devem usar `#pricing` ou `#compare-all`. A âncora deep-link das tabs do PricingGrid é `#pricing-frontline` / `#pricing-enterprise`.
- `Hero` is photo-backed: it renders `/photos/hero-team.jpeg` as a full-bleed background with a `linear-gradient` orange brand wash + bottom black fade for legibility + `.bg-grid` overlay. Headline/CTAs/stats sit on top in white. Don't replace the photo treatment with the older `bg-hero-glow` styling without a brand decision.
- Other top-level routes: `/cases`, `/setor-publico`, `/sobre`, `/suporte`, `/portal-do-cliente` (sign-in), `/dashboard` (gated).

### Theme system (light default, dark opt-in)
- `tailwind.config.ts` sets `darkMode: ['class', '[data-theme="dark"]']`. Theme is switched by setting the `data-theme` attribute on `<html>` (`'dark'` or `'light'`).
- `app/globals.css` defines CSS variables under `:root[data-theme='dark']`, `:root[data-theme='light']`, and an unset fallback (defaults to **light**): `--surface-{base,soft,card,muted}`, `--border-{subtle,DEFAULT,strong}`, `--text-{strong,DEFAULT,muted,subtle}`, `--shadow-{soft,medium,brand,premium,glow}`, `--hero-glow`, `--grid-pattern`. The Tailwind tokens `colors.surface.*`, `colors.text.*`, `colors.border.*`, `boxShadow.*`, and `backgroundImage.{hero-glow,grid-pattern}` resolve to these vars — don't add hex literals for chrome; use the tokens so both themes work.
- `components/ThemeProvider.tsx` + `lib/theme.ts` manage `'dark' | 'light' | 'system'` preference in `localStorage` key `hypercloud-theme` (key constant exported as `THEME_STORAGE_KEY`). `ThemeToggle.tsx` is the user-facing toggle (also reachable via the ⌘K command palette). An inline script in `app/layout.tsx` `<head>` reads localStorage and sets `data-theme` before paint to avoid FOUC; **default is light** (was dark in early drafts — don't flip back without a brand decision). Add `data-themed` to elements that should get the chrome's themed-color transition (defined in `globals.css`).

### Animation gotchas

- `Reveal` (`components/MotionWrapper.tsx`) usa `whileInView` que **pode não disparar** para conteúdo above-the-fold em alguns browsers. O bug ficou visível em 12/05/2026 (hero invisível até clicar em Soluções) e foi revertido. **Componentes da primeira dobra** (`Hero`, parte do `BadgesShowcase`) usam `motion.div` inline com `initial`/`animate` direto em vez de `Reveal`. Não reintroduzir a prop `immediate` em `Reveal` — ela foi removida no commit `9e5b709f`.

### Auth (NextAuth)
- `lib/auth.ts` — `authOptions` exports two providers: `GoogleProvider` (env `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`) and a hardcoded `CredentialsProvider` matching `PORTAL_USER_EMAIL`/`PORTAL_USER_PASSWORD`. JWT session strategy. Sign-in page is `/portal-do-cliente`.
- `middleware.ts` — gates `/dashboard/*` only. Other routes are public.
- `app/dashboard/page.tsx` calls `getServerSession(authOptions)` and redirects to `/portal-do-cliente` when unauthenticated.
- Required env: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `PORTAL_USER_EMAIL`, `PORTAL_USER_PASSWORD`.

### Lead capture (modal + API)
- `LeadDialogProvider` wraps the tree in `app/layout.tsx`. Anywhere downstream, call `useLeadDialog().open(context?)` to open the multi-step modal in `LeadFormDialog.tsx`. Pass a short `context` string when the trigger is contextual (estimator, comparator, etc.) — it's surfaced in the dialog header.
- The form uses `react-hook-form` + `zod` (`@hookform/resolvers`); the schema and the option tuples (`companySizeOptions`, `sectorOptions`, `interestOptions`) live in `lib/lead.ts`. If you rename a value, update both the schema enum and the option tuple.
- `app/api/lead/route.ts` validates the same zod schema, applies an in-memory per-IP rate limit (5 requests / 60s), checks a `website` honeypot field, and (if `RESEND_API_KEY` is set) emails the lead via Resend to `LEAD_NOTIFY_EMAIL` (default `comercial@hypercloud.com.br`). Without the key it just logs the lead — useful in dev. The rate-limit map is per-process and resets on redeploy; if you scale beyond one instance, swap it for an external store.

### Command palette
- `CommandPaletteProvider` registers a global `Cmd/Ctrl+K` listener and lazy-loads `CommandPalette.tsx` (`ssr: false` via `next/dynamic`). The Navbar's search button calls `useCommandPalette().open()`. The ⌘K hint in the navbar uses the `.kbd` helper in `globals.css`, which depends on the `--font-jetbrains-mono` variable.

### Styling system
- Tailwind config (`tailwind.config.ts`) defines the **brand identity**:
  - `colors.brand.*` is the Hypercloud orange/amber palette. **Do not introduce competing primary colors** — orange is the brand. Other accent tones (sky, emerald, violet, amber) only appear inside `Cases` and `OtherSolutions` to color-code each Google product, never as page chrome.
  - `colors.surface.*`, `colors.border.*`, `colors.text.*` and `boxShadow.*` resolve to CSS variables (see Theme system above).
  - `bg-brand-gradient` and `shadow-brand` are the canonical CTA treatments; `bg-hero-glow` is the radial glow used on heros; `bg-grid-pattern` (via the `.bg-grid` utility) is the subtle background grid.
  - Project-defined animations: `animate-pulse-ring`, `animate-shimmer`, `animate-float-y`, `animate-fade-in-up`.
- Three fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS vars wired to Tailwind:
  - `Inter` (`--font-inter`) → `font-sans` (default body)
  - `Instrument_Serif` (`--font-instrument-serif`) → `font-serif`, used for the italic gradient accents in section headers (`text-gradient-brand`)
  - `JetBrains_Mono` (`--font-jetbrains-mono`) → `font-mono`, used by the `.kbd` helper
  Don't add a fourth webfont.
- `app/globals.css` defines `.container-shell` (max-w-7xl + responsive padding — use it on every section), `.text-balance`/`.text-pretty`, `.glass`, `.text-gradient-brand`, `.bg-grid`, and `.kbd`.
- Component composition uses `cn()` from `components/ui.tsx` (`clsx` + `tailwind-merge`).
- Card radius standard is `rounded-2xl` (16px) with `border-border` + `shadow-sm` or one of the themed shadow tokens. Don't revert to the older `rounded-[28px]` style.
- Icons are **`lucide-react`** everywhere — don't introduce a second icon set.
- Animations use **`framer-motion`**. The canonical scroll-reveal/stagger primitives live in `components/MotionWrapper.tsx` (`Reveal`, `Stagger`, `StaggerItem`); they no-op under `prefers-reduced-motion`. Use these instead of inlining `motion.div` viewport configs in each section.

### Header layout (non-obvious)
`Navbar.tsx` mounts `TopBar.tsx` internally — they are not two siblings in `layout.tsx`. The TopBar is the utility strip (phone, email, quick links) shown only on `lg:`+; the main nav row is below it. Both share the sticky/blur container.

### Static content sources
- `constants/workspace-plans.ts` — 8 SKUs Google Workspace com **preços públicos** em BRL/usuário/mês. Tipo `WorkspacePlan` com `tier` (`'frontline' | 'enterprise'`), `recommended` (exatamente 1 plano marcado — hoje `wks-ent-std`), `highlights` (4-5 bullets do card). Helper `formatPlanPrice` lida com `R$ 30` vs `R$ 156,20`. Consumido por `PricingGrid` e `CompareAllTable`.
- `constants/workspace-features.ts` — matriz 20 features × 8 planos, agrupada em 6 blocos (Geral / Armaz. / Colab. / Comun. / Segur. / Compl.). Tipo `WorkspaceFeatureRow` com `values: Record<WorkspacePlanId, CellValue>` onde `CellValue` é discriminated union (`check` | `cross` | `text`). Exports `workspacePlanOrder` (source of truth pra ordem das colunas) e `workspacePlanMobileCurated` (3 colunas que aparecem por default no mobile). Consumido por `CompareAllTable`.
- `constants/gemini-editions.ts` — 4 editions Gemini Enterprise (Business, Standard, Plus, Frontline) **sem preço**. Consumido por `OtherSolutions`.
- `constants/badges.ts` — credenciais Google e parceiros mostrados no `BadgesShowcase`. Arquivos de imagem em `public/logo/logos partner/` (placeholder atual) ou `public/logo/badges/` (definitivo, futuro).

**Política de preços:** Workspace tem preços tabelados públicos. Cloud, Gemini standalone, AppSheet e CEU (Chrome Enterprise Upgrade — tratado dentro de `/solucoes/google-workspace`) seguem "cotação na conversa" — sem preço público enquanto não houver tabela definida pela direção comercial.
- `constants/solutions.ts` — content for every `/solucoes/[slug]` page. Must include `metadata` (Next metadata object), `title`, `bullets`, etc.
- `constants/cases.ts` — entries shown in `Cases.tsx` on home and `/cases`.
- `constants/dashboard-mock.ts` — placeholder data for the gated `/dashboard` page.
- Hero photo lives at `public/photos/hero-team.jpeg`; if you swap it, keep the orange brand wash legible (the gradient in `Hero.tsx` uses three brand-orange stops + a bottom black fade).
- `app/layout.tsx` hardcodes `metadataBase: new URL('https://oi-production.up.railway.app')` — when editing OG/canonical metadata or moving to a new domain, update this too.

### Environment variables
Required by the running app (in addition to the NextAuth set above):
- `RESEND_API_KEY` — optional; when present `/api/lead` emails the lead via Resend, otherwise it logs.
- `LEAD_NOTIFY_EMAIL` — optional; recipient when Resend is enabled (default `comercial@hypercloud.com.br`).

`.env.example` only documents the auth vars; add Resend ones there if you start relying on them.

### Tone of voice (applied across copy)
The brand voice is direct, B2B/B2G adult, no emojis, no "transformação mágica" hype. Headlines emphasize verifiable differentiators (Premier Partner, certifications, ATAs). When editing copy, match this register — see `01-documento-estrategico.md` for the canonical guidelines and the rewritten "Sobre" page text.

### Specs & strategic docs
- `01-documento-estrategico.md` (repo root) — canonical brand voice, positioning, and the rewritten copy for the "Sobre" page.
- `docs/superpowers/specs/` — dated design specs for in-flight or recently completed work. Read the most recent spec before doing structural work on the home or pricing surfaces. Specs aren't generated by the agent on every change — only the user creates them, so their presence signals a deliberate architectural pivot.

### Legacy artifacts
`index.html`, `governo.html`, `sobre.html`, `style.css` at the repo root are **legacy static prototypes** from the redesign discovery phase. They are not part of the Next build, not linked from the app, and should not be edited as if they were live. Treat them as read-only references for content/intent.

### Deployment
The repo is configured for **multiple deploy targets simultaneously**:
- `nixpacks.toml` — Railway/Nixpacks build using Node 20 (`npm install` → `npm run build` → `npm run start`).
- `railway.json` — Railway with `RAILPACK` builder, restart-on-failure ×3.
- `Procfile` — generic PaaS (`web: npm run start`).
- `Staticfile` — Cloud Foundry hint (likely vestigial; the app is dynamic, not static).

`next.config.mjs` sets `images.unoptimized: true` because the deploy target doesn't run the Next image optimizer. Use `<Image>` from `next/image` as usual but expect raw delivery.

## TypeScript

- `tsconfig.json` strict mode. Path alias `@/*` resolves from repo root — always import as `@/components/...`, `@/lib/...`, `@/constants/...`, never relative.
- `noEmit: true` — `tsc` is type-check only; Next handles compilation.
