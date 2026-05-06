'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, BrainCircuit, Calculator, HardDrive, ShieldCheck, Sparkles, Users, Video } from 'lucide-react';
import { findPlan, formatNumber, formatStorage, scalePlans } from '@/constants/pricing-ranges';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { cn } from '@/components/ui';

const userSteps = [10, 25, 50, 100, 150, 200, 300, 500] as const;

const governanceTier: Record<string, { value: number; label: string }> = {
  Essencial: { value: 1, label: 'Essencial' },
  Intermediária: { value: 2, label: 'Intermediária' },
  Avançada: { value: 3, label: 'Avançada' },
  Enterprise: { value: 4, label: 'Enterprise' }
};

export function InvestmentEstimator({ id = 'calculadora' }: { id?: string }) {
  const [users, setUsers] = useState(50);
  const [planId, setPlanId] = useState('workspace-standard');
  const { open: openLead } = useLeadDialog();

  const plan = useMemo(() => findPlan(planId), [planId]);
  const totalStorage = formatStorage(plan.storagePerUserGb, users);
  const meetingsTotal = users * plan.meetCap;
  const govTier = governanceTier[plan.governance];

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
              Estimador de escala
            </span>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-[44px] lg:leading-[1.05]">
              O que você ganha em cada plano, na escala da sua operação.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              Mova o slider, escolha o plano. Mostramos <span className="font-bold text-text-strong">capacidade total</span>,
              governança e IA aplicada — não preço. Cotação exata vem na conversa com especialista.
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
                {scalePlans.map((p) => {
                  const active = p.planId === planId;
                  return (
                    <button
                      key={p.planId}
                      type="button"
                      onClick={() => setPlanId(p.planId)}
                      aria-pressed={active}
                      className={cn(
                        'group rounded-xl border p-3.5 text-left transition',
                        active
                          ? 'border-brand-500/60 bg-brand-500/10'
                          : 'border-border bg-surface-soft hover:border-brand-500/30'
                      )}
                    >
                      <p className={cn('text-[13px] font-bold', active ? 'text-text-strong' : 'text-text')}>
                        {p.shortLabel}
                      </p>
                      <p className="mt-0.5 text-[12px] text-text-muted">{p.audience}</p>
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
                Capacidade resultante
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-text-strong sm:text-2xl">{plan.label}</h3>
              <p className="mt-1 text-[13px] text-text-muted">{plan.audience}</p>

              <div className="mt-6 grid gap-3">
                <CapacityRow
                  icon={Users}
                  label="Usuários cobertos"
                  value={formatNumber(users)}
                />
                <CapacityRow
                  icon={HardDrive}
                  label="Armazenamento total"
                  value={totalStorage}
                  hint={plan.storagePerUserGb === 0 ? 'Sob política institucional' : `${plan.storagePerUserGb >= 1024 ? `${plan.storagePerUserGb / 1024} TB` : `${plan.storagePerUserGb} GB`} por usuário`}
                />
                <CapacityRow
                  icon={Video}
                  label="Capacidade Meet"
                  value={`${formatNumber(plan.meetCap)} / sala`}
                  hint={`Até ${formatNumber(meetingsTotal)} pessoas em paralelo`}
                />
                <CapacityRow
                  icon={ShieldCheck}
                  label="Governança"
                  value={plan.governance}
                  meter={govTier.value}
                />
                <CapacityRow
                  icon={BrainCircuit}
                  label="IA aplicada"
                  value={plan.aiTier}
                />
              </div>

              <ul className="mt-6 grid gap-1.5 text-[12.5px] text-text-muted">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-brand-400" />
                    {h}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => openLead(`Quero cotação exata para ${users} usuários · ${plan.shortLabel}.`)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
              >
                Receber cotação exata
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <p className="mt-3 text-center text-[11px] leading-snug text-text-subtle">
                Investimento depende de desconto, ATAs, comprometimento anual e configuração específica — fechamos isso na conversa.
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

function CapacityRow({
  icon: Icon,
  label,
  value,
  hint,
  meter
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
  meter?: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-card p-3.5">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-subtle">{label}</p>
        <p className="mt-0.5 text-[15px] font-extrabold tracking-tight text-text-strong">
          {value}
        </p>
        {hint ? <p className="mt-0.5 text-[11.5px] text-text-muted">{hint}</p> : null}
      </div>
      {typeof meter === 'number' ? (
        <div className="flex shrink-0 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                'h-2 w-2 rounded-full transition',
                i <= meter ? 'bg-brand-400' : 'bg-border-strong'
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
