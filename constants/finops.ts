// constants/finops.ts
//
// Parâmetros da estimativa da calculadora FinOps.
//
// {/* CONFIRMAR: faixa e fórmula reais de FinOps */}
// A faixa de 15% a 30% veio do brief comercial e ainda NÃO foi validada pela
// engenharia. Enquanto não for, a calculadora se apresenta como estimativa de
// referência, nunca como promessa contratual. Trocar os dois números abaixo
// reajusta toda a superfície — não há percentual espalhado em componente.
export const FINOPS_SAVING_RANGE = {
  min: 0.15,
  max: 0.3
} as const;

// {/* CONFIRMAR: se a economia varia por provedor. Hoje o multiplicador é 1
//     para todos, ou seja, o provedor é registrado no lead mas não altera a
//     conta exibida. */}
export const PROVIDER_MULTIPLIER: Record<string, number> = {
  'google-cloud': 1,
  aws: 1,
  azure: 1,
  'google-workspace': 1,
  outro: 1
};

/**
 * Estimativa anual de economia, em BRL.
 * Usa o teto da faixa porque a copy fala "economizar até R$ X/ano".
 */
export function estimateAnnualSaving(monthlyMidpoint: number, provider?: string) {
  const multiplier = (provider && PROVIDER_MULTIPLIER[provider]) || 1;
  return Math.round(monthlyMidpoint * 12 * FINOPS_SAVING_RANGE.max * multiplier);
}

export const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});
