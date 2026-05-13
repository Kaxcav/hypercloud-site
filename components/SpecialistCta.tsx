'use client';

import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { btnPrimary, btnSecondary } from '@/components/buttons';
import { useLeadDialog } from '@/components/LeadDialogProvider';

type SpecialistCtaProps = {
  id?: string;
  title?: string;
  description?: string;
};

export function SpecialistCta({
  id = 'falar-com-especialista',
  title = 'Vamos sentar à mesa.',
  description = 'Três passos rápidos pra entender seu cenário, seu prazo, e mandar a pessoa certa pra continuar a conversa — em até 1 dia útil.'
}: SpecialistCtaProps) {
  const { open: openLead } = useLeadDialog();

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-border bg-surface-soft py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[300px] w-[80%] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" aria-hidden />

      <div className="container-shell relative max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface-card p-8 shadow-premium sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                Falar com especialista
              </span>
              <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-[44px] lg:leading-[1.05]">
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
                {description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openLead()}
                  className={btnPrimary('lg')}
                >
                  Iniciar conversa
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="https://wa.me/5531992391683?text=Olá,%20quero%20falar%20com%20um%20especialista%20da%20Hypercloud."
                  target="_blank"
                  rel="noreferrer"
                  className={btnSecondary('lg')}
                >
                  <MessageCircle className="h-4 w-4 text-brand-400" />
                  WhatsApp direto
                </a>
              </div>
            </div>

            <ul className="space-y-3 rounded-2xl border border-border bg-surface-soft p-5 sm:p-6">
              {[
                { icon: '01', label: 'Seu cenário em 90 segundos', desc: 'Empresa, porte, setor.' },
                { icon: '02', label: 'O que mais te interessa', desc: 'Workspace, Gemini, Cloud, AppSheet.' },
                { icon: '03', label: 'Resposta em 1 dia útil', desc: 'Especialista preparado pro seu caso.' }
              ].map((step) => (
                <li key={step.icon} className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-[11px] font-bold text-brand-400">
                    {step.icon}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-text-strong">{step.label}</p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-text-muted">{step.desc}</p>
                  </div>
                </li>
              ))}
              <li className="!mt-5 flex items-center gap-2.5 rounded-xl border border-border bg-surface-card px-3.5 py-2.5">
                <Phone className="h-3.5 w-3.5 text-brand-400" />
                <p className="text-[12.5px] text-text-muted">
                  Prefere ligar? <span className="font-bold text-text-strong">(31) 4042-4483</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
