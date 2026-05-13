'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock, Menu, X, Search, Command } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCommandPalette } from '@/components/CommandPaletteProvider';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';
import { btnPrimary } from '@/components/buttons';

const links = [
  { href: '/#pricing', label: 'Soluções' },
  { href: '/#compare-all', label: 'Comparar' },
  { href: '/cases', label: 'Cases' },
  { href: '/setor-publico', label: 'Setor Público' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/suporte', label: 'Suporte' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname();
  const { open: openCmd } = useCommandPalette();
  const { open: openLead } = useLeadDialog();

  useEffect(() => {
    setIsMac(/Mac/i.test(navigator.platform));
    function onScroll() {
      setScrolled(window.scrollY > 6);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-themed
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-200',
        scrolled
          ? 'border-border/80 bg-surface-base/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
    >
      <TopBar />

      <div className="container-shell flex h-[72px] items-center gap-6 lg:h-20 lg:gap-8">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Hypercloud"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo/lg.hypercloud_horizontal.png"
            alt="Hypercloud"
            width={220}
            height={56}
            className="block h-9 w-auto sm:h-10 lg:h-11 dark:hidden"
            priority
          />
          <Image
            src="/logo/lg.hypercloud_vetor-branca.png"
            alt=""
            aria-hidden="true"
            width={220}
            height={56}
            className="hidden h-9 w-auto sm:h-10 lg:h-11 dark:block"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => {
            const active = link.href.startsWith('/#')
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-semibold transition',
                  active
                    ? 'text-text-strong'
                    : 'text-text-muted hover:text-text-strong'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-brand-gradient transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={openCmd}
            aria-label="Abrir paleta de comandos"
            className="group inline-flex items-center gap-2.5 rounded-md border border-border bg-surface-card px-3 py-1.5 text-[12.5px] font-medium text-text-muted transition hover:border-brand-500/40 hover:text-text"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Buscar</span>
            <span className="kbd">{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => openLead('Vamos entender seu cenário em três passos rápidos.')}
            className={btnPrimary('md')}
          >
            Falar com Especialista
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openCmd}
            aria-label="Buscar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-card text-text-muted transition hover:text-text"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-card text-text-muted transition hover:text-text"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface-soft lg:hidden">
          <div className="container-shell flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-semibold text-text transition hover:bg-surface-muted hover:text-text-strong"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
              <Link
                href="/portal-do-cliente"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-text transition hover:text-text-strong"
              >
                <Lock className="h-4 w-4" />
                Portal do Cliente
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openLead();
                }}
                className={btnPrimary('md', 'w-full')}
              >
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
