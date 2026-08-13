'use client';

import { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { SpecialistCta } from '@/components/SpecialistCta';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const m365Plans = [
  { id: 'basic', name: 'Microsoft 365 Business Basic', approxPrice: 36 },
  { id: 'standard', name: 'Microsoft 365 Business Standard', approxPrice: 72 },
  { id: 'premium', name: 'Microsoft 365 Business Premium', approxPrice: 132 },
  { id: 'e3', name: 'Microsoft 365 E3', approxPrice: 220 },
  { id: 'e5', name: 'Microsoft 365 E5', approxPrice: 350 }
];

export default function CalculadoraPage() {
  const [usersCount, setUsersCount] = useState<number>(50);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('standard');
  const { open: openLead } = useLeadDialog();

  const selectedPlan = m365Plans.find((p) => p.id === selectedPlanId) || m365Plans[1];
  const monthlyEstimatedSpend = usersCount * selectedPlan.approxPrice;
  const yearlyEstimatedSpend = monthlyEstimatedSpend * 12;

  // Faixa estimada de otimização de custo (15% a 35% com faturamento direto e adequação de SKUs)
  const estimatedMinSavings = Math.round(yearlyEstimatedSpend * 0.15);
  const estimatedMaxSavings = Math.round(yearlyEstimatedSpend * 0.35);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container-shell relative py-14 sm:py-16 lg:py-20">
          <Breadcrumbs items={[{ label: 'Calculadora M365 → Workspace' }]} />
          <Badge variant="brand" className="mt-5">
            <Calculator className="h-3.5 w-3.5" />
            Ferramenta Interativa de Estimativa
          </Badge>
          <h1 className="mt-5 max-w-3xl text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            Simulador de transição{' '}
            <span className="font-extrabold text-gradient-brand">Microsoft 365 para Google Workspace</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
            Calcule a faixa potencial de redução de custo total de propriedade (TCO), simplificação de TI e ganho de produtividade com IA Gemini.
          </p>
        </div>
      </section>

      <section className="bg-surface-base py-16 sm:py-20">
        <div className="container-shell max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Controles do Simulador */}
            <div className="lg:col-span-7 rounded-3xl border border-border bg-surface-card p-7 shadow-soft space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-text-muted mb-3">
                  Número de Licenças / Colaboradores
                </label>
                <div className="flex items-center gap-5">
                  <Slider
                    min={10}
                    max={1000}
                    step={10}
                    value={[usersCount]}
                    onValueChange={(val) => setUsersCount(val[0])}
                    className="w-full"
                  />
                  <div className="w-24 text-right shrink-0">
                    <span className="text-2xl font-extrabold text-brand-500">{usersCount}</span>
                    <span className="text-xs block text-text-subtle">usuários</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.14em] text-text-muted mb-2">
                  Plano Microsoft 365 Atual
                </label>
                <div className="space-y-2">
                  {m365Plans.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-semibold transition ${
                        selectedPlanId === plan.id
                          ? 'border-brand-500/60 bg-brand-500/10 text-text-strong shadow-[inset_0_0_0_1px_rgba(249,115,22,0.2)]'
                          : 'border-border bg-surface-soft text-text-muted hover:border-brand-500/30'
                      }`}
                    >
                      <span>{plan.name}</span>
                      <span className="text-xs text-text-subtle">~R$ {plan.approxPrice}/mês</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-text-muted leading-relaxed">
                  *Valores estimados de referência M365 de mercado em BRL. A estimativa final da Hypercloud contempla faturamento direto em reais, atrelamento a ATAs públicas e negociação por prazo de contrato.
                </p>
              </div>
            </div>

            {/* Resultado da Estimativa */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-brand-500/40 bg-gradient-to-br from-brand-500/10 via-surface-card to-surface-card p-7 shadow-premium">
              <div>
                <Badge variant="brand">
                  <Sparkles className="h-3.5 w-3.5" />
                  Resultado Estimado
                </Badge>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-subtle">Gasto estimado M365 anual</p>
                  <p className="mt-1 text-2xl font-extrabold text-text-strong">
                    R$ {yearlyEstimatedSpend.toLocaleString('pt-BR')} <span className="text-xs font-normal text-text-muted">/ano</span>
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Potencial de economia estimado</p>
                  <p className="mt-1 text-3xl font-extrabold text-emerald-400">
                    R$ {estimatedMinSavings.toLocaleString('pt-BR')} a R$ {estimatedMaxSavings.toLocaleString('pt-BR')}
                  </p>
                  <p className="mt-2 text-xs text-text-muted leading-snug">
                    Redução projetada com adequação correta dos SKUs Frontline + Enterprise e fim de licenças ociosas.
                  </p>
                </div>

                <ul className="mt-6 space-y-2 text-xs text-text-muted">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                    <span>Inclusão de Gemini AI nativo sem custo de licença avulsa Copilot</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                    <span>Faturamento nacional unificado em BRL sem imposto de remessa externa</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="brand"
                  size="lg"
                  onClick={() => openLead(`Calculadora M365: ${usersCount} usuários (${selectedPlan.name})`)}
                  className="w-full"
                >
                  Receber Relatório Detalhado por E-mail
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="mt-2 text-center text-[11px] text-text-subtle">
                  Mandamos um estudo completo comparando cada recurso do seu plano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpecialistCta
        title="Dúvidas sobre o processo de migração M365 → Workspace?"
        description="Fale com nosso time de engenharia de migração. Sem perda de histórico, sem interrupção."
      />
    </>
  );
}
