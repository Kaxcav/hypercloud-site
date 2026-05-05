'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/#solucoes', label: 'Soluções' },
  { href: '/#comparador', label: 'Comparar Planos' },
  { href: '/setor-publico', label: 'Setor Público' },
  { href: '/#parceiros', label: 'Parceiros Google' },
  { href: '/portal-do-cliente', label: 'Portal do Cliente' },
  { href: '/suporte', label: 'Suporte' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="container-shell flex h-20 items-center gap-4">
        <Link href="/" className="shrink-0" aria-label="Hypercloud" onClick={() => setOpen(false)}>
          <Image src="/logo/lg.hypercloud_horizontal.png" alt="Hypercloud" width={220} height={56} className="h-10 w-auto sm:h-11" priority />
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

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-600 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-2 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-slate-200 pt-4">
              <Link
                href="/suporte"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
              >
                Abrir Chamado
              </Link>
              <Link
                href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20com%20um%20especialista"
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand-gradient px-4 py-3 text-center text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
              >
                Falar com Especialista
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
