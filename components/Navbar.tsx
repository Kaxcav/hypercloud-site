'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { TopBar } from '@/components/TopBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { EcosystemLinks } from '@/components/EcosystemLinks';
import { cn } from '@/components/ui';
import { btnPrimary } from '@/components/ui/buttons';

const regularLinks = [
  { href: '/sobre#diferenciais', label: 'Diferenciais' },
  { href: '/cases', label: 'Cases' },
  { href: '/sobre', label: 'Sobre' }
];

const dropdownGroups = [
  {
    title: 'Cloud & Infraestrutura',
    description: 'Migração sem interrupção e otimização de custos (FinOps)',
    links: [{ label: 'Google Cloud', href: '/solucoes/google-cloud' }]
  },
  {
    title: 'IA & Automação',
    description: 'Automação de processos operacionais e agentes inteligentes',
    links: [
      { label: 'Gemini Enterprise', href: '/solucoes/gemini-enterprise' },
      { label: 'AppSheet', href: '/solucoes/appsheet' }
    ]
  },
  {
    title: 'Workspace & Governança',
    description: 'Proteção de dados corporativos e adequação à LGPD',
    links: [{ label: 'Google Workspace', href: '/solucoes/google-workspace' }]
  }
];

function DesktopDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        const btn = containerRef.current?.querySelector('button');
        btn?.focus();
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef} onBlur={handleBlur} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isOpen}
        className={cn(
          'group inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-semibold transition',
          isOpen ? 'text-text-strong' : 'text-text-muted hover:text-text-strong'
        )}
      >
        Soluções
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="w-[520px] rounded-xl border border-border bg-surface-base p-3 shadow-premium grid gap-1">
            {dropdownGroups.map(group => (
              <div key={group.title} className="flex flex-col gap-1 rounded-lg p-3 hover:bg-surface-soft transition">
                <h3 className="text-[14px] font-bold text-text-strong">{group.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed mb-2">{group.description}</p>
                <div className="flex gap-2">
                  {group.links.map(link => (
                    <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="inline-flex items-center rounded bg-surface-card border border-border px-2.5 py-1 text-xs font-semibold text-text hover:border-brand-500/30 hover:text-brand-500 transition">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { open: openLead } = useLeadDialog();

  useEffect(() => {
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
          <DesktopDropdown />
          {regularLinks.map((link) => {
            const active = link.href.startsWith('/#') || link.href.includes('#')
              ? pathname === '/' || pathname === link.href.split('#')[0]
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
          <EcosystemLinks variant="navbar" className="hidden xl:flex" />

          <ThemeToggle />

          <button
            type="button"
            onClick={() => openLead('Vamos entender seu cenário em três passos rápidos.')}
            className={btnPrimary('md')}
          >
            Agendar Diagnóstico de ROI
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
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
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm font-semibold text-text transition hover:bg-surface-muted hover:text-text-strong">
                Soluções
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="flex flex-col gap-1 pb-2 pl-4 pr-4 pt-1">
                {dropdownGroups.map(group => (
                  <div key={group.title} className="mt-2 flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle">{group.title}</span>
                    {group.links.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md py-1.5 text-sm text-text-muted hover:text-text-strong"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </details>

            {regularLinks.map((link) => (
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
              <EcosystemLinks variant="mobile" onNavigate={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openLead();
                }}
                className={btnPrimary('md', 'w-full')}
              >
                Agendar Diagnóstico de ROI
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
