'use client';

import { useMemo, useState } from 'react';
import { categories, plans } from '@/constants/plans';

export function ComparisonTable() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>(['workspace-starter', 'workspace-standard']);
  const [highlightDiffs, setHighlightDiffs] = useState(false);

  const visiblePlans = useMemo(() => {
    if (activeCategory === 'all') return plans;
    return plans.filter((plan) => plan.category === activeCategory);
  }, [activeCategory]);

  const selectedPlans = useMemo(() => plans.filter((plan) => selectedIds.includes(plan.id)), [selectedIds]);

  const rows = useMemo(() => {
    const baseRows = [
      { label: 'Modelo', values: selectedPlans.map((plan) => plan.compare.model) },
      { label: 'Armazenamento', values: selectedPlans.map((plan) => plan.compare.storage) },
      { label: 'Meet', values: selectedPlans.map((plan) => plan.compare.meetings) },
      { label: 'IA Gemini', values: selectedPlans.map((plan) => plan.compare.ai) },
      { label: 'Segurança', values: selectedPlans.map((plan) => plan.compare.security) },
      { label: 'Administração', values: selectedPlans.map((plan) => plan.compare.admin) },
      { label: 'Ideal para', values: selectedPlans.map((plan) => plan.compare.idealFor) }
    ];

    return baseRows.filter((row) => !highlightDiffs || new Set(row.values).size > 1);
  }, [selectedPlans, highlightDiffs]);

  function togglePlan(planId: string) {
    setSelectedIds((current) => {
      if (current.includes(planId)) return current.filter((id) => id !== planId);
      if (current.length >= 4) return current;
      return [...current, planId];
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr_auto] xl:items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-950">Comparador Pro</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Selecione até quatro opções e destaque apenas o que muda entre Google Workspace, Google Workspace with Gemini, Google Cloud e AppSheet.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition sm:px-4 sm:text-xs ${
                  activeCategory === category.id
                    ? 'border-brand-300 bg-brand-50 text-brand-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200 hover:text-brand-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={highlightDiffs}
              onChange={(event) => setHighlightDiffs(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Destacar diferenças
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visiblePlans.map((plan) => {
          const active = selectedIds.includes(plan.id);
          return (
            <article
              key={plan.id}
              className={`rounded-3xl border bg-white p-5 shadow-soft transition sm:p-6 ${
                active ? 'border-brand-300 shadow-brand' : 'border-slate-200'
              }`}
            >
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 sm:text-xs">
                {plan.category}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">{plan.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{plan.summary}</p>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{plan.audience}</p>
              <button
                type="button"
                onClick={() => togglePlan(plan.id)}
                className={`mt-6 inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? 'bg-brand-gradient text-white shadow-brand' : 'border border-slate-200 text-slate-700 hover:border-brand-200 hover:text-brand-600'
                }`}
              >
                {active ? 'Remover' : 'Adicionar'}
              </button>
            </article>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-soft">
        {selectedPlans.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-600">Selecione pelo menos um plano para iniciar a comparação.</div>
        ) : (
          <div className="min-w-[700px] sm:min-w-[820px]">
            <div className="grid grid-cols-[170px_repeat(4,minmax(160px,1fr))] border-b border-slate-200 bg-slate-50 sm:grid-cols-[220px_repeat(4,minmax(180px,1fr))]">
              <div className="px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:px-5 sm:text-xs">Atributo</div>
              {selectedPlans.map((plan) => (
                <div key={plan.id} className="px-4 py-4 text-sm font-bold leading-6 text-slate-950 sm:px-5">
                  {plan.name}
                </div>
              ))}
            </div>
            {rows.map((row) => {
              const diff = new Set(row.values).size > 1;
              return (
                <div key={row.label} className="grid grid-cols-[170px_repeat(4,minmax(160px,1fr))] border-b border-slate-100 last:border-b-0 sm:grid-cols-[220px_repeat(4,minmax(180px,1fr))]">
                  <div className="bg-slate-50 px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:px-5 sm:text-xs">{row.label}</div>
                  {row.values.map((value, index) => (
                    <div
                      key={`${row.label}-${index}`}
                      className={`px-4 py-4 text-sm leading-6 text-slate-700 sm:px-5 ${diff ? 'bg-brand-50/50 font-medium text-slate-950' : 'bg-white'}`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
