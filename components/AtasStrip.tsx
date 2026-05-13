import Link from 'next/link';
import { ArrowUpRight, ScrollText, ShieldCheck } from 'lucide-react';
import { btnTertiary } from '@/components/buttons';

const atas = [
  {
    code: 'ARP CIMPAR',
    title: 'Software · Workspace',
    href: 'https://hypercloud.com.br/atas/arp_cimpar-software.pdf'
  },
  {
    code: 'CIASC-SC',
    title: 'Documento institucional',
    href: 'https://hypercloud.com.br/atas/ciasc-sc.pdf'
  }
];

const googleCredentials = [
  { label: 'Google Cloud', tier: 'Select Technology Partner' },
  { label: 'Google Cloud', tier: 'Select Services Partner' },
  { label: 'Google Workspace', tier: 'Premier Co-Sell Partner' },
  { label: 'Google Workspace', tier: 'Select Technology Partner' }
];

export function AtasStrip() {
  return (
    <section
      aria-label="ATAs vigentes e credenciais Google"
      className="relative border-b border-border bg-surface-card"
    >
      <div className="container-shell py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          {/* ATAs */}
          <div>
            <div className="flex items-center gap-2.5">
              <ScrollText className="h-4 w-4 text-brand-500" />
              <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-brand-600">
                ATAs vigentes · Setor Público
              </p>
            </div>

            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-text-strong sm:text-2xl">
              Pronto para adesão imediata.{' '}
              <span className="font-extrabold text-gradient-brand">
                Sem nova licitação.
              </span>
            </h2>

            <ul className="mt-5 space-y-2.5">
              {atas.map((ata) => (
                <li key={ata.code}>
                  <a
                    href={ata.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-soft px-4 py-3.5 transition hover:-translate-y-1 hover:border-brand-500/40 hover:bg-surface-card hover:shadow-medium"
                  >
                    <div className="min-w-0">
                      <p className="text-[12px] font-mono font-bold uppercase tracking-[0.12em] text-brand-600">
                        {ata.code}
                      </p>
                      <p className="mt-0.5 text-[13.5px] font-bold text-text-strong">
                        {ata.title}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-text-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-500" />
                  </a>
                </li>
              ))}
            </ul>

            <Link href="/setor-publico" className={btnTertiary('mt-4')}>
              Ver todas as ATAs e caminhos de aquisição
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Google credentials */}
          <div className="lg:border-l lg:border-border lg:pl-12">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-brand-500" />
              <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
                Credenciais Google · oficiais
              </p>
            </div>

            <h2 className="mt-3 text-xl font-extrabold tracking-tight text-text-strong sm:text-2xl">
              Premier Partner com 4 frentes ativas.
            </h2>

            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {googleCredentials.map((cred) => (
                <li
                  key={`${cred.label}-${cred.tier}`}
                  className="rounded-xl border border-border bg-surface-soft px-3.5 py-3"
                >
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-text-subtle">
                    {cred.label}
                  </p>
                  <p className="mt-1 text-[13px] font-bold text-text-strong">
                    {cred.tier}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
