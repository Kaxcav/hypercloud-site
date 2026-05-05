'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/components/ui';

type ProductCardProps = {
  title: string;
  description: string;
  href: string;
  badge: string;
  tone?: 'blue' | 'green' | 'purple' | 'yellow';
};

const toneStyles: Record<NonNullable<ProductCardProps['tone']>, { ring: string; badge: string; link: string }> = {
  blue: {
    ring: 'group-hover:border-sky-200 group-hover:shadow-[0_18px_48px_rgba(66,133,244,0.12)]',
    badge: 'bg-sky-50 text-sky-700',
    link: 'text-sky-600 group-hover:text-sky-700'
  },
  green: {
    ring: 'group-hover:border-emerald-200 group-hover:shadow-[0_18px_48px_rgba(52,168,83,0.12)]',
    badge: 'bg-emerald-50 text-emerald-700',
    link: 'text-emerald-600 group-hover:text-emerald-700'
  },
  purple: {
    ring: 'group-hover:border-violet-200 group-hover:shadow-[0_18px_48px_rgba(160,80,255,0.12)]',
    badge: 'bg-violet-50 text-violet-700',
    link: 'text-violet-600 group-hover:text-violet-700'
  },
  yellow: {
    ring: 'group-hover:border-amber-200 group-hover:shadow-[0_18px_48px_rgba(251,188,5,0.12)]',
    badge: 'bg-amber-50 text-amber-700',
    link: 'text-amber-700 group-hover:text-amber-800'
  }
};

export function ProductCard({ title, description, href, badge, tone = 'blue' }: ProductCardProps) {
  const styles = toneStyles[tone];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={cn(
        'group rounded-[28px] border border-slate-200/60 bg-white p-8 transition hover:-translate-y-1',
        styles.ring
      )}
    >
      <span className={cn('inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]', styles.badge)}>
        {badge}
      </span>
      <h3 className="mt-5 text-2xl font-extrabold tracking-tighter text-slate-900">{title}</h3>
      <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
      <Link href={href} className={cn('mt-6 inline-flex items-center gap-2 text-sm font-semibold transition', styles.link)}>
        Saiba mais <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}
