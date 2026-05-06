'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/components/ui';

type Tone = 'blue' | 'green' | 'purple' | 'yellow';

type ProductCardProps = {
  title: string;
  description: string;
  href: string;
  badge: string;
  iconNode: React.ReactNode;
  tone?: Tone;
};

const toneStyles: Record<Tone, { glow: string; iconBg: string; iconColor: string; badge: string }> = {
  blue: {
    glow: 'before:bg-[radial-gradient(circle_at_30%_-10%,rgba(56,189,248,0.16),transparent_60%)]',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    badge: 'border-sky-500/30 bg-sky-500/10 text-sky-400'
  },
  green: {
    glow: 'before:bg-[radial-gradient(circle_at_30%_-10%,rgba(52,211,153,0.16),transparent_60%)]',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  },
  purple: {
    glow: 'before:bg-[radial-gradient(circle_at_30%_-10%,rgba(167,139,250,0.18),transparent_60%)]',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    badge: 'border-violet-500/30 bg-violet-500/10 text-violet-400'
  },
  yellow: {
    glow: 'before:bg-[radial-gradient(circle_at_30%_-10%,rgba(251,191,36,0.18),transparent_60%)]',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
  }
};

export function ProductCard({ title, description, href, badge, iconNode, tone = 'blue' }: ProductCardProps) {
  const styles = toneStyles[tone];
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-500/30',
        'before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition before:duration-500 before:content-[""] hover:before:opacity-100',
        styles.glow
      )}
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <span className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl', styles.iconBg, styles.iconColor)}>
          {iconNode}
        </span>
        <span className={cn('inline-flex rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em]', styles.badge)}>
          {badge}
        </span>
      </div>
      <h3 className="relative z-10 mt-6 text-xl font-bold tracking-tight text-text-strong">{title}</h3>
      <p className="relative z-10 mt-3 flex-1 text-[14px] leading-relaxed text-text-muted">{description}</p>
      <Link
        href={href}
        className="relative z-10 mt-6 inline-flex items-center gap-2 text-[13px] font-bold text-brand-400 transition hover:text-brand-300"
      >
        Saiba mais
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  );
}
