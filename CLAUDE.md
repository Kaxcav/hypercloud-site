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
- `app/` — App Router. Public marketing pages render as RSC; only files marked `'use client'` (e.g. `Navbar`, `Hero`, `PlansGrid`, `CompareAllTable`, `LeadFormDialog`, `CommandPalette`, `Faq`, `ThemeProvider`/`ThemeToggle`, `PortalLoginForm`, `FloatingWhatsapp`, `MobileCtaBar`, the providers in `LeadDialogProvider`/`CommandPaletteProvider`, and the `MotionWrapper` primitives) ship JS.
- `app/solucoes/[slug]/page.tsx` is statically generated via `generateStaticParams` from `constants/solutions.ts`.
- `app/page.tsx` orquestra a home em seções: `Hero` → `BadgesShowcase` → `PlansGrid` (id=`planos`) → `CompareAllTable` (id=`compare-all`) → `OtherSolutions` → `Faq` → `SpecialistCta`. Links internos usam âncoras `#planos` ou `#compare-all`.
- Other top-level routes: `/cases`, `/setor-publico`, `/sobre`, `/suporte`, `/diagnostico`, `/calculadora`, `/comparativo/google-workspace-vs-microsoft-365`, `/politica-de-privacidade`, `/termos-de-uso`, `/portal-do-cliente` (sign-in), `/dashboard` (gated).

### Theme system (light default, dark opt-in)
- `tailwind.config.ts` sets `darkMode: ['class', '[data-theme="dark"]']`. Theme is switched by setting the `data-theme` attribute on `<html>` (`'dark'` or `'light'`).
- `app/globals.css` defines CSS variables under `:root[data-theme='dark']`, `:root[data-theme='light']`, and an unset fallback (defaults to **light**).

### Lead capture & Attribution
- `LeadDialogProvider` wraps the tree in `app/layout.tsx`. Anywhere downstream, call `useLeadDialog().open(context?)` to open the multi-step modal in `LeadFormDialog.tsx`.
- Schema and defaults live in `lib/lead.ts`. Includes LGPD consent, honeypot handling, and automatic UTM/referrer tracking via `sessionStorage`.
- `app/api/lead/route.ts` validates the schema, applies rate limiting, responds with 200 for honeypots, logs leads into a structured JSON fallback, and routes email notifications dynamically: sector `publico` goes to `licitacoes@hypercloud.com.br`, other sectors go to `comercial@hypercloud.com.br`.

### Static content & Single Source of Truth
- `constants/company.ts` — **Fonte única da verdade** para dados institucionais da empresa (Razão Social, CNPJ 20.007.959/0001-66, Telefones, WhatsApp, E-mails por departamento, Endereço e Redes Sociais).
- `constants/workspace-plans.ts` — 8 edições do Google Workspace com selos de adequação comercial (**sem preços públicos**).
- `constants/workspace-features.ts` — Matriz completa de comparação de recursos.
- `constants/badges.ts` — 7 credenciais e especializações oficiais da Google.
- `constants/cases.ts` — Credenciais auditáveis e track record institucional.

**Política de preços:** O site **não publica preços em nenhuma superfície**. Todas as cotações são personalizadas por volume, prazo contratual e veículo de aquisição (ATA, pregão, contratação direta), com SLA de envio em até 1 dia útil.

### Fonts
Carregadas em `app/layout.tsx` via `next/font/google`:
- **Roboto Flex** (`--font-google-sans`) → `font-sans` (interface e textos)
- **Roboto Mono** (`--font-google-mono`) → `font-mono` (código, Kbd)

### Environment variables
- `NEXT_PUBLIC_SITE_URL` — Canonical domain (default `https://www.hypercloud.com.br`).
- `RESEND_API_KEY` — Resend API Key para envio de e-mails.
- `LEAD_NOTIFY_EMAIL` — E-mail destinatário dos leads (opcional, fallback inteligente por setor).
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` — IDs de analytics e retargeting.

See `.env.example` for full list.
