// components/CompareAllTable.tsx
'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import {
  workspaceFeatures,
  workspacePlanOrder,
  workspacePlanMobileCurated,
  type CellValue,
  type FeatureBlock
} from '@/constants/workspace-features';
import {
  workspacePlans,
  formatPlanPrice,
  type WorkspacePlan,
  type WorkspacePlanId
} from '@/constants/workspace-plans';
import { cn } from '@/components/ui';
import { SectionHeader } from '@/components/SectionHeader';
import { btnPrimary } from '@/components/buttons';

const BLOCK_ORDER: FeatureBlock[] = ['Geral', 'Armaz.', 'Colab.', 'Comun.', 'Segur.', 'Compl.'];
const BLOCK_LABEL: Record<FeatureBlock, string> = {
  Geral: 'Geral',
  'Armaz.': 'Armazenamento',
  'Colab.': 'Colaboração',
  'Comun.': 'Comunicação',
  'Segur.': 'Segurança',
  'Compl.': 'Compliance'
};

export function CompareAllTable() {
  const [expanded, setExpanded] = useState(false);
  const { open: openLead } = useLeadDialog();

  const planMap = new Map(workspacePlans.map((p) => [p.id, p]));

  // Mobile: default mostra apenas 3 colunas; expanded mostra todas as 8.
  const mobileVisiblePlanIds = expanded ? workspacePlanOrder : workspacePlanMobileCurated;

  // Agrupa features por bloco preservando ordem
  const featuresByBlock = BLOCK_ORDER.map((block) => ({
    block,
    rows: workspaceFeatures.filter((f) => f.block === block)
  })).filter((g) => g.rows.length > 0);

  return (
    <div className="container-shell py-20 sm:py-28 lg:py-32">
      <SectionHeader
        eyebrow="Tabela completa"
        title="Compare todos os planos Workspace."
        description={`${workspaceFeatures.length} recursos · 8 SKUs · sem letrinha miúda.`}
      />

      {/* Mobile expand toggle */}
      <div className="mt-8 md:hidden">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full rounded-md border border-border bg-surface-card px-4 py-3 text-[12.5px] font-bold text-text-strong shadow-soft transition hover:border-brand-500/40"
        >
          {expanded ? 'Ocultar planos secundários' : 'Ver todos os 8 planos →'}
        </button>
        <p className="mt-2 text-center text-[11.5px] text-text-subtle">
          {expanded ? 'Role lateralmente para ver todos.' : 'Mostrando 3 destaques. Toque acima pra ver todos.'}
        </p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface-card shadow-soft">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-border bg-surface-soft">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-surface-soft px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-text-subtle"
              >
                Recurso
              </th>
              {workspacePlanOrder.map((planId) => {
                const plan = planMap.get(planId);
                if (!plan) return null;
                const isMobileVisible = mobileVisiblePlanIds.includes(planId);
                return (
                  <th
                    key={planId}
                    scope="col"
                    className={cn(
                      'px-3 py-3.5 text-center',
                      isMobileVisible ? '' : 'hidden md:table-cell'
                    )}
                  >
                    <PlanHeader plan={plan} />
                  </th>
                );
              })}
            </tr>
            {/* Price row */}
            <tr className="border-b border-border bg-surface-soft/40">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-surface-soft/40 px-4 py-3 text-[12px] font-semibold text-text-muted"
              >
                Valor de tabela
              </th>
              {workspacePlanOrder.map((planId) => {
                const plan = planMap.get(planId);
                if (!plan) return null;
                const isMobileVisible = mobileVisiblePlanIds.includes(planId);
                return (
                  <td
                    key={planId}
                    className={cn(
                      'px-3 py-3 text-center text-[13px] font-bold text-text-strong',
                      isMobileVisible ? '' : 'hidden md:table-cell'
                    )}
                  >
                    {formatPlanPrice(plan.pricePerUser)}
                    <span className="block text-[10.5px] font-normal text-text-subtle">
                      /usuário/mês
                    </span>
                  </td>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {featuresByBlock.map(({ block, rows }) => (
              <RenderBlock
                key={block}
                block={block}
                rows={rows}
                planOrder={workspacePlanOrder}
                mobileVisiblePlanIds={mobileVisiblePlanIds}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={() => openLead('Compare — Workspace')}
          className={btnPrimary('lg')}
        >
          Ainda em dúvida? Falar com um especialista
        </button>
        <p className="text-[11.5px] text-text-subtle">
          Resposta em até 1 dia útil.
        </p>
      </div>
    </div>
  );
}

function PlanHeader({ plan }: { plan: WorkspacePlan }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-text-subtle">
        {plan.tier === 'frontline' ? 'Frontline' : 'Enterprise'}
      </span>
      <span className="text-[12.5px] font-extrabold text-text-strong">
        {plan.shortName}
      </span>
      {plan.recommended ? (
        <span className="mt-0.5 inline-flex rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-brand-600">
          Recomendado
        </span>
      ) : null}
    </div>
  );
}

function RenderBlock({
  block,
  rows,
  planOrder,
  mobileVisiblePlanIds
}: {
  block: FeatureBlock;
  rows: typeof workspaceFeatures;
  planOrder: WorkspacePlanId[];
  mobileVisiblePlanIds: WorkspacePlanId[];
}) {
  return (
    <>
      <tr className="bg-surface-muted/60">
        <td
          colSpan={1 + planOrder.length}
          className="sticky left-0 z-10 bg-surface-muted/60 px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-text-muted"
        >
          {BLOCK_LABEL[block]}
        </td>
      </tr>
      {rows.map((row) => (
        <tr key={row.feature} className="border-b border-border last:border-b-0">
          <th
            scope="row"
            className="sticky left-0 z-10 bg-surface-card px-4 py-3 text-left text-[12.5px] font-medium text-text"
          >
            {row.feature}
          </th>
          {planOrder.map((planId) => {
            const cell = row.values[planId];
            const isMobileVisible = mobileVisiblePlanIds.includes(planId);
            return (
              <td
                key={planId}
                className={cn(
                  'px-3 py-3 text-center',
                  isMobileVisible ? '' : 'hidden md:table-cell'
                )}
              >
                <Cell value={cell} />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

function Cell({ value }: { value: CellValue }) {
  if (value.kind === 'check') {
    return (
      <span aria-label="Incluído" className="inline-flex">
        <Check className="h-4 w-4 text-google-green" />
      </span>
    );
  }
  if (value.kind === 'cross') {
    return (
      <span aria-label="Não incluído" className="inline-flex">
        <X className="h-4 w-4 text-text-subtle/60" />
      </span>
    );
  }
  return (
    <span className="font-mono text-[11.5px] font-semibold text-text">
      {value.value}
    </span>
  );
}
