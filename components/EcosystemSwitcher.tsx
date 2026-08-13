'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, LifeBuoy, KeyRound, ChevronDown } from 'lucide-react';
import { cn } from '@/components/ui';
import { portalUrls } from '@/constants/portals';

export type ActiveApp = 'site' | 'hsm' | 'hlm';

interface EcosystemSwitcherProps {
  activeApp?: ActiveApp;
  className?: string;
}

export function EcosystemSwitcher({ activeApp = 'site', className }: EcosystemSwitcherProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const hsmUrl = portalUrls.hsm;
  const hlmUrl = portalUrls.hlm;

  const items = [
    {
      key: 'site' as const,
      label: 'Site',
      icon: Globe,
      url: siteUrl
    },
    {
      key: 'hsm' as const,
      label: 'Suporte · HSM',
      icon: LifeBuoy,
      url: hsmUrl
    },
    {
      key: 'hlm' as const,
      label: 'Licenças · HLM',
      icon: KeyRound,
      url: hlmUrl
    }
  ];

  const activeItem = items.find((i) => i.key === activeApp) ?? items[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-flex items-center', className)} ref={dropdownRef}>
      {/* Desktop View: Horizontal Pill Group (§5.2) */}
      <nav
        aria-label="Ecossistema Hypercloud"
        className="hidden md:inline-flex items-center gap-1 rounded-full border border-border bg-surface-card/80 p-1 backdrop-blur-xl shadow-soft"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeApp;

          if (isActive) {
            return (
              <span
                key={item.key}
                aria-current="page"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1.5 text-[13px] font-medium text-brand-600 dark:text-brand-400 cursor-default"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </span>
            );
          }

          return (
            <a
              key={item.key}
              href={item.url}
              target={item.key === 'site' ? undefined : '_blank'}
              rel={item.key === 'site' ? undefined : 'noreferrer'}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium text-text-muted transition hover:bg-surface-muted hover:text-text-strong"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Mobile View: Collapsed Dropdown (< md) */}
      <div className="md:hidden relative">
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-card/80 px-3 py-1.5 text-[13px] font-medium text-text-strong backdrop-blur-xl"
          aria-expanded={dropdownOpen}
          aria-label="Alternar portal do ecossistema"
        >
          <activeItem.icon className="h-4 w-4 text-brand-500" />
          <span>{activeItem.label}</span>
          <ChevronDown className={cn('h-3.5 w-3.5 text-text-muted transition-transform duration-200', dropdownOpen && 'rotate-180')} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-surface-card p-1.5 shadow-premium backdrop-blur-xl z-50 animate-in fade-in duration-150">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === activeApp;

              if (isActive) {
                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-2.5 rounded-lg bg-brand-500/10 px-3 py-2 text-[13px] font-medium text-brand-600 dark:text-brand-400"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              }

              return (
                <a
                  key={item.key}
                  href={item.url}
                  target={item.key === 'site' ? undefined : '_blank'}
                  rel={item.key === 'site' ? undefined : 'noreferrer'}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-text-muted hover:bg-surface-muted hover:text-text-strong transition"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
