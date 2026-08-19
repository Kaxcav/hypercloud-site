'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Cloud,
  BrainCircuit,
  Users,
  Workflow,
  Landmark,
  type LucideIcon
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';
import { btnPrimary } from '@/components/ui/buttons';

const regularLinks = [
  { href: '/sobre#diferenciais', label: 'Diferenciais' },
  { href: '/cases', label: 'Cases' },
  { href: '/sobre', label: 'Sobre' }
];

type MegaMenuItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
};

// Só entram itens com página real em `app/(site)`. Link que não leva a lugar
// nenhum é pior que ausência.
const solucoes: MegaMenuItem[] = [
  {
    title: 'Cloud',
    href: '/solucoes/google-cloud',
    description: 'Infraestrutura, dados e modernização para empresas de alto desempenho.',
    icon: Cloud,
    iconClass: 'text-emerald-500 bg-emerald-500/10'
  },
  {
    title: 'Inteligência Artificial e Dados',
    href: '/solucoes/gemini-enterprise',
    description: 'IA generativa aplicada ao dia a dia da equipe, com Google Workspace with Gemini.',
    icon: BrainCircuit,
    iconClass: 'text-violet-500 bg-violet-500/10'
  },
  {
    title: 'Produtividade e Colaboração',
    href: '/solucoes/google-workspace',
    description: 'Comunicação centralizada e segura com Google Workspace.',
    icon: Users,
    iconClass: 'text-sky-500 bg-sky-500/10'
  },
  {
    title: 'Automação sem Código',
    href: '/solucoes/appsheet',
    description:
      'Formulários, aprovações e processos internos com AppSheet, sem desenvolvimento tradicional.',
    icon: Workflow,
    iconClass: 'text-rose-500 bg-rose-500/10'
  },
  {
    title: 'Setor Público',
    href: '/setor-publico',
    description: 'Soluções com ATAs vigentes e compliance formal para o governo.',
    icon: Landmark,
    iconClass: 'text-amber-500 bg-amber-500/10'
  }
];

function DesktopDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Esc fecha e devolve o foco ao trigger; clique fora apenas fecha.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key !== 'Escape') return;
      setIsOpen(false);
      buttonRef.current?.focus();
    }
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Navegou: o painel não pode sobreviver à troca de rota.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef} onBlur={handleBlur}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="mega-solucoes"
        className={cn(
          'group inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-semibold transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
          isOpen || pathname.startsWith('/solucoes')
            ? 'text-text-strong'
            : 'text-text-muted hover:text-text-strong'
        )}
      >
        Soluções
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen ? (
        <div
          id="mega-solucoes"
          className="absolute left-0 top-full z-50 mt-2 w-[min(600px,calc(100vw-3rem))] rounded-xl border border-border bg-surface-card p-4 shadow-premium"
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {solucoes.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex h-full items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-soft',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
                    'motion-reduce:transition-none'
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center justify-center rounded-lg p-2',
                      item.iconClass
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-text-strong">{item.title}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-text-muted">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { open: openLead } = useLeadDialog();
  const portalActive = pathname === '/portal-do-cliente';

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
                  'group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-semibold transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
                  active
                    ? 'text-text-strong'
                    : 'text-text-muted hover:text-text-strong'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left bg-brand-gradient transition-transform duration-300 motion-reduce:transition-none',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">

          <ThemeToggle />

          {/* Entrada para a área logada. Fica no cluster da direita, antes do CTA
              comercial, com o mesmo peso visual dos links de nav — é utilitário,
              não uma terceira oferta. */}
          <Link
            href="/portal-do-cliente"
            aria-current={portalActive ? 'page' : undefined}
            className={cn(
              'inline-flex items-center rounded-md px-3 py-2 text-[13px] font-semibold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
              portalActive ? 'text-text-strong' : 'text-text-muted hover:text-text-strong'
            )}
          >
            Área do Cliente
          </Link>

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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface-card text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface-soft lg:hidden">
          <div className="container-shell flex flex-col gap-1 py-4">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-md px-4 py-3 text-sm font-semibold text-text transition-colors hover:bg-surface-muted hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40">
                Soluções
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <ul className="mx-4 mt-1 flex flex-col gap-1 border-l-2 border-border pl-4">
                {solucoes.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-md py-2 text-[13px] font-medium text-text-muted transition-colors hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
                    >
                      <span
                        className={cn(
                          'inline-flex shrink-0 items-center justify-center rounded-md p-1.5',
                          item.iconClass
                        )}
                      >
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            {regularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-semibold text-text transition-colors hover:bg-surface-muted hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
              <Link
                href="/portal-do-cliente"
                onClick={() => setOpen(false)}
                aria-current={portalActive ? 'page' : undefined}
                className="rounded-md px-4 py-3 text-sm font-semibold text-text transition-colors hover:bg-surface-muted hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              >
                Área do Cliente
              </Link>
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
