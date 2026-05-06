import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/lead';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    requests.set(ip, recent);
    return true;
  }
  recent.push(now);
  requests.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'anonymous';

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 });
  }

  const result = leadFormSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: result.error.flatten() },
      { status: 422 }
    );
  }

  // honeypot
  if (result.data.website && result.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const lead = result.data;

  // Tentativa de envio via Resend, se disponível
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFY_EMAIL ?? 'comercial@hypercloud.com.br';

  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Hypercloud <noreply@hypercloud.com.br>',
          to: [toEmail],
          subject: `Novo lead — ${lead.company} (${lead.sector})`,
          text: formatLeadEmail(lead)
        })
      });
    } catch (error) {
      console.error('[lead] resend error', error);
    }
  } else {
    console.info('[lead] received (Resend ausente, modo dev):', {
      company: lead.company,
      email: lead.email,
      interests: lead.interests
    });
  }

  return NextResponse.json({ ok: true });
}

function formatLeadEmail(lead: ReturnType<typeof leadFormSchema.parse>) {
  return [
    `Empresa: ${lead.company}`,
    `Porte: ${lead.size}`,
    `Setor: ${lead.sector}`,
    `Interesses: ${lead.interests.join(', ')}`,
    `Contato: ${lead.name} <${lead.email}> · ${lead.phone}`,
    lead.context ? `Contexto: ${lead.context}` : null,
    lead.notes ? `Observações: ${lead.notes}` : null
  ]
    .filter(Boolean)
    .join('\n');
}
