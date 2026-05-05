'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';

export function PortalLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/dashboard'
    });

    if (result?.error) {
      setError('Credenciais inválidas. Tente novamente.');
      setLoading(false);
    }
  }

  async function onGoogleLogin() {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onGoogleLogin}
        disabled={googleLoading}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">G</span>
        {googleLoading ? 'Redirecionando...' : 'Entrar com Google'}
      </button>

      <div className="relative py-1 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        <span className="relative z-10 bg-white px-3">ou use suas credenciais</span>
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-slate-200" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            E-mail corporativo
          </label>
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <Mail className="mr-3 h-4 w-4 text-slate-400" />
            <input
              id="email"
              type="email"
              placeholder="voce@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
            Senha
          </label>
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <LockKeyhole className="mr-3 h-4 w-4 text-slate-400" />
            <input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-brand transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Entrando...' : 'Entrar no Portal'}
        </button>
      </form>

      <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600">
        <Link href="mailto:suporte@hypercloud.com.br?subject=Esqueci%20minha%20senha" className="hover:text-brand-600">
          Esqueci minha senha
        </Link>
        <Link href="/suporte" className="hover:text-brand-600">
          Abrir chamado sem login
        </Link>
      </div>
    </div>
  );
}
