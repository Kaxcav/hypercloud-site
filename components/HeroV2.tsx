// components/HeroV2.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';

const REVEAL = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }
};

export function HeroV2() {
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
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(124,45,18,0.92)_0%,rgba(194,65,12,0.78)_45%,rgba(249,115,22,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </motion.div>

      <div className="container-shell relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={REVEAL.transition}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <PulseDot />
              Premier Google Cloud Partner · ATAs vigentes
            </span>
          </motion.div>

          <motion.h1
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={{ ...REVEAL.transition, delay: 0.06 }}
            className="mt-6 text-balance text-[40px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] sm:text-[52px] lg:text-[64px] lg:leading-[0.98]"
          >
            Google Workspace com{' '}
            <span className="font-serif italic font-normal tracking-[-0.02em] text-white/95">
              preço público.
            </span>{' '}
            Cloud, IA e produtividade — contrato direto.
          </motion.h1>

          <motion.p
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={{ ...REVEAL.transition, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8"
          >
            Veja os planos, compare e fale com um especialista. Sem funil enrolado.
          </motion.p>

          <motion.div
            initial={reduced ? false : REVEAL.initial}
            animate={reduced ? undefined : REVEAL.animate}
            transition={{ ...REVEAL.transition, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition hover:bg-white/95"
            >
              Ver planos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => openLead()}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Falar com Especialista
            </button>
          </motion.div>
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
