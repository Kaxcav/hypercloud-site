import Image from 'next/image';
import Link from 'next/link';

const links = [
  { href: '/#solucoes', label: 'Soluções' },
  { href: '/#comparador', label: 'Comparar Planos' },
  { href: '/setor-publico', label: 'Setor Público' },
  { href: '/#parceiros', label: 'Parceiros Google' },
  { href: '/portal-do-cliente', label: 'Portal do Cliente' },
  { href: '/suporte', label: 'Suporte' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-20 items-center gap-8">
        <Link href="/" className="shrink-0" aria-label="Hypercloud">
          <Image
            src="/logo/lg.hypercloud_horizontal.png"
            alt="Hypercloud"
            width={220}
            height={56}
            className="h-11 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 transition hover:text-brand-600">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link
            href="/suporte"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
          >
            Abrir Chamado
          </Link>
          <Link
            href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20com%20um%20especialista"
            className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
          >
            Falar com Especialista
          </Link>
        </div>
      </div>
    </header>
  );
}
