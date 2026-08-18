'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ChevronDown, Cloud, BrainCircuit, Users, Landmark, Lock, type LucideIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCommandPalette } from '@/components/CommandPaletteProvider';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';
import { btnPrimary } from '@/components/ui/buttons';

type MegaMenuItem = {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
};

// Só entram itens com página real em `app/`. "Segurança" e "Hyper360" saíram do
// menu até existir conteúdo — link que não leva a lugar nenhum é pior que ausência.
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
    title: 'Setor Público',
    href: '/setor-publico',
    description: 'Soluções com ATAs vigentes e compliance formal para o governo.',
    icon: Landmark,
    iconClass: 'text-amber-500 bg-amber-500/10'
  }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);
  // Dropdown de desktop e acordeão do drawer são estados separados de propósito:
  // o listener de clique-fora abaixo só governa o de desktop.
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const pathname = usePathname();
  const { open: openCmd } = useCommandPalette();
  const { open: openLead } = useLeadDialog();

  const solucoesRef = useRef<HTMLDivElement>(null);
  const solucoesBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMac(typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/i.test(navigator.userAgent));
    function onScroll() {
      setScrolled(window.scrollY > 6);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc fecha e devolve o foco ao trigger; clique fora fecha o dropdown de desktop.
  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (activeDropdown) {
        setActiveDropdown(null);
        solucoesBtnRef.current?.focus();
      }
      setOpen(false);
    }
    function handleClickOutside(e: MouseEvent) {
      if (solucoesRef.current && !solucoesRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Fecha tudo ao trocar de rota
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileSection(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const simpleLinks = [
    { href: '/#por-que', label: 'Por que Hypercloud?' },
    { href: '/cases', label: 'Cases' },
    { href: '/sobre', label: 'Sobre' }
  ];

  return (
    <header
      data-themed
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300',
        scrolled
          ? 'border-border bg-surface-base/85 shadow-[0_1px_0_0_var(--border)]'
          : 'border-transparent bg-transparent'
      )}
    >
      <div className="container-shell flex h-[72px] items-center justify-between lg:h-20 lg:gap-6">
        <div className="flex items-center gap-6 xl:gap-8">
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

          {/* Navegação desktop — a partir de lg, mesmo breakpoint em que o
              hambúrguer desaparece. Não existe faixa sem navegação. */}
          <nav className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              ref={solucoesRef}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveDropdown(null);
              }}
            >
              <button
                ref={solucoesBtnRef}
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'solucoes' ? null : 'solucoes')}
                aria-expanded={activeDropdown === 'solucoes'}
                aria-haspopup="true"
                aria-controls="mega-solucoes"
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-semibold transition',
                  activeDropdown === 'solucoes' || pathname.startsWith('/solucoes')
                    ? 'text-text-strong'
                    : 'text-text-muted hover:text-text-strong'
                )}
              >
                Soluções
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform duration-200',
                    activeDropdown === 'solucoes' && 'rotate-180'
                  )}
                />
              </button>

              {activeDropdown === 'solucoes' && (
                <div
                  id="mega-solucoes"
                  className="absolute left-0 top-full mt-2 w-[min(600px,calc(100vw-3rem))] rounded-xl border border-border bg-surface-card p-4 shadow-premium"
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {solucoes.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 rounded-lg p-3 transition hover:bg-surface-soft"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className={cn('inline-flex shrink-0 items-center justify-center rounded-lg p-2', item.iconClass)}>
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-[13px] font-bold text-text-strong">{item.title}</p>
                          <p className="mt-0.5 text-[12px] leading-relaxed text-text-muted">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'inline-flex items-center rounded-md px-3 py-2 text-[13px] font-semibold transition',
                  isActive(link.href) ? 'text-text-strong' : 'text-text-muted hover:text-text-strong'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={openCmd}
            aria-label="Abrir paleta de comandos"
            className="group inline-flex items-center gap-2.5 rounded-md border border-border bg-surface-card px-3 py-1.5 text-[12.5px] font-medium text-text-muted transition hover:border-brand-500/40 hover:text-text"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Buscar</span>
            <span className="kbd hidden xl:inline">{isMac ? '⌘' : 'Ctrl'} K</span>
          </button>

          <ThemeToggle />

          {/* Acesso do cliente: vivia na TopBar, que foi removida. Peso
              secundário — o CTA continua sendo o único botão preenchido. */}
          <Link
            href="/portal-do-cliente"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-3 py-2 text-[12.5px] font-semibold text-text-muted transition hover:border-brand-500/40 hover:text-text-strong"
          >
            <Lock className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Portal do Cliente</span>
            <span className="xl:hidden">Entrar</span>
          </Link>

          <button
            type="button"
            onClick={() => openLead('Vamos entender seu cenário em três passos rápidos.')}
            className={btnPrimary('md')}
          >
            Falar com Especialista
          </button>
        </div>

        {/* Gatilhos mobile */}
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

      {/* Drawer mobile */}
      {open ? (
        <div className="border-t border-border bg-surface-soft lg:hidden">
          <div className="container-shell flex flex-col gap-1 py-4">
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileSection(mobileSection === 'solucoes' ? null : 'solucoes')}
                aria-expanded={mobileSection === 'solucoes'}
                className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-semibold text-text transition hover:bg-surface-muted hover:text-text-strong"
              >
                Soluções
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    mobileSection === 'solucoes' && 'rotate-180'
                  )}
                />
              </button>
              {mobileSection === 'solucoes' && (
                <div className="mx-4 mt-1 flex flex-col gap-1 border-l-2 border-border pl-4">
                  {solucoes.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="py-2 text-[13px] font-medium text-text-muted transition hover:text-text-strong"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {simpleLinks.map((link) => (
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
