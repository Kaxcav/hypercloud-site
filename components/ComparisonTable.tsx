'use client';

import Link from 'next/link';
import { ArrowRight, Check, Info, Minus, Sparkles, Star } from 'lucide-react';
import { plans } from '@/constants/plans';
import {
  comparisonPlanIds,
  featureMatrix,
  recommendedPlanId,
  type FeatureValue
} from '@/constants/features';

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

const gridCols =
  'grid-cols-[minmax(150px,1.4fr)_repeat(4,minmax(72px,1fr))] sm:grid-cols-[minmax(240px,1.4fr)_repeat(4,minmax(140px,1fr))]';

const featuredCellClass =
  'bg-brand-50/60 ring-1 ring-inset ring-brand-200/70';

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Toolbar topo */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            Comparador Pro
          </p>
          <h3 className="mt-2 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
            Os 4 tiers do Google Workspace, lado a lado.
          </h3>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-slate-600">
            Recursos agrupados por categoria, com tooltips em termos técnicos
            (DLP, Vault, Endpoint Management) para você decidir com mais
            contexto.
          </p>
        </div>
        <Link
          href="#falar-com-especialista"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-brand-gradient px-5 py-2.5 text-[13px] font-semibold text-white shadow-brand transition hover:opacity-95 sm:self-auto"
        >
          Falar com Especialista
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Header sticky com nomes dos planos */}
      <div
        className={`sticky top-20 z-20 grid border-b border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] lg:top-[124px] ${gridCols}`}
      >
        <div className="px-3 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:px-6 sm:text-[11px]">
          Recurso
        </div>
        {visiblePlans.map((plan) => {
          const featured = plan.id === recommendedPlanId;
          return (
            <div
              key={plan.id}
              className={`relative px-2 py-4 text-center sm:px-4 ${
                featured ? featuredCellClass : ''
              }`}
            >
              {featured ? (
                <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-brand-gradient px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-brand sm:text-[10px]">
                  <Star className="h-2.5 w-2.5 fill-white" />
                  Recomendado
                </span>
              ) : null}
              <p className="text-[11px] font-extrabold tracking-tight text-slate-900 sm:text-sm">
                {shortNameMap[plan.id] ?? plan.name}
              </p>
              <p className="mt-1 hidden text-[11px] leading-snug text-slate-500 sm:block">
                {plan.compare.idealFor}
              </p>
            </div>
          );
        })}
      </div>

      {/* Categorias + features */}
      {featureMatrix.map((category) => (
        <div key={category.id} className="border-b border-slate-200 last:border-b-0">
          {/* Header de categoria */}
          <div className="border-b border-slate-200 bg-slate-50/80 px-3 py-3 sm:px-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-700 sm:text-[11px]">
              {category.label}
            </p>
            {category.description ? (
              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                {category.description}
              </p>
            ) : null}
          </div>

          {/* Linhas de feature */}
          {category.features.map((feature) => (
            <div
              key={feature.id}
              className={`grid border-b border-slate-100 last:border-b-0 ${gridCols}`}
            >
              <div className="flex items-center px-3 py-3.5 text-[12px] font-medium leading-snug text-slate-700 sm:px-6 sm:py-4 sm:text-[13px]">
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
                    className={`flex items-center justify-center px-2 py-3.5 text-center text-[12px] sm:px-4 sm:py-4 sm:text-[13px] ${
                      featured ? featuredCellClass : ''
                    }`}
                  >
                    <FeatureValueCell value={feature.values[plan.id]} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      {/* Footer com CTAs por plano */}
      <div className={`grid border-t border-slate-200 bg-slate-50/40 ${gridCols}`}>
        <div className="px-3 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:px-6">
          Próximo passo
        </div>
        {visiblePlans.map((plan) => {
          const featured = plan.id === recommendedPlanId;
          return (
            <div
              key={plan.id}
              className={`flex items-center justify-center px-2 py-5 sm:px-3 ${
                featured ? featuredCellClass : ''
              }`}
            >
              <Link
                href="#falar-com-especialista"
                className={`inline-flex w-full items-center justify-center gap-1 rounded-md px-2 py-2 text-[10px] font-semibold transition sm:gap-1.5 sm:px-3 sm:text-[12px] ${
                  featured
                    ? 'bg-brand-gradient text-white shadow-brand hover:opacity-95'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:text-brand-600'
                }`}
              >
                <span className="hidden sm:inline">{plan.cta}</span>
                <span className="sm:hidden">Falar</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
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
      <Info className="h-3.5 w-3.5 cursor-help text-slate-400 transition group-hover/tip:text-brand-600" />
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute left-1/2 top-full z-30 mt-2 w-60 -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-normal leading-snug text-white opacity-0 shadow-medium transition duration-150 group-hover/tip:visible group-hover/tip:opacity-100 group-focus-within/tip:visible group-focus-within/tip:opacity-100 sm:w-64"
      >
        {text}
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900" />
      </span>
    </span>
  );
}

function FeatureValueCell({ value }: { value: FeatureValue | undefined }) {
  if (value === true) {
    return (
      <span
        aria-label="Incluído"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-600 sm:h-7 sm:w-7"
      >
        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
      </span>
    );
  }
  if (value === false || value === undefined) {
    return (
      <span aria-label="Não incluído" className="inline-flex">
        <Minus className="h-4 w-4 text-slate-300" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="text-[12px] font-bold tracking-tight text-slate-900 sm:text-[13px]">
      {value}
    </span>
  );
}
