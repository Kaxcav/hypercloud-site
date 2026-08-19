// components/QuoteQuiz.tsx
'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary, btnSecondary } from '@/components/ui/buttons';
import { Checkbox } from '@/components/ui/checkbox';
import { objectiveOptions, quickLeadSchema, userRangeOptions } from '@/lib/lead';
import type { QuickLeadValues } from '@/lib/lead';
import { submitQuickLead, type QuickLeadState } from '@/lib/quick-lead';
import { trackEvent } from '@/lib/analytics';

// Preenchimento sólido apagado com texto legível — o antigo `opacity-45`
// deixava branco sobre laranja em ~1,6:1.
const DISABLED_BTN =
  'inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 text-[13px] font-bold ' +
  'cursor-not-allowed border border-border bg-surface-muted text-text-subtle sm:w-auto sm:text-[14px]';

type Objective = (typeof objectiveOptions)[number]['value'];
type UserRange = (typeof userRangeOptions)[number]['value'];

export function QuoteQuiz() {
  const uid = useId();
  const [step, setStep] = useState<0 | 1>(0);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [userRange, setUserRange] = useState<UserRange | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // LGPD art. 8: consentimento precisa ser inequívoco. Caixa pré-marcada não
  // é escolha — começa desmarcada e o schema bloqueia o envio sem ela.
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<QuickLeadState>('idle');

  const step1Complete = objective !== null && userRange !== null;

  // Trocar de passo desmonta o botão que tinha o foco, que cairia no <body>.
  // Levar o foco para o novo passo mantém quem navega por teclado orientado.
  const stepRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step === 1) stepRef.current?.focus();
  }, [step]);

  function advance() {
    if (!step1Complete) return;
    trackEvent('quiz_step_1', { objective, userRange });
    setStep(1);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === 'sending') return;

    const candidate = {
      origin: 'quiz' as const,
      objective: objective ?? undefined,
      userRange: userRange ?? undefined,
      name,
      email,
      phone,
      consent,
      website: honeypot
    };

    const parsed = quickLeadSchema.safeParse(candidate);
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
    if (result === 'success') trackEvent('quiz_submit', { objective, userRange });
  }

  if (state === 'success') {
    return (
      <QuizShell>
        <div
          className="flex flex-col items-center py-6 text-center"
          role="status"
          aria-live="polite"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-700 dark:text-emerald-400">
            <Check className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-text-strong">
            Recebemos seu diagnóstico.
          </h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-text-muted">
            Um engenheiro entra em contato pelo WhatsApp informado. A cotação fechada sai em
            até 1 dia útil.
          </p>
        </div>
      </QuizShell>
    );
  }

  return (
    <QuizShell>
      {/* Progresso — o comprador precisa saber que são só dois passos. */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-[12px] font-semibold text-text-muted">
          <span>Passo {step + 1} de 2</span>
          <span>{step === 0 ? 'Necessidade' : 'Contato'}</span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-muted"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={2}
          aria-label="Progresso do diagnóstico"
        >
          <div
            className="h-full rounded-full bg-brand-gradient transition-[width] duration-500 ease-out"
            style={{ width: step === 0 ? '50%' : '100%' }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — invisível para humanos, atraente para bot. */}
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

        {step === 0 ? (
          <div className="space-y-8">
            <ChoiceGroup
              name={`${uid}-objective`}
              legend="Qual o seu principal objetivo hoje?"
              options={objectiveOptions}
              value={objective}
              onChange={(v) => setObjective(v as Objective)}
            />
            <ChoiceGroup
              name={`${uid}-range`}
              legend="Quantos usuários ou licenças?"
              options={userRangeOptions}
              value={userRange}
              onChange={(v) => setUserRange(v as UserRange)}
              columns
            />

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={advance}
                disabled={!step1Complete}
                // Estado desabilitado como classe própria, não como variante:
                // `disabled:` dentro de btnPrimary não sobrevive ao tailwind-merge.
                className={
                  step1Complete
                    ? btnPrimary('lg', 'w-full sm:w-auto')
                    : DISABLED_BTN
                }
              >
                Avançar para o Diagnóstico
                <ArrowRight className="h-4 w-4" />
              </button>
              {!step1Complete ? (
                <p className="text-[12.5px] text-text-muted">
                  Escolha as duas opções para avançar.
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="space-y-5" ref={stepRef} tabIndex={-1} aria-label="Passo 2 de 2: contato">
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

            <label className="flex cursor-pointer select-none items-start gap-3 text-[13px] leading-relaxed text-text-muted">
              <Checkbox
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked === true)}
                className="mt-0.5"
              />
              <span>
                Autorizo o contato da Hypercloud sobre esta solicitação, conforme a{' '}
                <a href="/politica-de-privacidade" className="font-semibold text-brand-600 underline underline-offset-2">
                  Política de Privacidade
                </a>
                .
              </span>
            </label>
            {errors.consent ? <FieldError>{errors.consent}</FieldError> : null}

            {state === 'error' ? (
              <FieldError>Não conseguimos enviar agora. Tente de novo em instantes.</FieldError>
            ) : null}
            {state === 'rate-limited' ? (
              <FieldError>Muitos envios seguidos. Aguarde um minuto e tente de novo.</FieldError>
            ) : null}

            <div className="flex flex-col gap-3 pt-1 sm:flex-row-reverse sm:items-center sm:justify-start">
              <button
                type="submit"
                disabled={state === 'sending'}
                className={state === 'sending' ? DISABLED_BTN : btnPrimary('lg', 'w-full sm:w-auto')}
              >
                {state === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando
                  </>
                ) : (
                  <>
                    Receber Diagnóstico e Falar com Engenheiro
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setStep(0)}
                className={btnSecondary('lg', 'w-full sm:w-auto')}
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </form>
    </QuizShell>
  );
}

function QuizShell({ children }: { children: React.ReactNode }) {
  return (
    <section id="diagnostico-rapido" className="bg-surface-base py-20 sm:py-28 lg:py-32">
      <div className="container-shell">
        <SectionHeader
          title="Dois passos até um diagnóstico de verdade."
          description="Responda o que você precisa e para quantas pessoas. O engenheiro chega na conversa já sabendo do que se trata."
          maxWidth="narrow"
        />
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface-card p-6 shadow-medium sm:p-8 lg:p-10">
          {children}
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
  onChange,
  columns = false
}: {
  name: string;
  legend: string;
  options: readonly ChoiceOption[];
  value: string | null;
  onChange: (value: string) => void;
  columns?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-[15px] font-bold text-text-strong">{legend}</legend>
      <div className={`mt-4 grid gap-2.5 ${columns ? 'sm:grid-cols-4' : 'sm:grid-cols-2'}`}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`relative flex cursor-pointer select-none items-center gap-2.5 rounded-xl border px-4 py-3.5 text-[13.5px] font-semibold transition ${
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
        className={`mt-2 w-full rounded-lg border bg-surface-soft px-4 py-3 text-[14px] text-text-default outline-none transition placeholder:text-text-subtle focus:ring-2 focus:ring-brand-500/30 ${
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
