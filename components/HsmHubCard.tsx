'use client';

import { useState, useEffect } from 'react';
import { LifeBuoy, ShieldCheck, Headphones, ArrowRight, Loader2, AlertCircle, LockKeyhole } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { btnPrimary } from '@/components/ui/buttons';
import { portalUrls } from '@/constants/portals';

interface HsmKpis {
  abertos: number;
  emAndamento: number;
  aguardando: number;
  resolvidos: number;
}

type HsmState =
  | { status: 'loading' }
  | { status: 'ok'; kpis: HsmKpis }
  | { status: 'no_access'; message: string; cta: string }
  | { status: 'login_google'; message: string; cta: string }
  | { status: 'error'; message: string };

export function HsmHubCard() {
  const [state, setState] = useState<HsmState>({ status: 'loading' });

  useEffect(() => {
    let isMounted = true;
    async function loadSummary() {
      try {
        const res = await fetch('/api/hub/hsm/summary', { cache: 'no-store' });
        if (!res.ok) {
          if (isMounted) setState({ status: 'error', message: 'Indisponível no momento' });
          return;
        }
        const data = await res.json();
        if (isMounted) {
          if (data.status === 'ok' && data.kpis) {
            setState({ status: 'ok', kpis: data.kpis });
          } else if (data.status === 'no_access') {
            setState({
              status: 'no_access',
              message: data.message ?? 'E-mail sem cadastro ativo no HSM.',
              cta: data.cta ?? 'Solicitar Acesso'
            });
          } else if (data.status === 'login_google') {
            setState({
              status: 'login_google',
              message: data.message ?? 'Entre com Google para ver seus chamados.',
              cta: data.cta ?? 'Entrar com Google'
            });
          } else {
            setState({ status: 'error', message: data.message ?? 'Erro ao carregar dados' });
          }
        }
      } catch {
        if (isMounted) setState({ status: 'error', message: 'Erro de conexão com o servidor' });
      }
    }
    loadSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  const hsmUrl = portalUrls.hsm;

  return (
    <Card className="glass flex flex-col rounded-2xl shadow-premium transition hover:-translate-y-1 hover:border-brand-500/30">
      <CardHeader>
        <div className="mb-2 inline-flex w-fit rounded-xl bg-brand-gradient-soft p-3 text-brand-500">
          <LifeBuoy className="h-6 w-6" />
        </div>
        <CardTitle className="text-balance">Gestão de Suporte & Chamados (HSM)</CardTitle>
        <CardDescription>
          Abra novos chamados, acompanhe o SLA de atendimento, acesse a base de conhecimento e fale com nosso suporte.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-4">
        {state.status === 'loading' && (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-muted/60 p-4 animate-pulse">
            <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
            <span className="text-xs font-medium text-text-muted">Carregando indicadores do HSM...</span>
          </div>
        )}

        {state.status === 'ok' && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface-card p-2.5 text-center shadow-soft">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-subtle">Abertos</span>
              <p className="mt-1 text-xl font-extrabold tabular-nums text-amber-500">{state.kpis.abertos}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-2.5 text-center shadow-soft">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-subtle">Em Andamento</span>
              <p className="mt-1 text-xl font-extrabold tabular-nums text-sky-500">{state.kpis.emAndamento}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-2.5 text-center shadow-soft">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-subtle">Aguardando</span>
              <p className="mt-1 text-xl font-extrabold tabular-nums text-brand-500">{state.kpis.aguardando}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-card p-2.5 text-center shadow-soft">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-subtle">Resolvidos</span>
              <p className="mt-1 text-xl font-extrabold tabular-nums text-emerald-500">{state.kpis.resolvidos}</p>
            </div>
          </div>
        )}

        {state.status === 'no_access' && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-600 dark:text-amber-400">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Sem cadastro ativo no HSM</span>
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed opacity-90">{state.message}</p>
          </div>
        )}

        {state.status === 'login_google' && (
          <div className="rounded-xl border border-border bg-surface-muted/80 p-3.5 text-xs text-text-muted">
            <div className="flex items-center gap-2 font-bold text-text-strong">
              <LockKeyhole className="h-4 w-4 text-brand-500 shrink-0" />
              <span>Requer login com Google</span>
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed">{state.message}</p>
          </div>
        )}

        {state.status === 'error' && (
          <div className="rounded-xl border border-border bg-surface-muted/60 p-3 text-xs text-text-muted">
            <p>{state.message}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="secondary">
            <ShieldCheck className="h-3 w-3" />
            Acesso seguro
          </Badge>
          <Badge variant="secondary">
            <Headphones className="h-3 w-3" />
            Suporte dedicado
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center gap-3">
        <a
          href={hsmUrl}
          target="_blank"
          rel="noreferrer"
          className={btnPrimary('lg', 'w-full sm:w-auto active:scale-[0.98]')}
        >
          <LifeBuoy className="h-4 w-4" />
          Acessar Suporte HSM
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </CardFooter>
    </Card>
  );
}
