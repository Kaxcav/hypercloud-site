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
- `app/` — App Router. Public marketing pages render as RSC; only files marked `'use client'` (e.g. `Navbar`, `Hero`, `ProductCard`, `ComparisonExplorer`, `InvestmentEstimator`, `LeadFormDialog`, `CommandPalette`, `Faq`, `ThemeProvider`/`ThemeToggle`, `StatCounter`, `PortalLoginForm`, the providers in `LeadDialogProvider`/`CommandPaletteProvider`, and the `MotionWrapper` primitives) ship JS. The home `Hero` uses `framer-motion` `useScroll`/`useTransform` for parallax — keep it `'use client'`.
- `app/solucoes/[slug]/page.tsx` is statically generated via `generateStaticParams` from `constants/solutions.ts`. Adding a new solution = appending a `SolutionContent` to that file (no new route file needed).
- `app/page.tsx` orchestrates the home in this order: `TrustStrip` (Google partner badges) → `Hero` → `ProductCard` grid (the "solucoes" section) → `WhyHypercloud` → `Cases` → `ComparisonExplorer` (the "comparador" section) → `Process` → `InvestmentEstimator` → `Faq` → `SpecialistCta`. The TrustStrip sits **above** the hero on purpose — first thing a visitor sees is the Google partnership credentials. Don't move it back below or duplicate the badges in a separate "parceiros" section.
- Other top-level routes: `/cases`, `/setor-publico`, `/sobre`, `/suporte`, `/portal-do-cliente` (sign-in), `/dashboard` (gated).

### Theme system (light default, dark opt-in)
- `tailwind.config.ts` sets `darkMode: ['class', '[data-theme="dark"]']`. Theme is switched by setting the `data-theme` attribute on `<html>` (`'dark'` or `'light'`).
- `app/globals.css` defines CSS variables under `:root[data-theme='dark']`, `:root[data-theme='light']`, and an unset fallback (defaults to **light**): `--surface-{base,soft,card,muted}`, `--border-{subtle,DEFAULT,strong}`, `--text-{strong,DEFAULT,muted,subtle}`, `--shadow-{soft,medium,brand,premium,glow}`, `--hero-glow`, `--grid-pattern`. The Tailwind tokens `colors.surface.*`, `colors.text.*`, `colors.border.*`, `boxShadow.*`, and `backgroundImage.{hero-glow,grid-pattern}` resolve to these vars — don't add hex literals for chrome; use the tokens so both themes work.
- `components/ThemeProvider.tsx` + `lib/theme.ts` manage `'dark' | 'light' | 'system'` preference in `localStorage` key `hypercloud-theme` (key constant exported as `THEME_STORAGE_KEY`). `ThemeToggle.tsx` is the user-facing toggle (also reachable via the ⌘K command palette). An inline script in `app/layout.tsx` `<head>` reads localStorage and sets `data-theme` before paint to avoid FOUC; **default is light** (was dark in early drafts — don't flip back without a brand decision). Add `data-themed` to elements that should get the chrome's themed-color transition (defined in `globals.css`).

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
  - `colors.brand.*` is the Hypercloud orange/amber palette. **Do not introduce competing primary colors** — orange is the brand. Other accent tones (sky, emerald, violet, amber) only appear inside `ProductCard` and `Cases` to color-code each Google product, never as page chrome.
  - `colors.surface.*`, `colors.border.*`, `colors.text.*` and `boxShadow.*` resolve to CSS variables (see Theme system above).
  - `bg-brand-gradient` and `shadow-brand` are the canonical CTA treatments; `bg-hero-glow` is the radial glow used on heros; `bg-grid-pattern` (via the `.bg-grid` utility) is the subtle background grid.
  - Project-defined animations: `animate-pulse-ring`, `animate-shimmer`, `animate-float-y`, `animate-fade-in-up`. The marquee in `TrustStrip` uses the `.marquee-track` class + `marquee-scroll` keyframe in `globals.css` (paused on hover, disabled under `prefers-reduced-motion`).
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
- `constants/plans.ts` — plans the comparator renders. Adding a plan auto-appears in `ComparisonExplorer`.
- `constants/features.ts` — the feature matrix (`featureMatrix`, `comparisonPlanIds`, `recommendedPlanId`) the comparator reads alongside `plans.ts`. New rows in the comparator go here, not in `plans.ts`.
- `constants/solutions.ts` — content for every `/solucoes/[slug]` page. Must include `metadata` (Next metadata object), `title`, `bullets`, etc.
- `constants/cases.ts` — entries shown in `Cases.tsx` on home and `/cases`.
- `constants/pricing-ranges.ts` — capacity/scale data the `InvestmentEstimator` uses (storage per user, meet cap, governance tier, AI tier). **No public R$ values** — the estimator shows capacity, not price. The filename is legacy from when it stored prices; the exported types now are `ScalePlan` / `scalePlans`. Don't add monetary fields back here — the policy is "cotação na conversa".
- `constants/dashboard-mock.ts` — placeholder data for the gated `/dashboard` page.
- Partner badges live in `public/logo/logos partner/` and are referenced by filename string in `components/TrustStrip.tsx` (home, full-color row above the hero) and `app/setor-publico/page.tsx`.
- `app/layout.tsx` hardcodes `metadataBase: new URL('https://oi-production.up.railway.app')` — when editing OG/canonical metadata or moving to a new domain, update this too.

### Environment variables
Required by the running app (in addition to the NextAuth set above):
- `RESEND_API_KEY` — optional; when present `/api/lead` emails the lead via Resend, otherwise it logs.
- `LEAD_NOTIFY_EMAIL` — optional; recipient when Resend is enabled (default `comercial@hypercloud.com.br`).

`.env.example` only documents the auth vars; add Resend ones there if you start relying on them.

### Tone of voice (applied across copy)
The brand voice is direct, B2B/B2G adult, no emojis, no "transformação mágica" hype. Headlines emphasize verifiable differentiators (Premier Partner, certifications, ATAs). When editing copy, match this register — see `01-documento-estrategico.md` for the canonical guidelines and the rewritten "Sobre" page text.

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
