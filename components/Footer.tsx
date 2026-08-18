import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { company } from '@/constants/company';

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
            className="block h-10 w-auto dark:hidden"
          />
          <Image
            src="/logo/lg.hypercloud_vetor-branca.png"
            alt=""
            aria-hidden="true"
            width={220}
            height={56}
            className="hidden h-10 w-auto dark:block"
          />
          <p className="mt-5 max-w-sm text-[13px] leading-7 text-text-muted">
            Google Workspace, Workspace with Gemini, Google Cloud e AppSheet com foco em performance, autoridade e transformação digital para empresas e setor público.
          </p>

          <ul className="mt-6 space-y-3 text-[13px] text-text-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-text-subtle" />
              <span>{company.address.city} · {company.address.state} · {company.address.coverage}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-text-subtle" />
              <a href={company.phone.href} className="transition hover:text-text-strong">
                {company.phone.display}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-text-subtle" />
              <a href={`mailto:${company.emails.contato}`} className="transition hover:text-text-strong">
                {company.emails.contato}
              </a>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {[
              { href: company.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
              { href: company.social.instagram, label: 'Instagram', Icon: Instagram },
              { href: company.social.facebook, label: 'Facebook', Icon: Facebook }
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-card text-text-muted transition hover:border-brand-500/40 hover:text-text-strong"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Soluções</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/solucoes/google-workspace" className="transition hover:text-text-strong">Google Workspace</Link></li>
            <li><Link href="/solucoes/gemini-enterprise" className="transition hover:text-text-strong">Gemini Enterprise</Link></li>
            <li><Link href="/solucoes/google-cloud" className="transition hover:text-text-strong">Google Cloud</Link></li>
            <li><Link href="/solucoes/appsheet" className="transition hover:text-text-strong">AppSheet</Link></li>
            <li><Link href="/#planos" className="transition hover:text-text-strong">Planos</Link></li>
            <li><Link href="/#compare-all" className="transition hover:text-text-strong">Comparar Planos</Link></li>
            <li><Link href="/cases" className="transition hover:text-text-strong">Cases e Credenciais</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Atendimento</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/sobre" className="transition hover:text-text-strong">Sobre a Hypercloud</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Setor Público · ATAs</Link></li>
            <li><Link href="/portal-do-cliente" className="transition hover:text-text-strong">Portal do Cliente</Link></li>
            <li><Link href="/suporte" className="transition hover:text-text-strong">Suporte e Chamados</Link></li>
            <li><a href={`mailto:${company.emails.comercial}`} className="transition hover:text-text-strong">{company.emails.comercial}</a></li>
            <li><a href={`mailto:${company.emails.licitacoes}`} className="transition hover:text-text-strong">{company.emails.licitacoes}</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-strong">Compliance & Legal</h3>
          <ul className="space-y-3 text-[13px] text-text-muted">
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Programa de Integridade</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Código de Ética</Link></li>
            <li><Link href="/setor-publico" className="transition hover:text-text-strong">Canal de Ouvidoria</Link></li>
            <li><Link href="/politica-de-privacidade" className="transition hover:text-text-strong">Política de Privacidade</Link></li>
            <li><Link href="/termos-de-uso" className="transition hover:text-text-strong">Termos de Uso</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell py-8 text-center text-[13px] leading-relaxed text-text-muted md:text-left">
          <p>
            <strong className="font-medium text-text-strong">Nosso Compromisso com Sua Empresa:</strong> "Se identificarmos que uma solução mais simples ou mais barata atende perfeitamente sua demanda, nós seremos os primeiros a te recomendar essa opção."
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col items-start justify-between gap-3 py-5 text-[12px] text-text-subtle sm:flex-row sm:items-center">
          <p className="flex items-center gap-2">
            {/* Google 4-color dot row — assinatura visual */}
            <span className="flex items-center gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-google-blue" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-red" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-yellow" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-green" />
            </span>
            <span>© {year} {company.legalName} · Premier Google Cloud Partner</span>
          </p>
          <p className="flex items-center gap-2">
            <span>CNPJ {company.cnpj}</span>
            <span className="hidden sm:inline">·</span>
            <span>Feito no Brasil</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

