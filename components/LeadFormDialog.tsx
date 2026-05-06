'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { useEffect, useId, useState } from 'react';
import { ArrowRight, Building2, BrainCircuit, Check, Cloud, Loader2, Mail, Phone, Sparkles, User2, Workflow, X } from 'lucide-react';
import {
  companySizeOptions,
  interestOptions,
  leadDefaults,
  leadFormSchema,
  sectorOptions,
  type LeadFormValues
} from '@/lib/lead';
import { cn } from '@/components/ui';

type LeadFormDialogProps = {
  open: boolean;
  context?: string;
  onClose: () => void;
};

const interestIcon: Record<(typeof interestOptions)[number]['value'], React.ComponentType<{ className?: string }>> = {
  workspace: Building2,
  gemini: BrainCircuit,
  cloud: Cloud,
  appsheet: Workflow
};

export function LeadFormDialog({ open, context, onClose }: LeadFormDialogProps) {
  const titleId = useId();
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema) as Resolver<LeadFormValues>,
    defaultValues: leadDefaults as LeadFormValues,
    mode: 'onTouched'
  });
  const { register, handleSubmit, watch, setValue, trigger, reset, formState } = form;

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setSubmitState('idle');
    reset(leadDefaults as LeadFormValues);
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const interests = watch('interests');

  function toggleInterest(value: (typeof interestOptions)[number]['value']) {
    const current = new Set(interests ?? []);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    setValue('interests', Array.from(current) as LeadFormValues['interests'], {
      shouldValidate: true,
      shouldDirty: true
    });
  }

  async function handleNext() {
    const fields: Array<keyof LeadFormValues> =
      step === 0 ? ['company', 'size', 'sector'] : ['interests'];
    const valid = await trigger(fields, { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, 2));
  }

  const onSubmit: SubmitHandler<LeadFormValues> = async (values) => {
    setSubmitState('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error('request-failed');
      setSubmitState('success');
    } catch (error) {
      console.error('[lead] submit error', error);
      setSubmitState('error');
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-ink-0/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-surface-card shadow-premium">
        {/* glow decorativo */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" aria-hidden />

        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-soft text-text-muted transition hover:text-text"
        >
          <X className="h-4 w-4" />
        </button>

        {/* header */}
        <div className="relative px-6 pt-7 sm:px-8 sm:pt-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">
            <Sparkles className="h-3 w-3" />
            Falar com especialista
          </span>
          <h2 id={titleId} className="mt-4 text-2xl font-bold tracking-tight text-text-strong sm:text-[26px]">
            {submitState === 'success' ? 'Pedido recebido.' : 'Vamos começar uma conversa.'}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
            {submitState === 'success'
              ? 'Um especialista da Hypercloud responde em até 1 dia útil.'
              : context ?? 'Três passos para a gente entender seu cenário e responder com a pessoa certa.'}
          </p>

          {submitState !== 'success' ? (
            <ol className="mt-6 flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex flex-1 items-center">
                  <span
                    className={cn(
                      'inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition',
                      i < step
                        ? 'bg-brand-gradient text-white shadow-brand'
                        : i === step
                          ? 'border border-brand-500/40 bg-surface-card text-brand-400'
                          : 'border border-border bg-surface-card text-text-subtle'
                    )}
                  >
                    {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  {i < 2 ? (
                    <span
                      className={cn(
                        'mx-2 h-px flex-1 transition',
                        i < step ? 'bg-brand-500' : 'bg-border'
                      )}
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}
        </div>

        {/* body */}
        <form onSubmit={handleSubmit(onSubmit)} className="relative px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
          {submitState === 'success' ? (
            <SuccessState onClose={onClose} />
          ) : (
            <>
              {/* honeypot */}
              <div className="hidden" aria-hidden>
                <label>Website</label>
                <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
              </div>

              {step === 0 ? (
                <div className="space-y-4">
                  <Field label="Nome da empresa" error={formState.errors.company?.message}>
                    <input
                      autoFocus
                      placeholder="Ex.: Indústria Acme"
                      {...register('company')}
                      className="form-input"
                    />
                  </Field>
                  <Field label="Porte" error={formState.errors.size?.message}>
                    <select {...register('size')} className="form-input">
                      {companySizeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Setor" error={formState.errors.sector?.message}>
                    <select {...register('sector')} className="form-input">
                      {sectorOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="space-y-4">
                  <Field label="O que mais te interessa?" hint="Você pode marcar mais de uma" error={formState.errors.interests?.message as string | undefined}>
                    <div className="grid grid-cols-2 gap-2.5">
                      {interestOptions.map((opt) => {
                        const Icon = interestIcon[opt.value];
                        const checked = interests?.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleInterest(opt.value)}
                            aria-pressed={checked}
                            className={cn(
                              'flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-[13px] font-semibold transition',
                              checked
                                ? 'border-brand-500/60 bg-brand-500/10 text-text-strong shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)]'
                                : 'border-border bg-surface-soft text-text hover:border-brand-500/30 hover:text-text-strong'
                            )}
                          >
                            <Icon className={cn('h-4 w-4 shrink-0', checked ? 'text-brand-400' : 'text-text-muted')} />
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Contexto (opcional)" hint="Conte rapidamente o cenário, restrições ou prazo">
                    <textarea
                      rows={3}
                      placeholder="Ex.: Estamos avaliando migrar 320 caixas do Microsoft 365 para Workspace até Q3."
                      {...register('context')}
                      className="form-input resize-none"
                    />
                  </Field>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-4">
                  <Field label="Seu nome" error={formState.errors.name?.message}>
                    <div className="form-input-wrapper">
                      <User2 className="h-4 w-4 text-text-subtle" />
                      <input placeholder="Como podemos te chamar?" {...register('name')} className="form-input-bare" />
                    </div>
                  </Field>
                  <Field label="E-mail corporativo" error={formState.errors.email?.message}>
                    <div className="form-input-wrapper">
                      <Mail className="h-4 w-4 text-text-subtle" />
                      <input type="email" placeholder="voce@empresa.com" {...register('email')} className="form-input-bare" />
                    </div>
                  </Field>
                  <Field label="Telefone / WhatsApp" error={formState.errors.phone?.message}>
                    <div className="form-input-wrapper">
                      <Phone className="h-4 w-4 text-text-subtle" />
                      <input placeholder="(11) 9 9999-9999" {...register('phone')} className="form-input-bare" />
                    </div>
                  </Field>
                  <Field label="Algo mais? (opcional)">
                    <textarea
                      rows={2}
                      placeholder="Outras pessoas envolvidas, prazos específicos, etc."
                      {...register('notes')}
                      className="form-input resize-none"
                    />
                  </Field>
                  {submitState === 'error' ? (
                    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[12px] text-red-400">
                      Não conseguimos enviar agora. Tente novamente em instantes.
                    </p>
                  ) : null}
                </div>
              ) : null}

              {/* footer */}
              <div className="mt-6 flex items-center justify-between gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="rounded-lg border border-border bg-surface-soft px-4 py-2.5 text-[13px] font-semibold text-text transition hover:text-text-strong"
                  >
                    Voltar
                  </button>
                ) : (
                  <span className="text-[12px] text-text-subtle">
                    Passo {step + 1} de 3
                  </span>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
                  >
                    Próximo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitState === 'sending'}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitState === 'sending' ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Enviando…
                      </>
                    ) : (
                      <>
                        Enviar pedido
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>

      {/* form input styles */}
      <style jsx global>{`
        .form-input,
        .form-input-bare {
          width: 100%;
          background: transparent;
          color: var(--text-strong);
          font-size: 14px;
          font-weight: 500;
          outline: none;
        }
        .form-input {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid var(--border-default);
          background: var(--surface-soft);
          transition: border-color 150ms;
        }
        .form-input::placeholder,
        .form-input-bare::placeholder {
          color: var(--text-subtle);
        }
        .form-input:focus,
        .form-input-wrapper:focus-within {
          border-color: rgba(249, 115, 22, 0.5);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.12);
        }
        .form-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid var(--border-default);
          background: var(--surface-soft);
          transition: border-color 150ms, box-shadow 150ms;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-text-muted">
        {label}
      </span>
      {children}
      {hint && !error ? (
        <span className="mt-1.5 block text-[12px] text-text-subtle">{hint}</span>
      ) : null}
      {error ? (
        <span className="mt-1.5 block text-[12px] font-medium text-red-400">{error}</span>
      ) : null}
    </label>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center">
      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-brand">
        <Check className="h-6 w-6" strokeWidth={3} />
      </div>
      <h3 className="mt-5 text-xl font-bold tracking-tight text-text-strong">Recebemos seu pedido.</h3>
      <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-text-muted">
        Um especialista da Hypercloud entra em contato em até 1 dia útil pelo canal que você indicou.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
      >
        Continuar navegando
      </button>
    </div>
  );
}
