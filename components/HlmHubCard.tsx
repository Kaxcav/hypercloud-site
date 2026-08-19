'use client';

import { useState, useEffect } from 'react';
import { KeyRound, ShieldCheck, Headphones, ArrowRight, Loader2, AlertCircle, LockKeyhole, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { btnPrimary } from '@/components/ui/buttons';
import { portalUrls } from '@/constants/portals';

interface HlmTotals {
  totalLicenses: number;
  assigned: number;
  available: number;
  byProduct?: Array<{
    productId: string;
    productName: string;
    totalLicenses: number;
    assigned: number;
    available: number;
  }>;
}

interface HlmSummaryData {
  scope?: {
    role: string;
    clientCount: number;
  };
  totals: HlmTotals;
}

type HlmState =
  | { status: 'loading' }
  | { status: 'ok'; resumo: HlmSummaryData }
  | { status: 'no_access'; message: string; cta: string }
  | { status: 'login_google'; message: string; cta: string }
  | { status: 'error'; message: string };

export function HlmHubCard() {
  const [state, setState] = useState<HlmState>({ status: 'loading' });

  useEffect(() => {
    let isMounted = true;
    async function loadSummary() {
      try {
        const res = await fetch('/api/hub/hlm/summary', { cache: 'no-store' });
        if (!res.ok) {
          if (isMounted) setState({ status: 'error', message: 'Serviço de licenças indisponível' });
          return;
        }
        const data = await res.json();
        if (isMounted) {
          if (data.status === 'ok' && data.resumo) {
            setState({ status: 'ok', resumo: data.resumo });
          } else if (data.status === 'no_access') {
            setState({
              status: 'no_access',
              message: data.message ?? 'E-mail sem perfil ativo no HLM.',
              cta: data.cta ?? 'Solicitar Acesso às Licenças'
            });
          } else if (data.status === 'login_google') {
            setState({
              status: 'login_google',
              message: data.message ?? 'Entre com Google para ver suas licenças.',
              cta: data.cta ?? 'Entrar com Google'
            });
          } else {
            setState({ status: 'error', message: data.message ?? 'Erro ao carregar licenças' });
          }
        }
      } catch {
        if (isMounted) setState({ status: 'error', message: 'Erro de conexão com o HLM' });
      }
    }
    loadSummary();
    return () => {
      isMounted = false;
    };
  }, []);

  const hlmUrl = portalUrls.hlm;

  return (
    <Card className="glass flex flex-col rounded-2xl shadow-premium transition hover:-translate-y-1 hover:border-brand-500/30">
      <CardHeader>
        <div className="mb-2 inline-flex w-fit rounded-xl bg-brand-gradient-soft p-3 text-brand-500">
          <KeyRound className="h-6 w-6" />
        </div>
        <CardTitle className="text-balance">Gestão de Licenças & Subscrições (HLM)</CardTitle>
        <CardDescription>
          Gerencie suas licenças ativas, acompanhe renovações do Google Workspace, limites de usuários e faturamento.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-4">
        {state.status === 'loading' && (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-muted/60 p-4 animate-pulse">
            <Loader2 className="h-5 w-5 animate-spin text-brand-500" />
            <span className="text-xs font-medium text-text-muted">Carregando resumo de licenças HLM...</span>
          </div>
        )}

        {state.status === 'ok' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-border bg-surface-card p-2.5 text-center shadow-soft">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-subtle">Contratadas</span>
                <p className="mt-1 text-xl font-extrabold tabular-nums text-text-strong">
                  {state.resumo.totals.totalLicenses}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-card p-2.5 text-center shadow-soft">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-subtle">Atribuídas</span>
                <p className="mt-1 text-xl font-extrabold tabular-nums text-emerald-500">
                  {state.resumo.totals.assigned}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface-card p-2.5 text-center shadow-soft">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-subtle">Disponíveis</span>
                <p className="mt-1 text-xl font-extrabold tabular-nums text-brand-500">
                  {state.resumo.totals.available}
                </p>
              </div>
            </div>

            {/* Gamificação: Barra de progresso de atribuição */}
            {state.resumo.totals.totalLicenses > 0 && (
              <div className="rounded-xl border border-border bg-surface-soft p-3">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-subtle">Taxa de adoção</span>
                  <span className="text-xs font-bold text-text-strong">
                    {Math.round((state.resumo.totals.assigned / state.resumo.totals.totalLicenses) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out"
                    style={{ width: `${Math.round((state.resumo.totals.assigned / state.resumo.totals.totalLicenses) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Gamificação: Próxima ação sugerida */}
            {state.resumo.totals.available > 0 ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400">
                <p className="font-bold flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5" /> Ação sugerida</p>
                <p className="mt-1 text-[11.5px] leading-relaxed opacity-90">
                  Você possui {state.resumo.totals.available} {state.resumo.totals.available === 1 ? 'licença parada' : 'licenças paradas'}. Atribua à sua equipe no painel HLM para aproveitar ao máximo o seu investimento.
                </p>
              </div>
            ) : state.resumo.totals.totalLicenses > 0 ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400">
                <p className="font-bold flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Máxima eficiência</p>
                <p className="mt-1 text-[11.5px] leading-relaxed opacity-90">
                  100% das licenças contratadas estão atribuídas à sua equipe.
                </p>
              </div>
            ) : (
              /* Cliente conectado e sem nenhuma licença: acolhedor e acionável,
                 nunca uma tela de zeros. */
              <div className="rounded-xl border border-border bg-surface-soft p-3 text-xs text-text-muted">
                <p className="font-bold flex items-center gap-1.5 text-text-strong">
                  <Layers className="h-3.5 w-3.5 text-brand-500" /> Tudo pronto para começar
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed">
                  Ainda não há licenças vinculadas a esta conta. Fale com seu consultor Hypercloud para contratar
                  Google Workspace, Gemini ou Cloud e acompanhar tudo por aqui.
                </p>
              </div>
            )}

            {state.resumo.scope && state.resumo.scope.clientCount > 0 && (
              <div className="flex items-center justify-between text-[11.5px] text-text-muted px-1">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Layers className="h-3.5 w-3.5 text-brand-400" />
                  {state.resumo.scope.clientCount === 1
                    ? '1 organização associada'
                    : `${state.resumo.scope.clientCount} organizações no escopo`}
                </span>
                <span className="font-bold uppercase tracking-wider text-[10px] text-text-subtle">
                  Perfil {state.resumo.scope.role}
                </span>
              </div>
            )}
          </div>
        )}

        {state.status === 'no_access' && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-600 dark:text-amber-400">
            <div className="flex items-center gap-2 font-bold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Sem cadastro ativo no HLM</span>
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
          href={hlmUrl}
          target="_blank"
          rel="noreferrer"
          className={btnPrimary('lg', 'w-full sm:w-auto active:scale-[0.98]')}
        >
          <KeyRound className="h-4 w-4" />
          Gerenciar Licenças HLM
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </CardFooter>
    </Card>
  );
}
