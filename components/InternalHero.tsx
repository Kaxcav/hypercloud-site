'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs';
import { Reveal } from '@/components/MotionWrapper';
import { useLeadDialog } from '@/components/LeadDialogProvider';

type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

type InternalHeroProps = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  meta?: Array<{ value: string; label: string }>;
  visual: React.ReactNode;
};

export function InternalHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  meta,
  visual
}: InternalHeroProps) {
  const { open: openLead } = useLeadDialog();

  function isLeadCta(cta?: Cta) {
    return cta?.href === '#falar-com-especialista';
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-hero-glow">
      <div className="absolute inset-0 bg-grid" />
      <div className="container-shell relative grid items-start gap-12 py-14 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-20">
        <Reveal>
          <Breadcrumbs items={breadcrumbs} />

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400 backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-brand-500" />
            {eyebrow}
          </span>

          <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryCta ? (
                isLeadCta(primaryCta) ? (
                  <button
                    type="button"
                    onClick={() => openLead()}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-brand transition hover:opacity-95"
                  >
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={primaryCta.href}
                    target={primaryCta.external ? '_blank' : undefined}
                    rel={primaryCta.external ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-brand transition hover:opacity-95"
                  >
                    {primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  target={secondaryCta.external ? '_blank' : undefined}
                  rel={secondaryCta.external ? 'noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-5 py-3 text-sm font-bold text-text shadow-soft transition hover:border-brand-500/40 hover:text-text-strong"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}

          {meta && meta.length > 0 ? (
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-5 border-t border-border pt-7">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-subtle sm:text-[11px]">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 font-extrabold text-[34px] leading-none tracking-tight text-brand-400 sm:text-[40px]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.14),transparent_60%)] blur-2xl" />
            {visual}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
