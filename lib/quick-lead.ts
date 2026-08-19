// lib/quick-lead.ts
// Envio das capturas curtas (quiz de 2 passos e calculadora FinOps).
// Reaproveita a mesma rota `/api/lead` do dialog completo — inclusive o
// rate limit, o honeypot e o roteamento de e-mail.

import type { QuickLeadValues } from '@/lib/lead';

export type QuickLeadState = 'idle' | 'sending' | 'success' | 'error' | 'rate-limited';

/** Atribuição de marketing gravada pelo site em sessionStorage. */
function readAttribution(): Record<string, string> {
  try {
    const stored = sessionStorage.getItem('hypercloud_attribution');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export async function submitQuickLead(
  values: QuickLeadValues
): Promise<Exclude<QuickLeadState, 'idle' | 'sending'>> {
  const payload = {
    ...values,
    ...readAttribution(),
    landingPage: typeof window !== 'undefined' ? window.location.pathname : undefined
  };

  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.status === 429) return 'rate-limited';
    if (!res.ok) return 'error';
    return 'success';
  } catch (error) {
    console.error('[quick-lead] submit error', error);
    return 'error';
  }
}
