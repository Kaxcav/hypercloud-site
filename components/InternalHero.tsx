import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs';

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
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-hero-glow">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

      <div className="container-shell relative grid items-start gap-12 py-14 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <Breadcrumbs items={breadcrumbs} />

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 shadow-sm backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-brand-500" />
            {eyebrow}
          </span>

          <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  target={primaryCta.external ? '_blank' : undefined}
                  rel={primaryCta.external ? 'noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  target={secondaryCta.external ? '_blank' : undefined}
                  rel={secondaryCta.external ? 'noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-600"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}

          {meta && meta.length > 0 ? (
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-5 border-t border-slate-200/70 pt-7">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[11px]">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.12),transparent_60%)] blur-2xl" />
          {visual}
        </div>
      </div>
    </section>
  );
}
