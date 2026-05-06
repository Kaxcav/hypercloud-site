'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  Cloud,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow
} from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { StatCounter } from '@/components/StatCounter';
import { Reveal } from '@/components/MotionWrapper';

const heroStats = [
  { value: '10+', label: 'Anos no mercado' },
  { value: '200+', label: 'Clientes ativos' },
  { value: '4', label: 'Verticais Google' }
];

const stackItems = [
  {
    title: 'Google Workspace',
    desc: 'Gmail, Drive, Meet, colaboração',
    icon: Building2,
    color: 'text-sky-400 bg-sky-500/10'
  },
  {
    title: 'Workspace with Gemini',
    desc: 'IA aplicada à produtividade',
    icon: BrainCircuit,
    color: 'text-violet-400 bg-violet-500/10'
  },
  {
    title: 'Google Cloud',
    desc: 'Infra, dados, segurança',
    icon: Cloud,
    color: 'text-emerald-400 bg-emerald-500/10'
  },
  {
    title: 'AppSheet',
    desc: 'Automação no-code',
    icon: Workflow,
    color: 'text-amber-400 bg-amber-500/10'
  }
] as const;

export function Hero() {
  const { open: openLead } = useLeadDialog();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const yFloater1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const yFloater2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]);
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -20]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border bg-hero-glow"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 -top-20 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="container-shell relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:py-24 xl:py-28">
        {/* LEFT */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400 backdrop-blur">
              <PulseDot />
              Premier Google Cloud Partner
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-[18ch] text-balance text-[44px] font-extrabold leading-[1.0] tracking-[-0.045em] text-text-strong sm:text-[56px] lg:text-[72px] lg:leading-[0.96]">
              Cloud, IA e produtividade{' '}
              <span className="font-serif italic font-normal tracking-[-0.02em] text-gradient-brand">
                de verdade.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
              A stack Google completa — Workspace, Gemini, Cloud e AppSheet — vendida e
              implementada por quem fala com seu CIO de igual pra igual.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openLead()}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-brand-gradient px-6 py-3.5 text-sm font-bold text-white shadow-brand transition hover:opacity-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Falar com Especialista
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <Link
                href="#comparador"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-6 py-3.5 text-sm font-bold text-text shadow-soft transition hover:border-brand-500/40 hover:text-text-strong"
              >
                Comparar planos
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-subtle">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-serif text-[42px] italic leading-none tracking-tight text-brand-400 sm:text-[52px]">
                    <StatCounter value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* RIGHT — visual composition */}
        <Reveal delay={0.18} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.14),transparent_60%)] blur-2xl" />

          <motion.div
            style={{ y: yPanel }}
            className="relative rounded-2xl border border-border bg-surface-card p-6 shadow-premium sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
                  Stack principal
                </p>
                <h2 className="mt-2 text-xl font-extrabold tracking-tight text-text-strong sm:text-2xl">
                  Ecossistema Google
                </h2>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-400">
                <span className="h-1 w-1 rounded-full bg-brand-500" />
                Hypercloud first
              </span>
            </div>

            <ul className="mt-6 space-y-2.5">
              {stackItems.map((item, idx) => (
                <motion.li
                  key={item.title}
                  initial={reduced ? false : { opacity: 0, x: 10 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: 0.25 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group/row flex items-center gap-3 rounded-xl border border-border bg-surface-soft px-3.5 py-3 transition hover:border-brand-500/30 hover:bg-surface-muted"
                >
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-text-strong">{item.title}</p>
                    <p className="mt-0.5 text-[12px] leading-snug text-text-muted">{item.desc}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-text-subtle opacity-0 transition group-hover/row:translate-x-0 group-hover/row:opacity-100" />
                </motion.li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface-card px-3.5 py-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-400" />
              <p className="text-[12px] leading-snug text-text-muted">
                <span className="font-bold text-text-strong">Credenciais oficiais</span>{' '}
                · jornada comercial consultiva.
              </p>
            </div>
          </motion.div>

          {/* floater 1 — métrica */}
          <motion.div
            style={{ y: yFloater1 }}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -right-4 -top-6 hidden rounded-xl border border-border bg-surface-card p-3 shadow-medium sm:block lg:-right-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-white">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-subtle">
                  Conversão B2B
                </p>
                <p className="text-sm font-extrabold text-text-strong">+200 clientes</p>
              </div>
            </div>
          </motion.div>

          {/* floater 2 — badge */}
          <motion.div
            style={{ y: yFloater2 }}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -bottom-4 -left-4 hidden items-center gap-2.5 rounded-xl border border-border bg-surface-card px-3.5 py-2.5 shadow-medium sm:flex lg:-left-6 lg:-bottom-6"
          >
            <PulseDot />
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text">
              Premier Google Cloud Partner
            </p>
          </motion.div>

          {/* floater 3 — sparkle */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block"
          >
            <Sparkles className="h-5 w-5 animate-float-y text-brand-400/60" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
    </span>
  );
}
