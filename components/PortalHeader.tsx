'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from '@/components/ThemeToggle';

interface PortalHeaderProps {
  userName?: string | null;
}

export function PortalHeader({ userName }: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-card/80 backdrop-blur-xl border-t-4 border-t-brand-500">
      <div className="container-shell flex h-[72px] items-center justify-between lg:h-20">
        <div className="flex items-center gap-4">
          <Link href="/portal-do-cliente" aria-label="Portal do Cliente" className="shrink-0">
            <Image
              src="/logo/lg.hypercloud_horizontal.png"
              alt="Hypercloud"
              width={220}
              height={56}
              className="block h-8 w-auto sm:h-9 dark:hidden"
              priority
            />
            <Image
              src="/logo/lg.hypercloud_vetor-branca.png"
              alt=""
              aria-hidden="true"
              width={220}
              height={56}
              className="hidden h-8 w-auto sm:h-9 dark:block"
              priority
            />
          </Link>
          <span className="hidden h-5 w-px bg-border sm:block" />
          <span className="hidden text-[13px] font-bold uppercase tracking-[0.18em] text-text-subtle sm:block">
            Portal do Cliente
          </span>
        </div>

        <div className="flex items-center gap-4">
          {userName && (
            <span className="hidden text-[13px] font-medium text-text-strong sm:block">
              Olá, <span className="font-bold">{userName.split(' ')[0]}</span>
            </span>
          )}
          {/* Navbar e Footer institucionais não montam aqui — este é o único
              caminho de volta ao site público. */}
          <Link
            href="/"
            className="hidden items-center gap-1.5 text-[13px] font-semibold text-text-muted transition hover:text-text-strong sm:inline-flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Site Hypercloud
          </Link>
          <ThemeToggle />
          {userName && (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface-muted px-4 text-[13px] font-semibold text-text-muted transition hover:border-brand-500/40 hover:text-text-strong"
            >
              Sair
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
