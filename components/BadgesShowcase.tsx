// components/BadgesShowcase.tsx
import Image from 'next/image';
import { badges } from '@/constants/badges';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';

export function BadgesShowcase() {
  return (
    <section
      aria-label="Credenciais Google e parceiros"
      className="border-b border-border bg-surface-card"
    >
      <div className="container-shell py-12 sm:py-14 lg:py-16">
        <div className="flex items-center justify-center gap-2.5">
          {/* Google 4-color dot row — assinatura visual sutil */}
          <span className="flex items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-google-blue" />
            <span className="h-1.5 w-1.5 rounded-full bg-google-red" />
            <span className="h-1.5 w-1.5 rounded-full bg-google-yellow" />
            <span className="h-1.5 w-1.5 rounded-full bg-google-green" />
          </span>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted sm:text-[11px]">
            Premier Google Cloud Partner · Credenciais oficiais
          </p>
        </div>

        <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7">
          {badges.map((badge) => (
            <StaggerItem key={badge.file}>
              <div className="group flex h-full flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-surface-soft p-4 transition hover:-translate-y-1 hover:border-brand-500/40 hover:bg-surface-card hover:shadow-medium">
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
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-7 text-center text-[12.5px] leading-relaxed text-text-muted">
          Hypercloud é uma das poucas no Brasil com{' '}
          <span className="font-bold text-text-strong">Premier Partner</span>{' '}
          e <span className="font-bold text-text-strong">ATAs vigentes</span> para o setor público.
        </p>
      </div>
    </section>
  );
}
