'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type ProductCardProps = {
  title: string;
  description: string;
  href: string;
  badge: string;
};

export function ProductCard({ title, description, href, badge }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-brand"
    >
      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
        {badge}
      </span>
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
      <Link href={href} className="mt-6 inline-flex text-sm font-semibold text-brand-600 transition group-hover:text-brand-700">
        Ver solução →
      </Link>
    </motion.article>
  );
}
