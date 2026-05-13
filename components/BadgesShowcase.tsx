// components/BadgesShowcase.tsx
import Image from 'next/image';
import { badges } from '@/constants/badges';

export function BadgesShowcase() {
  return (
    <section
      aria-label="Credenciais Google e parceiros"
      className="border-b border-border bg-surface-card"
    >
      <div className="container-shell py-12 sm:py-14 lg:py-16">
        <div className="flex items-center justify-center gap-2.5">
          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted sm:text-[11px]">
            Premier Google Cloud Partner · Credenciais oficiais
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => (
            <div
              key={badge.file}
              className="group flex flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-surface-soft p-4 transition hover:-translate-y-0.5 hover:border-brand-500/40 hover:bg-surface-card hover:shadow-medium"
            >
              <div className="flex h-16 items-center justify-center">
                <Image
                  src={badge.file}
                  alt={badge.alt}
                  width={140}
                  height={64}
                  className="max-h-[60px] w-auto object-contain"
                />
              </div>
              <p className="text-center text-[11.5px] font-bold leading-snug text-text-strong">
                {badge.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-7 text-center text-[12.5px] leading-relaxed text-text-muted">
          Hypercloud é uma das poucas no Brasil com{' '}
          <span className="font-bold text-text-strong">Premier Partner</span>{' '}
          e <span className="font-bold text-text-strong">ATAs vigentes</span> para o setor público.
        </p>
      </div>
    </section>
  );
}
