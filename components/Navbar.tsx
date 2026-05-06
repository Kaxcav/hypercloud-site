'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Lock, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { TopBar } from '@/components/TopBar';

const links = [
  { href: '/#solucoes', label: 'Soluções' },
  { href: '/#comparador', label: 'Comparar Planos' },
  { href: '/setor-publico', label: 'Setor Público' },
  { href: '/#parceiros', label: 'Parceiros Google' },
  { href: '/suporte', label: 'Suporte' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      <TopBar />

      <div className="container-shell flex h-20 items-center gap-8 lg:h-[88px]">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Hypercloud"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo/lg.hypercloud_horizontal.png"
            alt="Hypercloud"
            width={220}
            height={56}
            className="h-9 w-auto sm:h-10 lg:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-semibold text-slate-700 transition hover:text-brand-600"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <Link
            href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20com%20um%20especialista"
            className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-2.5 text-[13px] font-semibold text-white shadow-brand transition hover:opacity-95"
          >
            Falar com Especialista
            <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-600 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200/70 bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-slate-200/70 pt-4">
              <Link
                href="/portal-do-cliente"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
              >
                <Lock className="h-4 w-4" />
                Portal do Cliente
              </Link>
              <Link
                href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20com%20um%20especialista"
                onClick={() => setOpen(false)}
                className="rounded-md bg-brand-gradient px-4 py-3 text-center text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
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
