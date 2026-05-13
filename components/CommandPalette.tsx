'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  Building2,
  BrainCircuit,
  Calculator,
  Cloud,
  Headphones,
  HelpCircle,
  Home,
  Landmark,
  Layers,
  Lightbulb,
  LockKeyhole,
  MessageSquare,
  Moon,
  Search,
  Sparkles,
  Sun,
  Workflow,
  type LucideIcon
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';

type Command = {
  id: string;
  label: string;
  hint?: string;
  group: 'Navegar' | 'Soluções' | 'Ações' | 'Tema';
  keywords?: string;
  icon: LucideIcon;
  run: () => void;
};

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { setPreference } = useTheme();
  const { open: openLead } = useLeadDialog();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const commands = useMemo<Command[]>(() => {
    function go(href: string) {
      return () => {
        onClose();
        router.push(href);
      };
    }
    return [
      { id: 'home', label: 'Início', group: 'Navegar', icon: Home, keywords: 'home', run: go('/') },
      { id: 'comparador', label: 'Comparar planos', group: 'Navegar', icon: Layers, run: go('/#compare-all') },
      { id: 'calculadora', label: 'Estimador de escala', group: 'Navegar', icon: Calculator, run: go('/#calculadora') },
      { id: 'cases', label: 'Cases e clientes', group: 'Navegar', icon: Sparkles, run: go('/cases') },
      { id: 'setor-publico', label: 'Setor Público · ATAs', group: 'Navegar', icon: Landmark, run: go('/setor-publico') },
      { id: 'sobre', label: 'Sobre a Hypercloud', group: 'Navegar', icon: Lightbulb, run: go('/sobre') },
      { id: 'suporte', label: 'Suporte e chamados', group: 'Navegar', icon: Headphones, run: go('/suporte') },
      { id: 'portal', label: 'Portal do Cliente', group: 'Navegar', icon: LockKeyhole, run: go('/portal-do-cliente') },
      { id: 'workspace', label: 'Google Workspace', group: 'Soluções', icon: Building2, run: go('/solucoes/google-workspace') },
      { id: 'gemini', label: 'Workspace with Gemini', group: 'Soluções', icon: BrainCircuit, run: go('/solucoes/gemini-enterprise') },
      { id: 'cloud', label: 'Google Cloud', group: 'Soluções', icon: Cloud, run: go('/solucoes/google-cloud') },
      { id: 'appsheet', label: 'AppSheet', group: 'Soluções', icon: Workflow, run: go('/solucoes/appsheet') },
      { id: 'lead', label: 'Falar com especialista', group: 'Ações', icon: MessageSquare, run: () => { onClose(); openLead(); } },
      { id: 'faq', label: 'Abrir chamado', group: 'Ações', icon: HelpCircle, run: go('/suporte') },
      { id: 'theme-dark', label: 'Tema escuro', group: 'Tema', icon: Moon, run: () => { setPreference('dark'); onClose(); } },
      { id: 'theme-light', label: 'Tema claro', group: 'Tema', icon: Sun, run: () => { setPreference('light'); onClose(); } },
      { id: 'theme-system', label: 'Tema do sistema', group: 'Tema', icon: Sparkles, run: () => { setPreference('system'); onClose(); } }
    ];
  }, [router, setPreference, openLead, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.keywords ?? ''} ${c.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const grouped = useMemo(() => {
    const groups = new Map<Command['group'], Command[]>();
    for (const command of filtered) {
      const list = groups.get(command.group) ?? [];
      list.push(command);
      groups.set(command.group, list);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    queueMicrotask(() => inputRef.current?.focus());
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex((idx) => Math.min(idx, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  if (!open) return null;

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[activeIndex]?.run();
    }
  }

  let runningIndex = 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Paleta de comandos"
      className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[8vh] sm:pt-[12vh]"
      onKeyDown={onKey}
    >
      <div className="absolute inset-0 bg-ink-0/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface-card shadow-premium">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-text-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar comandos, soluções, ações…"
            aria-controls={listId}
            className="flex-1 bg-transparent text-[14px] font-medium text-text-strong outline-none placeholder:text-text-subtle"
          />
          <span className="kbd">ESC</span>
        </div>
        <ul id={listId} role="listbox" className="max-h-[60vh] overflow-y-auto py-1.5">
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center text-[13px] text-text-subtle">
              Nada encontrado para “{query}”.
            </li>
          ) : (
            grouped.map(([group, items]) => (
              <li key={group}>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-text-subtle">
                  {group}
                </p>
                <ul>
                  {items.map((cmd) => {
                    const i = runningIndex++;
                    const Icon = cmd.icon;
                    const isActive = i === activeIndex;
                    return (
                      <li key={cmd.id}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => cmd.run()}
                          aria-selected={isActive}
                          role="option"
                          className={cn(
                            'flex w-full items-center gap-3 px-4 py-2.5 text-left transition',
                            isActive ? 'bg-brand-500/10 text-text-strong' : 'text-text hover:bg-surface-muted'
                          )}
                        >
                          <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-brand-400' : 'text-text-muted')} />
                          <span className="flex-1 text-[13.5px] font-medium">{cmd.label}</span>
                          {isActive ? (
                            <span className="kbd">↵</span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>
        <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-soft px-4 py-2 text-[11px] text-text-subtle">
          <span className="inline-flex items-center gap-1.5">
            <span className="kbd">↑</span><span className="kbd">↓</span> navegar
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="kbd">↵</span> abrir
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="kbd">⌘</span><span className="kbd">K</span>
          </span>
        </div>
      </div>
    </div>
  );
}
