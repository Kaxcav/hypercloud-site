// components/FinOpsCalculator.tsx
'use client';

import { useId, useMemo, useState } from 'react';
import { ArrowRight, Check, Loader2, TrendingDown } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary } from '@/components/ui/buttons';
import { Checkbox } from '@/components/ui/checkbox';
import { monthlySpendOptions, providerOptions, quickLeadSchema } from '@/lib/lead';
import type { QuickLeadValues } from '@/lib/lead';
import { submitQuickLead, type QuickLeadState } from '@/lib/quick-lead';
import { FINOPS_SAVING_RANGE, brl, estimateAnnualSaving } from '@/constants/finops';
import { trackEvent } from '@/lib/analytics';

// Preenchimento sólido apagado com texto legível (ver QuoteQuiz).
const DISABLED_BTN =
  'inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-[13px] font-bold ' +
  'cursor-not-allowed border border-border bg-surface-muted text-text-subtle sm:text-[14px]';

type Spend = (typeof monthlySpendOptions)[number]['value'];
type Provider = (typeof providerOptions)[number]['value'];

const percentLabel = `${Math.round(FINOPS_SAVING_RANGE.min * 100)}% a ${Math.round(
  FINOPS_SAVING_RANGE.max * 100
)}%`;

export function FinOpsCalculator() {
  const uid = useId();
  const [spend, setSpend] = useState<Spend | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // LGPD art. 8: consentimento precisa ser inequívoco. Caixa pré-marcada não
  // é escolha — começa desmarcada e o schema bloqueia o envio sem ela.
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<QuickLeadState>('idle');

  const estimate = useMemo(() => {
    if (!spend) return null;
    const option = monthlySpendOptions.find((o) => o.value === spend);
    if (!option) return null;
    return estimateAnnualSaving(option.midpoint, provider ?? undefined);
  }, [spend, provider]);

  const ready = spend !== null && provider !== null && estimate !== null;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === 'sending' || !ready) return;

    const parsed = quickLeadSchema.safeParse({
      origin: 'calculadora' as const,
      monthlySpend: spend ?? undefined,
      provider: provider ?? undefined,
      estimatedAnnualSaving: estimate ?? undefined,
      name,
      email,
      phone,
      consent,
      website: honeypot
    });

    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([key, value]) => [key, value?.[0] ?? 'Campo inválido'])
        )
      );
      return;
    }

    setErrors({});
    setState('sending');
    const result = await submitQuickLead(parsed.data as QuickLeadValues);
    setState(result);
    if (result === 'success') {
      trackEvent('finops_calculator_submit', { spend, provider, estimate });
    }
  }

  return (
    <section id="simular-economia" className="border-y border-border bg-surface-soft py-20 sm:py-28 lg:py-32">
      <div className="container-shell">
        <SectionHeader
          title="Sua fatura de Nuvem está até 30% maior do que deveria. Faça a simulação."
          description="Selecione seu gasto atual e o provedor. Calcule em segundos o valor desperdiçado com licenças ociosas e recursos mal dimensionados."
          maxWidth="narrow"
        />

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
          {/* Entradas */}
          <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft sm:p-8">
            <ChoiceGroup
              name={`${uid}-spend`}
              legend="Gasto mensal com nuvem e licenças"
              options={monthlySpendOptions}
              value={spend}
              onChange={(v) => setSpend(v as Spend)}
            />
            <div className="mt-8">
              <ChoiceGroup
                name={`${uid}-provider`}
                legend="Provedor atual"
                options={providerOptions}
                value={provider}
                onChange={(v) => setProvider(v as Provider)}
              />
            </div>
          </div>

          {/* Revelação */}
          <div className="flex flex-col rounded-2xl border border-brand-500/25 bg-surface-card p-6 shadow-medium sm:p-8">
            {!ready ? (
              <div className="flex flex-1 flex-col justify-center py-8 text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-text-subtle">
                  <TrendingDown className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[15px] leading-relaxed text-text-muted">
                  Selecione a faixa de gasto e o provedor para ver a estimativa.
                </p>
              </div>
            ) : state === 'success' ? (
              <div className="flex flex-1 flex-col justify-center py-8 text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-700 dark:text-emerald-400">
                  <Check className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight text-text-strong">
                  Relatório a caminho.
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-text-muted">
                  Um engenheiro vai te procurar para levantar o ambiente real e fechar os
                  números com base nele.
                </p>
              </div>
            ) : (
              <>
                <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-400">
                  Estimativa de otimização identificada
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
                  Sua empresa pode economizar até
                </p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight text-text-strong sm:text-5xl">
                  {brl.format(estimate)}
                  <span className="text-xl font-bold text-text-muted"> /ano</span>
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-text-muted">
                  ajustando licenciamento e arquitetura.
                </p>

                {/* Honestidade sobre o que este numero e — e o que ele nao e. */}
                <p className="mt-4 rounded-lg border border-border bg-surface-soft px-4 py-3 text-[12.5px] leading-relaxed text-text-muted">
                  Estimativa de referência sobre uma faixa de {percentLabel} de otimização, a
                  partir do gasto informado. Não é proposta comercial: o número real depende do
                  inventário do seu ambiente.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                  />
                  <Field
                    id={`${uid}-name`}
                    label="Nome"
                    value={name}
                    onChange={setName}
                    autoComplete="name"
                    error={errors.name}
                  />
                  <Field
                    id={`${uid}-email`}
                    label="E-mail corporativo"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                    error={errors.email}
                  />
                  <Field
                    id={`${uid}-phone`}
                    label="WhatsApp"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    autoComplete="tel"
                    placeholder="(31) 90000-0000"
                    error={errors.phone}
                  />

                  <label className="flex cursor-pointer select-none items-start gap-3 text-[12.5px] leading-relaxed text-text-muted">
                    <Checkbox
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked === true)}
                      className="mt-0.5"
                    />
                    <span>
                      Autorizo o contato da Hypercloud sobre esta estimativa, conforme a{' '}
                      <a
                        href="/politica-de-privacidade"
                        className="font-semibold text-brand-600 underline underline-offset-2"
                      >
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </label>
                  {errors.consent ? <FieldError>{errors.consent}</FieldError> : null}

                  {state === 'error' ? (
                    <FieldError>
                      Não conseguimos enviar agora. Tente de novo em instantes.
                    </FieldError>
                  ) : null}
                  {state === 'rate-limited' ? (
                    <FieldError>
                      Muitos envios seguidos. Aguarde um minuto e tente de novo.
                    </FieldError>
                  ) : null}

                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className={
                      state === 'sending' ? DISABLED_BTN : btnPrimary('lg', 'w-full')
                    }
                  >
                    {state === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando
                      </>
                    ) : (
                      <>
                        Desbloquear Relatório de FinOps Completo
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type ChoiceOption = { readonly value: string; readonly label: string };

function ChoiceGroup({
  name,
  legend,
  options,
  value,
  onChange
}: {
  name: string;
  legend: string;
  options: readonly ChoiceOption[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[15px] font-bold text-text-strong">{legend}</legend>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer select-none items-center gap-2.5 rounded-xl border px-4 py-3.5 text-[13.5px] font-semibold transition ${
                selected
                  ? 'border-brand-500 bg-brand-500/8 text-text-strong shadow-soft'
                  : 'border-border bg-surface-soft text-text-muted hover:border-brand-500/40 hover:text-text-strong'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                // Radio de verdade, visível: o anel de foco nativo só existe
                // em elemento visível. `sr-only` + dot falso apagava o foco.
                className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-border-strong transition checked:border-[5px] checked:border-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  placeholder,
  error
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-bold text-text-strong">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-lg border bg-surface-soft px-4 py-2.5 text-[14px] text-text-default outline-none transition placeholder:text-text-subtle focus:ring-2 focus:ring-brand-500/30 ${
          error ? 'border-red-500/70' : 'border-border focus:border-brand-500/60'
        }`}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="mt-2 text-[12.5px] font-semibold text-red-600 dark:text-red-400">
      {children}
    </p>
  );
}
