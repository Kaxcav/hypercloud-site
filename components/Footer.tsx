import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ShieldCheck } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-soft">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <Image
            src="/logo/lg.hypercloud_horizontal.png"
            alt="Hypercloud"
            width={220}
            height={56}
            className="h-10 w-auto dark:brightness-0 dark:invert"
          />
          <p className="mt-5 max-w-sm text-[13px] leading-7 text-text-muted">
            Google Workspace, Google Workspace with Gemini, Google Cloud e AppSheet com foco em performance, autoridade e transformação digital para empresas e setor público.
          </p>

          <ul className="mt-6 space-y-3 text-[13px] text-text-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>Contagem · MG · Atendimento nacional</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href="tel:3140424483" className="transition hover:text-brand-400">
                (31) 4042-4483
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <a href="mailto:contato@hypercloud.com.br" className="transition hover:text-brand-400">
                contato@hypercloud.com.br
              </a>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {[
              { href: 'https://www.linkedin.com/', label: 'LinkedIn', Icon: Linkedin },
              { href: 'https://www.instagram.com/', label: 'Instagram', Icon: Instagram },
              { href: 'https://www.facebook.com/', label: 'Facebook', Icon: Facebook }
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-card text-text-muted transition hover:border-brand-500/40 hover:text-brand-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Soluções</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/solucoes/google-workspace" className="transition hover:text-brand-400">Google Workspace</Link></li>
            <li><Link href="/solucoes/gemini-enterprise" className="transition hover:text-brand-400">Gemini Enterprise</Link></li>
            <li><Link href="/solucoes/google-cloud" className="transition hover:text-brand-400">Google Cloud</Link></li>
            <li><Link href="/solucoes/appsheet" className="transition hover:text-brand-400">AppSheet</Link></li>
            <li><Link href="/#comparador" className="transition hover:text-brand-400">Comparar Planos</Link></li>
            <li><Link href="/cases" className="transition hover:text-brand-400">Cases e Clientes</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Atendimento</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/sobre" className="transition hover:text-brand-400">Sobre a Hypercloud</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-brand-400">Setor Público · ATAs</Link></li>
            <li><Link href="/portal-do-cliente" className="transition hover:text-brand-400">Portal do Cliente</Link></li>
            <li><Link href="/suporte" className="transition hover:text-brand-400">Suporte e Chamados</Link></li>
            <li><a href="mailto:comercial@hypercloud.com.br" className="transition hover:text-brand-400">comercial@hypercloud.com.br</a></li>
            <li><a href="mailto:licitacoes@hypercloud.com.br" className="transition hover:text-brand-400">licitacoes@hypercloud.com.br</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Compliance & Legal</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/setor-publico" className="transition hover:text-brand-400">Programa de Integridade</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-brand-400">Código de Ética</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-brand-400">Canal de Ouvidoria</Link></li>
            <li><Link href="/" className="transition hover:text-brand-400">Política de Privacidade</Link></li>
            <li><Link href="/" className="transition hover:text-brand-400">Termos de Uso</Link></li>
          </ul>

          <div className="mt-6 flex items-center gap-2 rounded-md border border-border bg-surface-card px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
            Partnered with Google Cloud
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col items-start justify-between gap-3 py-5 text-[12px] text-text-subtle sm:flex-row sm:items-center">
          <p>© {year} Hypercloud · Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <span>CNPJ XX.XXX.XXX/0001-XX</span>
            <span className="hidden sm:inline">·</span>
            <span>Feito no Brasil</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
