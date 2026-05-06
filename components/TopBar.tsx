import Link from 'next/link';
import { Mail, Phone, Lock, Linkedin } from 'lucide-react';

export function TopBar() {
  return (
    <div className="hidden border-b border-border bg-surface-muted/60 lg:block">
      <div className="container-shell flex h-9 items-center justify-between text-[12px] font-medium text-text-muted">
        <div className="flex items-center gap-6">
          <a
            href="tel:3140424483"
            className="inline-flex items-center gap-2 transition hover:text-brand-400"
          >
            <Phone className="h-3.5 w-3.5" />
            (31) 4042-4483
          </a>
          <a
            href="mailto:contato@hypercloud.com.br"
            className="inline-flex items-center gap-2 transition hover:text-brand-400"
          >
            <Mail className="h-3.5 w-3.5" />
            contato@hypercloud.com.br
          </a>
          <span className="hidden items-center gap-2 text-text-subtle xl:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Atendimento nacional · Contagem · MG
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/setor-publico"
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle transition hover:text-brand-400"
          >
            Setor Público
          </Link>
          <span className="h-3 w-px bg-border" aria-hidden />
          <Link
            href="/suporte"
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle transition hover:text-brand-400"
          >
            Suporte
          </Link>
          <span className="h-3 w-px bg-border" aria-hidden />
          <Link
            href="/portal-do-cliente"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-subtle transition hover:text-brand-400"
          >
            <Lock className="h-3 w-3" />
            Portal do Cliente
          </Link>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text-subtle transition hover:text-brand-400"
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
