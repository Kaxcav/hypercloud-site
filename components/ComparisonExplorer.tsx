'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Cloud,
  Filter,
  Info,
  Link2,
  Minus,
  Sparkles,
  Star,
  Workflow,
  Building2,
  BrainCircuit,
  ShieldCheck
} from 'lucide-react';
import { plans } from '@/constants/plans';
import {
  comparisonPlanIds,
  featureMatrix,
  recommendedPlanId,
  type FeatureValue
} from '@/constants/features';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';

const planMap = new Map(plans.map((plan) => [plan.id, plan]));
const visiblePlans = comparisonPlanIds
  .map((id) => planMap.get(id))
  .filter((plan): plan is NonNullable<typeof plan> => Boolean(plan));

const shortNameMap: Record<string, string> = {
  'workspace-starter': 'Starter',
  'workspace-standard': 'Standard',
  'workspace-plus': 'Plus',
  'workspace-enterprise': 'Enterprise'
};

const filterCategories = [
  { id: 'collaboration', label: 'Colaboração', icon: Building2 },
  { id: 'meet', label: 'Reuniões', icon: Cloud },
  { id: 'ai', label: 'IA & Gemini', icon: BrainCircuit },
  { id: 'security', label: 'Segurança', icon: ShieldCheck },
  { id: 'support', label: 'Suporte', icon: Workflow }
] as const;

type FilterId = (typeof filterCategories)[number]['id'];

export function ComparisonExplorer() {
  const { open: openLead } = useLeadDialog();
  const [filters, setFilters] = useState<Set<FilterId>>(new Set());
  const [shareCopied, setShareCopied] = useState(false);

  // sync from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filtros = params.get('filtros');
    if (filtros) {
      const parsed = filtros.split(',').filter((f): f is FilterId =>
        filterCategories.some((c) => c.id === f)
      );
      if (parsed.length) setFilters(new Set(parsed));
    }
  }, []);

  function toggleFilter(id: FilterId) {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearFilters() {
    setFilters(new Set());
  }

  function shareView() {
    const url = new URL(window.location.href);
    if (filters.size > 0) {
      url.searchParams.set('filtros', Array.from(filters).join(','));
    } else {
      url.searchParams.delete('filtros');
    }
    url.hash = 'comparador';
    navigator.clipboard.writeText(url.toString()).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }).catch(() => {});
  }

  const visibleCategories = useMemo(() => {
    if (filters.size === 0) return featureMatrix;
    return featureMatrix.filter((cat) => filters.has(cat.id as FilterId));
  }, [filters]);

  return (
    <div id="comparador" className="overflow-hidden rounded-3xl border border-border bg-surface-card shadow-soft">
      {/* TOOLBAR */}
      <div className="flex flex-col gap-5 border-b border-border bg-surface-soft p-6 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">
              <Sparkles className="h-3.5 w-3.5" />
              Comparador interativo
            </p>
            <h3 className="mt-2 text-lg font-extrabold tracking-tight text-text-strong sm:text-xl">
              Os 4 tiers do Google Workspace, lado a lado.
            </h3>
            <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-text-muted">
              Filtre por necessidade. Marque categorias para focar só no que importa pra sua decisão.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={shareView}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-3.5 py-2 text-[12px] font-bold text-text transition hover:border-brand-500/40"
            >
              <Link2 className="h-3.5 w-3.5" />
              {shareCopied ? 'Link copiado!' : 'Compartilhar'}
            </button>
            <button
              type="button"
              onClick={() => openLead('Quero ajuda escolhendo o plano certo de Workspace.')}
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand-gradient px-4 py-2 text-[12px] font-bold text-white shadow-brand transition hover:opacity-95"
            >
              Falar com especialista
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle">
            <Filter className="h-3 w-3" /> Foco
          </span>
          {filterCategories.map((cat) => {
            const active = filters.has(cat.id);
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleFilter(cat.id)}
                aria-pressed={active}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-bold transition',
                  active
                    ? 'border-brand-500/60 bg-brand-500/10 text-brand-400'
                    : 'border-border bg-surface-card text-text-muted hover:text-text'
                )}
              >
                <Icon className="h-3 w-3" />
                {cat.label}
              </button>
            );
          })}
          {filters.size > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[11.5px] font-bold text-text-subtle underline-offset-4 hover:text-text hover:underline"
            >
              Limpar
            </button>
          ) : null}
        </div>
      </div>

      {/* HEADER */}
      <div className="grid grid-cols-[minmax(150px,1.4fr)_repeat(4,minmax(72px,1fr))] border-b border-border bg-surface-soft sm:grid-cols-[minmax(240px,1.4fr)_repeat(4,minmax(140px,1fr))]">
        <div className="px-3 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-text-subtle sm:px-6 sm:text-[11px]">
          Recurso
        </div>
        {visiblePlans.map((plan) => {
          const featured = plan.id === recommendedPlanId;
          return (
            <div
              key={plan.id}
              className={cn(
                'relative px-2 py-4 text-center sm:px-4',
                featured && 'bg-brand-500/10 ring-1 ring-inset ring-brand-500/30'
              )}
            >
              {featured ? (
                <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-brand-gradient px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white shadow-brand sm:text-[10px]">
                  <Star className="h-2.5 w-2.5 fill-white" />
                  Recomendado
                </span>
              ) : null}
              <p className="text-[11px] font-extrabold tracking-tight text-text-strong sm:text-sm">
                {shortNameMap[plan.id] ?? plan.name}
              </p>
              <p className="mt-1 hidden text-[11px] leading-snug text-text-subtle sm:block">
                {plan.compare.idealFor}
              </p>
            </div>
          );
        })}
      </div>

      {/* CATEGORIES */}
      {visibleCategories.length === 0 ? (
        <div className="px-6 py-12 text-center text-[13px] text-text-muted">
          Nenhuma categoria corresponde aos filtros aplicados.
        </div>
      ) : null}
      {visibleCategories.map((category) => (
        <div key={category.id} className="border-b border-border last:border-b-0">
          <div className="border-b border-border bg-surface-soft/60 px-3 py-3 sm:px-7">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-400 sm:text-[11px]">
              {category.label}
            </p>
            {category.description ? (
              <p className="mt-0.5 hidden text-xs text-text-muted sm:block">
                {category.description}
              </p>
            ) : null}
          </div>

          {category.features.map((feature) => (
            <div
              key={feature.id}
              className="grid grid-cols-[minmax(150px,1.4fr)_repeat(4,minmax(72px,1fr))] border-b border-border last:border-b-0 sm:grid-cols-[minmax(240px,1.4fr)_repeat(4,minmax(140px,1fr))]"
            >
              <div className="flex items-center px-3 py-3.5 text-[12px] font-medium leading-snug text-text sm:px-6 sm:py-4 sm:text-[13px]">
                <span className="inline-flex items-center gap-1.5">
                  {feature.label}
                  {feature.tooltip ? <FeatureTooltip text={feature.tooltip} /> : null}
                </span>
              </div>
              {visiblePlans.map((plan) => {
                const featured = plan.id === recommendedPlanId;
                return (
                  <div
                    key={plan.id}
                    className={cn(
                      'flex items-center justify-center px-2 py-3.5 text-center text-[12px] sm:px-4 sm:py-4 sm:text-[13px]',
                      featured && 'bg-brand-500/10 ring-1 ring-inset ring-brand-500/30'
                    )}
                  >
                    <FeatureValueCell value={feature.values[plan.id]} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      {/* FOOTER */}
      <div className="grid grid-cols-[minmax(150px,1.4fr)_repeat(4,minmax(72px,1fr))] border-t border-border bg-surface-soft/40 sm:grid-cols-[minmax(240px,1.4fr)_repeat(4,minmax(140px,1fr))]">
        <div className="px-3 py-5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle sm:px-6">
          Próximo passo
        </div>
        {visiblePlans.map((plan) => {
          const featured = plan.id === recommendedPlanId;
          return (
            <div
              key={plan.id}
              className={cn(
                'flex items-center justify-center px-2 py-5 sm:px-3',
                featured && 'bg-brand-500/10 ring-1 ring-inset ring-brand-500/30'
              )}
            >
              <button
                type="button"
                onClick={() => openLead(`Avaliar plano ${shortNameMap[plan.id] ?? plan.name}.`)}
                className={cn(
                  'inline-flex w-full items-center justify-center gap-1 rounded-md px-2 py-2 text-[10px] font-bold transition sm:gap-1.5 sm:px-3 sm:text-[12px]',
                  featured
                    ? 'bg-brand-gradient text-white shadow-brand hover:opacity-95'
                    : 'border border-border bg-surface-card text-text hover:border-brand-500/40 hover:text-text-strong'
                )}
              >
                <span className="hidden sm:inline">{plan.cta}</span>
                <span className="sm:hidden">Falar</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeatureTooltip({ text }: { text: string }) {
  return (
    <span className="group/tip relative inline-flex shrink-0 items-center" tabIndex={0}>
      <Info className="h-3.5 w-3.5 cursor-help text-text-subtle transition group-hover/tip:text-brand-400" />
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute left-1/2 top-full z-30 mt-2 w-60 -translate-x-1/2 rounded-lg bg-ink-2 px-3 py-2 text-[11px] font-normal leading-snug text-white opacity-0 shadow-medium transition duration-150 group-hover/tip:visible group-hover/tip:opacity-100 group-focus-within/tip:visible group-focus-within/tip:opacity-100 sm:w-64"
      >
        {text}
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink-2" />
      </span>
    </span>
  );
}

function FeatureValueCell({ value }: { value: FeatureValue | undefined }) {
  if (value === true) {
    return (
      <span
        aria-label="Incluído"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 sm:h-7 sm:w-7"
      >
        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
      </span>
    );
  }
  if (value === false || value === undefined) {
    return (
      <span aria-label="Não incluído" className="inline-flex">
        <Minus className="h-4 w-4 text-text-subtle/60" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="text-[12px] font-extrabold tracking-tight text-text-strong sm:text-[13px]">
      {value}
    </span>
  );
}
