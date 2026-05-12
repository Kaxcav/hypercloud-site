'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ScrollText, ShieldCheck } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { StatCounter } from '@/components/StatCounter';
import { Reveal } from '@/components/MotionWrapper';

const heroStats = [
  { value: '10+', label: 'Anos no mercado' },
  { value: '200+', label: 'Clientes ativos' },
  { value: '8+', label: 'ATAs vigentes' },
  { value: '4', label: 'Verticais Google' }
];

export function Hero() {
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
        {/* Orange brand wash */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(124,45,18,0.92)_0%,rgba(194,65,12,0.78)_45%,rgba(249,115,22,0.55)_100%)]" />
        {/* Bottom fade for readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-20" />
      </motion.div>

      <div className="container-shell relative py-20 sm:py-24 lg:py-32 xl:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <PulseDot />
              Premier Google Cloud Partner · ATAs vigentes
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-7 text-balance text-[44px] font-extrabold leading-[1.0] tracking-[-0.045em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] sm:text-[60px] lg:text-[80px] lg:leading-[0.95]">
              Cloud, IA e produtividade{' '}
              <span className="font-serif italic font-normal tracking-[-0.02em] text-white/95">
                de verdade.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8">
              A stack Google completa — Workspace, Gemini, Cloud e AppSheet —
              vendida e implementada por quem fala com seu CIO de igual pra igual,
              com ATAs vigentes para o setor público brasileiro.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openLead()}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition hover:bg-white/95"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-100/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Falar com Especialista
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/setor-publico"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <ScrollText className="h-4 w-4" />
                Ver ATAs vigentes
              </Link>
              <Link
                href="#comparador"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold text-white/90 transition hover:text-white"
              >
                Comparar planos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/20 pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/70">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-serif text-[40px] italic leading-none tracking-tight text-white sm:text-[48px]">
                    <StatCounter value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-white" />
              <p className="text-[12px] font-medium text-white/90">
                <span className="font-bold">Credenciais oficiais</span>
                {' '}· Premier Partner · Programa de integridade formal
              </p>
            </div>
          </Reveal>
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
