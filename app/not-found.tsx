import Link from 'next/link';
import { ArrowLeft, Home, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="container-shell max-w-lg">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-2xl font-extrabold text-brand-400">
          404
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-3 text-base leading-relaxed text-text-muted">
          O conteúdo que você procura pode ter sido movido ou não está mais disponível. Não perca sua cotação por isso.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-3 text-sm font-bold text-white shadow-brand"
          >
            <Home className="h-4 w-4" />
            Voltar para o Início
          </Link>
          <Link
            href="/#planos"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-5 py-3 text-sm font-bold text-text hover:text-text-strong"
          >
            Ver Planos Workspace
          </Link>
        </div>
      </div>
    </main>
  );
}
