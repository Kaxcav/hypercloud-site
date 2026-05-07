# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next.js dev server (default port 3000)
npm run build            # Production build
npm run start            # Serve the production build (used by deploy targets)
npm run lint             # next lint (ESLint via eslint-config-next)
npx tsc --noEmit         # Type-check only (no emit; tsconfig already sets noEmit)
```

The host shell is PowerShell on Windows — these npm/npx commands work unchanged, but use PowerShell syntax for anything else (`$env:VAR`, `;` chaining, etc.).

There is no test suite configured.

## Architecture

Next.js 14 App Router site (TypeScript strict, React 18) for **Hypercloud** — a Google Cloud Premier Partner selling Google Workspace, Workspace with Gemini, Google Cloud and AppSheet to private enterprise and Brazilian public sector.

### Routing & rendering
- `app/` — App Router. Public marketing pages render as RSC; only files marked `'use client'` (e.g. `Navbar`, `ProductCard`, `ComparisonTable`, `PortalLoginForm`) ship JS.
- `app/solucoes/[slug]/page.tsx` is statically generated via `generateStaticParams` from `constants/solutions.ts`. Adding a new solution = appending a `SolutionContent` to that file (no new route file needed).
- `app/page.tsx` orchestrates the home: `TrustStrip` (Google partner badges, promoted above the fold) → hero → solucoes (`ProductCard`) → comparador (`ComparisonTable`) → `SpecialistCta`. The TrustStrip sits **above** the hero on purpose — first thing a visitor sees is the Google partnership credentials. Don't move it back below or duplicate the badges in a separate "parceiros" section.

### Auth (NextAuth)
- `lib/auth.ts` — `authOptions` exports two providers: `GoogleProvider` (env `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`) and a hardcoded `CredentialsProvider` matching `PORTAL_USER_EMAIL`/`PORTAL_USER_PASSWORD`. JWT session strategy. Sign-in page is `/portal-do-cliente`.
- `middleware.ts` — gates `/dashboard/*` only. Other routes are public.
- `app/dashboard/page.tsx` calls `getServerSession(authOptions)` and redirects to `/portal-do-cliente` when unauthenticated.
- Required env: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `PORTAL_USER_EMAIL`, `PORTAL_USER_PASSWORD`.

### Styling system
- Tailwind config (`tailwind.config.ts`) defines the **brand identity**:
  - `colors.brand.*` is the Hypercloud orange/amber palette. **Do not introduce competing primary colors** — orange is the brand. Other accent tones (sky, emerald, violet, amber) only appear inside `ProductCard` to color-code each Google product, never as page chrome.
  - `colors.surface.*` and `colors.ink.*` are the neutral system; `bg-brand-gradient` and `shadow-brand` are the canonical CTA treatments; `bg-hero-glow` is the radial glow used on heros.
- Primary font is **Inter** loaded via `next/font/google` in `app/layout.tsx` and exposed as `--font-inter`, wired to Tailwind's default `font-sans`. Don't add other webfonts.
- `app/globals.css` defines `.container-shell` (max-w-7xl + responsive padding — use it on every section), `.text-balance`, and `.marquee-track` keyframe used by `TrustStrip`.
- Component composition uses `cn()` from `components/ui.tsx` (`clsx` + `tailwind-merge`).
- Card radius standard is `rounded-2xl` (16px) with `border-slate-200` + `shadow-sm`. Don't revert to the older `rounded-[28px]` style.
- Icons are **`lucide-react`** everywhere — don't introduce a second icon set. Animations use **`framer-motion`** but it's currently only in `ProductCard.tsx`; keep motion subtle and matching that file's idiom rather than pulling in CSS-only animations or other libs.

### Header layout (non-obvious)
`Navbar.tsx` mounts `TopBar.tsx` internally — they are not two siblings in `layout.tsx`. The TopBar is the utility strip (phone, email, quick links) shown only on `lg:`+; the main nav row is below it. Both share the sticky/blur container.

### Static content sources
- `constants/plans.ts` — plans the comparator renders. Adding a plan auto-appears in `ComparisonTable`.
- `constants/features.ts` — the feature matrix (`featureMatrix`, `comparisonPlanIds`, `recommendedPlanId`) the comparator reads alongside `plans.ts`. New rows in the comparator go here, not in `plans.ts`.
- `constants/solutions.ts` — content for every `/solucoes/[slug]` page. Must include `metadata` (Next metadata object), `title`, `bullets`, etc.
- Partner badges live in `public/logo/logos partner/` and are referenced by filename string in `components/TrustStrip.tsx` (home, full-color row above the hero) and `app/setor-publico/page.tsx`.
- `app/layout.tsx` hardcodes `metadataBase: new URL('https://oi-production.up.railway.app')` — when editing OG/canonical metadata or moving to a new domain, update this too.

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
