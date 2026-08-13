import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/lead';
import { company } from '@/constants/company';

export const dynamic = 'force-dynamic';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  // Limpeza preguiçosa de entradas expiradas para prevenir vaza de memória
  for (const [key, timestamps] of requests.entries()) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      requests.delete(key);
    } else {
      requests.set(key, valid);
    }
  }

  const recent = (requests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
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

  // Honeypot: responder 200 silenciosamente sem processar bot
  if (result.data.website && result.data.website.trim().length > 0) {
    console.warn('[lead] Honeypot capturado de IP:', ip);
    return NextResponse.json({ ok: true });
  }

  const lead = result.data;
  const timestamp = new Date().toISOString();

  // Persistência em log estruturado (fallback confiável de auditoria)
  console.log('[lead][persisted]', JSON.stringify({ timestamp, ip, lead }));

  // Roteamento inteligente de e-mail por setor
  const defaultToEmail =
    lead.sector === 'publico' ? company.emails.licitacoes : company.emails.comercial;
  const toEmail = process.env.LEAD_NOTIFY_EMAIL ?? defaultToEmail;
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Hypercloud Leads <noreply@hypercloud.com.br>',
          reply_to: lead.email,
          to: [toEmail],
          subject: `[LEAD] ${lead.company} (${lead.sector.toUpperCase()}) — ${lead.name}`,
          text: formatLeadEmail(lead, timestamp)
        })
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error('[lead] Resend API retornou erro:', resendRes.status, errorText);
        return NextResponse.json(
          { ok: false, error: 'email-delivery-failed', details: errorText },
          { status: 502 }
        );
      }
    } catch (error) {
      console.error('[lead] Exceção no envio via Resend:', error);
      return NextResponse.json(
        { ok: false, error: 'email-exception' },
        { status: 502 }
      );
    }
  } else {
    console.info('[lead] Modo DEV (sem RESEND_API_KEY). Lead recebido e registrado em log.');
  }

  return NextResponse.json({ ok: true });
}

function formatLeadEmail(lead: ReturnType<typeof leadFormSchema.parse>, timestamp: string) {
  return [
    `=== NOVO LEAD RECEBIDO ===`,
    `Data/Hora: ${timestamp}`,
    ``,
    `Empresa: ${lead.company}`,
    `Porte: ${lead.size}`,
    `Setor: ${lead.sector}`,
    `Interesses: ${lead.interests.join(', ')}`,
    ``,
    `Contato: ${lead.name}`,
    `E-mail: ${lead.email}`,
    `Telefone: ${lead.phone}`,
    `Consentimento LGPD: Aceito em ${timestamp} (versão v1.0)`,
    ``,
    lead.context ? `Contexto / Observações:\n${lead.context}\n` : null,
    `=== ATRIBUIÇÃO E NAVEGAÇÃO ===`,
    lead.landingPage ? `Página de Origem: ${lead.landingPage}` : null,
    lead.referrer ? `Referrer: ${lead.referrer}` : null,
    lead.utm_source ? `UTM Source: ${lead.utm_source}` : null,
    lead.utm_medium ? `UTM Medium: ${lead.utm_medium}` : null,
    lead.utm_campaign ? `UTM Campaign: ${lead.utm_campaign}` : null,
    lead.utm_term ? `UTM Term: ${lead.utm_term}` : null,
    lead.utm_content ? `UTM Content: ${lead.utm_content}` : null,
    lead.gclid ? `Google Click ID (gclid): ${lead.gclid}` : null
  ]
    .filter(Boolean)
    .join('\n');
}

