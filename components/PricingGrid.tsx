// components/PricingGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import {
  workspacePlans,
  formatPlanPrice,
  type WorkspacePlan,
  type WorkspaceTier
} from '@/constants/workspace-plans';
import { cn } from '@/components/ui';

const tabs: { id: WorkspaceTier; label: string; hint: string }[] = [
  { id: 'frontline', label: 'Frontline', hint: 'Operação · suporte · campo' },
  { id: 'enterprise', label: 'Enterprise', hint: 'Empresas e instituições' }
];

export function PricingGrid() {
  const [activeTier, setActiveTier] = useState<WorkspaceTier>('enterprise');
  const { open: openLead } = useLeadDialog();

  // Deep-link via hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash === '#pricing-frontline') setActiveTier('frontline');
    if (hash === '#pricing-enterprise') setActiveTier('enterprise');
  }, []);

  const visiblePlans = workspacePlans.filter((p) => p.tier === activeTier);

  function handleTabChange(tier: WorkspaceTier) {
    setActiveTier(tier);
    if (typeof window !== 'undefined') {
      const newHash = tier === 'frontline' ? 'pricing-frontline' : 'pricing-enterprise';
      window.history.replaceState(null, '', `#${newHash}`);
    }
  }

  return (
    <div className="container-shell py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-600">
          Preços Google Workspace
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-5xl">
          Tabela aberta.{' '}
          <span className="font-extrabold text-gradient-brand">
            Cotação na conversa.
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-muted">
          Valores de tabela em BRL por usuário/mês. Sujeitos a condições comerciais
          e ATAs vigentes.
        </p>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Família de planos"
        className="mx-auto mt-10 inline-flex w-full max-w-sm rounded-full border border-border bg-surface-card p-1 shadow-soft sm:flex sm:justify-center"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTier;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex-1 rounded-full px-4 py-2 text-[13px] font-bold transition',
                active
                  ? 'bg-brand-gradient text-white shadow-brand'
                  : 'text-text-muted hover:text-text-strong'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-center text-[12px] text-text-subtle">
        {tabs.find((t) => t.id === activeTier)?.hint}
      </p>

      {/* Cards grid */}
      <div
        id={activeTier === 'frontline' ? 'pricing-frontline' : 'pricing-enterprise'}
        className={cn(
          'mt-10 grid gap-5',
          activeTier === 'frontline'
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        )}
      >
        {visiblePlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} onContact={openLead} />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-[12px] leading-relaxed text-text-subtle">
        Valores de tabela. Sujeitos a condições comerciais e ATAs vigentes.{' '}
        <a href="#compare-all" className="underline underline-offset-2 hover:text-text-muted">
          Ver tabela completa de recursos
        </a>
        .
      </p>
    </div>
  );
}

function PricingCard({
  plan,
  onContact
}: {
  plan: WorkspacePlan;
  onContact: (context?: string) => void;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-surface-card p-6 transition',
        plan.recommended
          ? 'border-brand-500/60 shadow-[0_24px_60px_-30px_rgba(249,115,22,0.5)] ring-1 ring-brand-500/30'
          : 'border-border shadow-soft hover:-translate-y-0.5 hover:shadow-medium'
      )}
    >
      {plan.recommended ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white shadow-brand">
          Recomendado
        </span>
      ) : null}

      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
        {plan.tier === 'frontline' ? 'Frontline' : 'Enterprise'}
      </p>
      <h3 className="mt-1.5 text-xl font-extrabold text-text-strong">
        {plan.shortName}
      </h3>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-[40px] font-extrabold leading-none tracking-tight text-text-strong">
          {formatPlanPrice(plan.pricePerUser)}
        </span>
        <span className="text-[12.5px] font-medium text-text-muted">/usuário/mês</span>
      </div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-text-muted">
        {plan.audience}
      </p>

      <ul className="mt-6 space-y-2">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span className="text-[13px] leading-snug text-text">{h}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onContact(`Pricing — ${plan.name}`)}
        className={cn(
          'mt-7 inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-[13px] font-bold transition',
          plan.recommended
            ? 'bg-brand-gradient text-white shadow-brand hover:opacity-95'
            : 'border border-border bg-surface-soft text-text-strong hover:border-brand-500/40'
        )}
      >
        {plan.cta}
      </button>

      <p className="mt-2 text-center text-[11px] text-text-subtle">
        Cotação para 50+ usuários
      </p>
    </div>
  );
}
