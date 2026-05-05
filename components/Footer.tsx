import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-14">
        <div>
          <Image src="/logo/lg.hypercloud_horizontal.png" alt="Hypercloud" width={220} height={56} className="h-10 w-auto sm:h-11" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
            Google Workspace, Google Workspace with Gemini, Google Cloud e AppSheet com foco em performance, autoridade e transformação digital.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Produtos</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <Link href="/solucoes/google-workspace" className="block hover:text-brand-600">Google Workspace</Link>
            <Link href="/solucoes/gemini-enterprise" className="block hover:text-brand-600">Google Workspace with Gemini</Link>
            <Link href="/solucoes/google-cloud" className="block hover:text-brand-600">Google Cloud</Link>
            <Link href="/solucoes/appsheet" className="block hover:text-brand-600">AppSheet</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Atendimento</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <Link href="/setor-publico" className="block hover:text-brand-600">Setor Público</Link>
            <Link href="/portal-do-cliente" className="block hover:text-brand-600">Portal do Cliente</Link>
            <Link href="/suporte" className="block hover:text-brand-600">Suporte</Link>
            <a href="mailto:comercial@hypercloud.com.br" className="block hover:text-brand-600">comercial@hypercloud.com.br</a>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contato</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <a href="mailto:contato@hypercloud.com.br" className="block hover:text-brand-600">contato@hypercloud.com.br</a>
            <a href="tel:3140424483" className="block hover:text-brand-600">(31) 4042-4483</a>
            <p>Contagem · MG · Atendimento nacional</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
