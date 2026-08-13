'use client';

import { useEffect, useState } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import {
  workspacePlans,
  type WorkspacePlan,
  type WorkspaceTier
} from '@/constants/workspace-plans';
import { cn } from '@/components/ui';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabOptions: { id: WorkspaceTier; label: string; hint: string }[] = [
  { id: 'enterprise', label: 'Enterprise', hint: 'Empresas e instituições públicas' },
  { id: 'frontline', label: 'Frontline', hint: 'Operação · suporte · equipes de campo' }
];

export function PlansGrid() {
  const [activeTier, setActiveTier] = useState<WorkspaceTier>('enterprise');
  const { open: openLead } = useLeadDialog();

  // Deep-link via hash
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash === '#planos-frontline' || hash === '#pricing-frontline') setActiveTier('frontline');
    if (hash === '#planos-enterprise' || hash === '#pricing-enterprise') setActiveTier('enterprise');
  }, []);

  const visiblePlans = workspacePlans.filter((p) => p.tier === activeTier);

  function handleTabChange(tier: string) {
    const nextTier = tier as WorkspaceTier;
    setActiveTier(nextTier);
    if (typeof window !== 'undefined') {
      const newHash = nextTier === 'frontline' ? 'planos-frontline' : 'planos-enterprise';
      window.history.replaceState(null, '', `#${newHash}`);
    }
  }

  return (
    <section id="planos" className="container-shell py-20 sm:py-24 lg:py-28">
      <SectionHeader
        eyebrow="Planos Google Workspace"
        title={
          <>
            Estrutura de edições.{' '}
            <span className="font-extrabold text-gradient-brand">Cotação personalizada.</span>
          </>
        }
        description="Preço fechado por volume de licenças, prazo de contrato e veículo de aquisição (ATA, pregão ou contratação direta). Cotação enviada em até 1 dia útil."
        maxWidth="narrow"
      />

      {/* Tabs Radix / shadcn */}
      <div className="mx-auto mt-10 flex flex-col items-center">
        <Tabs value={activeTier} onValueChange={handleTabChange} className="w-full max-w-sm">
          <TabsList className="w-full">
            {tabOptions.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="flex-1">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <p className="mt-3 text-center text-[12px] text-text-subtle">
          {tabOptions.find((t) => t.id === activeTier)?.hint}
        </p>
      </div>

      {/* Cards grid */}
      <div
        id={activeTier === 'frontline' ? 'planos-frontline' : 'planos-enterprise'}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visiblePlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onContact={openLead} />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-surface-soft p-5 text-center shadow-soft">
        <p className="text-[13px] font-semibold text-text-strong">
          Condições especiais para contratações plurianuais e migração de grandes ambientes.
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-text-muted">
          Preços fechados sem surpresa na fatura, com suporte em português e faturamento nacional em reais (BRL).{' '}
          <a href="#compare-all" className="font-medium text-brand-500 underline underline-offset-2 hover:text-brand-400">
            Comparar matriz completa de recursos
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  onContact
}: {
  plan: WorkspacePlan;
  onContact: (context?: string) => void;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-surface-card p-7 transition',
        plan.recommended
          ? 'z-10 border-brand-500/60 shadow-[0_28px_60px_-30px_rgba(249,115,22,0.55)] ring-2 ring-brand-500/40 lg:scale-[1.04]'
          : 'border-border shadow-soft hover:-translate-y-1 hover:shadow-medium'
      )}
    >
      {plan.recommended ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white shadow-brand">
          Mais Escolhido
        </span>
      ) : null}

      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
          {plan.tier === 'frontline' ? 'Frontline' : 'Enterprise'}
        </p>
      </div>

      <h3 className="mt-1 text-xl font-extrabold text-text-strong">
        {plan.name}
      </h3>

      <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-500/20 bg-brand-500/10 px-2.5 py-1 text-[11.5px] font-semibold text-brand-500">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
        <span>{plan.suitability}</span>
      </div>

      <div className="my-4 border-t border-border" />

      <p className="text-[12.5px] leading-relaxed text-text-muted">
        {plan.audience}
      </p>

      <ul className="mt-5 space-y-2">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span className="text-[13px] leading-snug text-text">{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Button
          type="button"
          variant={plan.recommended ? 'brand' : 'secondary'}
          size="lg"
          onClick={() => onContact(`Cotação — ${plan.name}`)}
          className="w-full"
        >
          {plan.cta}
        </Button>

        <p className="mt-2 text-center text-[11px] text-text-subtle">
          Proposta customizada em 1 dia útil
        </p>
      </div>
    </div>
  );
}
