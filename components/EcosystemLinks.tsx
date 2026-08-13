import { KeyRound, LifeBuoy, type LucideIcon } from 'lucide-react';
import { cn } from '@/components/ui';
import { portals, type PortalKey } from '@/constants/portals';

// Atalhos de navegação cruzada do ecossistema Hypercloud
// (spec DESIGN-SYSTEM-HYPERCLOUD §5.2 — site).
// - `navbar`: atalhos discretos com badge (HSM/HLM), ao lado dos CTAs.
// - `topbar`: links textuais compactos, no estilo do TopBar.
// - `mobile`: linhas do menu mobile, ao lado do CTA Portal do Cliente.

const portalIcons: Record<PortalKey, LucideIcon> = {
  hsm: LifeBuoy,
  hlm: KeyRound
};

type EcosystemLinksVariant = 'navbar' | 'topbar' | 'mobile';

interface EcosystemLinksProps {
  variant: EcosystemLinksVariant;
  className?: string;
  onNavigate?: () => void;
}

export function EcosystemLinks({ variant, className, onNavigate }: EcosystemLinksProps) {
  if (variant === 'topbar') {
    return (
      <>
        {portals.map((portal) => {
          const Icon = portalIcons[portal.key];
          return (
            <a
              key={portal.key}
              href={portal.url}
              target="_blank"
              rel="noreferrer"
              title={portal.name}
              className={cn(
                'inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle transition hover:text-brand-400',
                className
              )}
            >
              <Icon className="h-3 w-3" />
              {portal.shortLabel} {portal.badge}
            </a>
          );
        })}
      </>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={cn('grid grid-cols-2 gap-3', className)}>
        {portals.map((portal) => {
          const Icon = portalIcons[portal.key];
          return (
            <a
              key={portal.key}
              href={portal.url}
              target="_blank"
              rel="noreferrer"
              title={portal.name}
              onClick={onNavigate}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-text transition hover:text-text-strong"
            >
              <Icon className="h-4 w-4" />
              {portal.shortLabel}
              <span className="rounded-full border border-border bg-surface-muted px-1.5 py-px text-[9px] font-bold uppercase tracking-[0.12em] text-text-subtle">
                {portal.badge}
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {portals.map((portal) => {
        const Icon = portalIcons[portal.key];
        return (
          <a
            key={portal.key}
            href={portal.url}
            target="_blank"
            rel="noreferrer"
            title={portal.name}
            className="group inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] font-semibold text-text-muted transition hover:bg-surface-muted hover:text-text-strong"
          >
            <Icon className="h-3.5 w-3.5" />
            {portal.shortLabel}
            <span className="rounded-full border border-border bg-surface-muted px-1.5 py-px text-[9px] font-bold uppercase tracking-[0.12em] text-text-subtle transition group-hover:border-brand-500/40 group-hover:text-brand-500">
              {portal.badge}
            </span>
          </a>
        );
      })}
    </div>
  );
}
