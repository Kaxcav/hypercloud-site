'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error]', error);
  }, [error]);

  return (
    // Fora dos route groups, como o not-found: sem Navbar/Footer, autossuficiente.
    <main className="flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <div className="container-shell max-w-md">
        <Link href="/" aria-label="Hypercloud" className="mb-10 inline-block">
          <Image
            src="/logo/lg.hypercloud_horizontal.png"
            alt="Hypercloud"
            width={220}
            height={56}
            className="mx-auto block h-9 w-auto dark:hidden"
          />
          <Image
            src="/logo/lg.hypercloud_vetor-branca.png"
            alt=""
            aria-hidden="true"
            width={220}
            height={56}
            className="mx-auto hidden h-9 w-auto dark:block"
          />
        </Link>

        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-text-strong">
          Ocorreu um erro inesperado
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Pedimos desculpas pelo inconveniente. Você pode tentar recarregar esta página ou voltar para a página inicial.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-bold text-white shadow-brand"
          >
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-5 py-2.5 text-sm font-bold text-text hover:text-text-strong"
          >
            Página Inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
