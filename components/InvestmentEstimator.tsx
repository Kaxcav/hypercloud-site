'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { findRange, formatBRL, pricingRanges } from '@/constants/pricing-ranges';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';

const userSteps = [
  10, 25, 50, 100, 150, 200, 300, 500
] as const;

export function InvestmentEstimator({ id = 'calculadora' }: { id?: string }) {
  const [users, setUsers] = useState(50);
  const [planId, setPlanId] = useState('workspace-standard');
  const { open: openLead } = useLeadDialog();

  const range = useMemo(() => findRange(planId), [planId]);

  const monthlyMin = users * range.perUserMonth.min;
  const monthlyMax = users * range.perUserMonth.max;
  const annualMin = monthlyMin * 12;
  const annualMax = monthlyMax * 12;

  return (
    <section
      id={id}
      className="relative overflow-hidden border-y border-border bg-surface-soft py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />

      <div className="container-shell relative">
        <div className="mb-12 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
              <Calculator className="h-3 w-3" />
              Calculadora de investimento
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-[44px] lg:leading-[1.05]">
              Quanto pode custar a operação Google da sua empresa?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              Mova o slider, escolha o plano. Mostramos uma <span className="font-bold text-text-strong">faixa estimada</span> — não preço público.
              Para cotação exata, abra um contato direto.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* CONTROLS */}
          <div className="rounded-3xl border border-border bg-surface-card p-7 shadow-soft sm:p-8">
            <div className="mb-6">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="estimator-users" className="text-[12px] font-bold uppercase tracking-[0.18em] text-text-muted">
                  Quantidade de usuários
                </label>
                <span className="font-serif text-[36px] italic leading-none tracking-tight text-brand-400">
                  {users.toLocaleString('pt-BR')}
                </span>
              </div>
              <input
                id="estimator-users"
                type="range"
                min={5}
                max={500}
                step={5}
                value={users}
                onChange={(e) => setUsers(Number(e.target.value))}
                className="estimator-slider mt-4 w-full"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {userSteps.map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setUsers(step)}
                    className={cn(
                      'rounded-md border px-2.5 py-1 text-[11px] font-bold transition',
                      users === step
                        ? 'border-brand-500/60 bg-brand-500/10 text-brand-400'
                        : 'border-border bg-surface-soft text-text-muted hover:text-text'
                    )}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase tracking-[0.18em] text-text-muted">
                Plano de referência
              </label>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {pricingRanges.map((plan) => {
                  const active = plan.planId === planId;
                  return (
                    <button
                      key={plan.planId}
                      type="button"
                      onClick={() => setPlanId(plan.planId)}
                      aria-pressed={active}
                      className={cn(
                        'group rounded-xl border p-3.5 text-left transition',
                        active
                          ? 'border-brand-500/60 bg-brand-500/10'
                          : 'border-border bg-surface-soft hover:border-brand-500/30'
                      )}
                    >
                      <p className={cn('text-[13px] font-bold', active ? 'text-text-strong' : 'text-text')}>
                        {plan.shortLabel}
                      </p>
                      <p className="mt-0.5 text-[12px] text-text-muted">{plan.audience}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-500/5 to-transparent p-7 shadow-premium sm:p-8">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/15 blur-3xl" aria-hidden />

            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
                Faixa estimada
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-text-strong sm:text-2xl">{range.label}</h3>
              <p className="mt-1 text-[13px] text-text-muted">{range.audience}</p>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-border bg-surface-card p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle">Mensal</p>
                  <p className="mt-1.5 text-[26px] font-extrabold leading-tight tracking-tight text-text-strong sm:text-[32px]">
                    {formatBRL(monthlyMin)} <span className="text-text-muted">–</span> {formatBRL(monthlyMax)}
                  </p>
                  <p className="mt-1 text-[12px] text-text-muted">Com {users} usuários</p>
                </div>

                <div className="rounded-2xl border border-border bg-surface-card p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-subtle">Anual</p>
                  <p className="mt-1.5 text-[22px] font-bold leading-tight tracking-tight text-text-strong sm:text-[26px]">
                    {formatBRL(annualMin)} <span className="text-text-muted">–</span> {formatBRL(annualMax)}
                  </p>
                </div>

                <ul className="grid gap-1.5 text-[12.5px] text-text-muted">
                  {range.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-brand-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openLead(`Quero cotação exata para ${users} usuários · ${range.shortLabel}.`)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
              >
                Receber cotação exata
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <p className="mt-3 text-center text-[11px] leading-snug text-text-subtle">
                A faixa é heurística e varia por desconto, ATAs, comprometimento anual e configuração específica.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .estimator-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: linear-gradient(
            to right,
            #f97316 0%,
            #fb923c calc(${(users / 500) * 100}% - 0.1%),
            var(--surface-muted) calc(${(users / 500) * 100}%),
            var(--surface-muted) 100%
          );
          border-radius: 999px;
          outline: none;
        }
        .estimator-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          background: #fb923c;
          border-radius: 50%;
          border: 3px solid var(--surface-card);
          box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.4), 0 8px 24px rgba(249, 115, 22, 0.3);
          cursor: pointer;
          transition: transform 150ms;
        }
        .estimator-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .estimator-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          background: #fb923c;
          border-radius: 50%;
          border: 3px solid var(--surface-card);
          box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.4), 0 8px 24px rgba(249, 115, 22, 0.3);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
