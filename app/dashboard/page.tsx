import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Headphones,
  HelpCircle,
  LifeBuoy,
  Loader2,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { authOptions } from '@/lib/auth';
import {
  dashboardLicenses,
  dashboardTickets,
  dashboardTimeline,
  dashboardUsage
} from '@/constants/dashboard-mock';
import { cn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Dashboard do Cliente',
  description: 'Área autenticada do Portal do Cliente Hypercloud.'
};

const ticketStatusStyle: Record<string, string> = {
  aberto: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  'em-andamento': 'border-sky-500/40 bg-sky-500/10 text-sky-400',
  resolvido: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
};
const ticketStatusLabel: Record<string, string> = {
  aberto: 'Aberto',
  'em-andamento': 'Em andamento',
  resolvido: 'Resolvido'
};
const priorityStyle: Record<string, string> = {
  alta: 'text-red-400',
  media: 'text-amber-400',
  baixa: 'text-text-subtle'
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/portal-do-cliente');
  }

  const userName = session.user?.name ?? 'Cliente Hypercloud';
  const firstName = userName.split(' ')[0];
  const totalLicenses = dashboardLicenses.reduce((sum, l) => sum + l.count, 0);
  const openTickets = dashboardTickets.filter((t) => t.status !== 'resolvido').length;
  const storageUsedPct = Math.round((dashboardUsage.storageUsedTb / dashboardUsage.storageQuotaTb) * 100);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container-shell relative grid items-start gap-12 py-12 sm:py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:py-16">
          <div>
            <Breadcrumbs items={[{ label: 'Portal do Cliente', href: '/portal-do-cliente' }, { label: 'Dashboard' }]} />

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Sessão autenticada
            </span>

            <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
              Bem-vindo de volta,{' '}
              <span className="font-extrabold text-gradient-brand">{firstName}</span>.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-7">
              Sua área central — chamados, licenças, integrações Google e relacionamento com a Hypercloud. Mockup ilustrativo;
              substituir por integração real quando a API estiver disponível.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <StatCard label="Licenças ativas" value={String(totalLicenses)} icon={BadgeCheck} accent="emerald" />
              <StatCard label="Chamados abertos" value={String(openTickets)} icon={LifeBuoy} accent="amber" />
              <StatCard label="Uso storage" value={`${storageUsedPct}%`} icon={TrendingUp} accent="brand" />
            </div>
          </div>

          {/* status card */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.12),transparent_60%)] blur-2xl" />
            <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-premium sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">Status da conta</p>
                  <h2 className="mt-2 text-xl font-extrabold tracking-tight text-text-strong">Tudo em ordem</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ativa
                </span>
              </div>

              <div className="mt-6 space-y-2.5">
                <RowItem icon={ShieldCheck} title="Sessão segura" desc="Autenticação validada com sucesso." color="emerald" />
                <RowItem icon={TrendingUp} title="Conta Hypercloud" desc="Acompanhamento ativo · sem pendências." color="brand" />
                <RowItem icon={Calendar} title="Próxima renovação" desc="Workspace Plus em 12 set 2026." color="amber" />
              </div>

              <Link
                href="/suporte"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
              >
                Abrir chamado
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LICENSES + USAGE */}
      <section className="bg-surface-soft py-14">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-surface-card p-6 shadow-soft sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">Licenças</p>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight text-text-strong">Produtos ativos</h3>
              </div>
              <Link href="/sobre" className="text-[12px] font-bold text-text-muted transition hover:text-brand-400">
                Histórico
              </Link>
            </div>
            <ul className="space-y-2">
              {dashboardLicenses.map((lic) => (
                <li
                  key={lic.product}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-soft px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[13.5px] font-bold text-text-strong">{lic.product}</p>
                      <p className="mt-0.5 text-[12px] text-text-muted">
                        Renova em {new Date(lic.renewsAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-[15px] font-extrabold tabular-nums text-text-strong">{lic.count}</p>
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]',
                        lic.status === 'ativa'
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                          : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      )}
                    >
                      {lic.status === 'ativa' ? 'Ativa' : 'Em piloto'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* USAGE */}
          <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">Uso este mês</p>
            <div className="mt-5 space-y-5">
              <UsageBar label="Storage" value={dashboardUsage.storageUsedTb} max={dashboardUsage.storageQuotaTb} unit="TB" />
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-text-subtle">Meet</p>
                <p className="mt-1.5 font-extrabold text-[36px] leading-none tracking-tight text-brand-400">
                  {dashboardUsage.meetMinutesMonth.toLocaleString('pt-BR')}
                </p>
                <p className="mt-1 text-[12px] text-text-muted">minutos no mês</p>
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-text-subtle">Gemini</p>
                <p className="mt-1.5 font-extrabold text-[36px] leading-none tracking-tight text-brand-400">
                  {dashboardUsage.geminiUsesMonth.toLocaleString('pt-BR')}
                </p>
                <p className="mt-1 text-[12px] text-text-muted">interações com IA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKETS + TIMELINE */}
      <section className="bg-surface-base py-14">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-surface-card p-6 shadow-soft sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">Chamados</p>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight text-text-strong">Atualizações recentes</h3>
              </div>
              <Link
                href="/suporte"
                className="inline-flex items-center gap-1 text-[12px] font-bold text-brand-400 transition hover:text-brand-300"
              >
                Abrir novo <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="space-y-2">
              {dashboardTickets.map((t) => (
                <li
                  key={t.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-surface-soft px-4 py-3.5 sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-[11px] font-bold text-text-subtle">{t.id}</p>
                      <span className={cn('text-[11px] font-bold uppercase tracking-[0.14em]', priorityStyle[t.priority])}>
                        {t.priority === 'alta' ? '● Alta' : t.priority === 'media' ? '● Média' : '○ Baixa'}
                      </span>
                    </div>
                    <p className="mt-1 text-[14px] font-bold text-text-strong">{t.title}</p>
                    <p className="mt-0.5 text-[12px] text-text-muted">
                      Atualizado em {new Date(t.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em]',
                      ticketStatusStyle[t.status]
                    )}
                  >
                    {t.status === 'aberto' ? <Clock className="h-3 w-3" /> :
                      t.status === 'em-andamento' ? <Loader2 className="h-3 w-3 animate-spin" /> :
                        <CheckCircle2 className="h-3 w-3" />}
                    {ticketStatusLabel[t.status]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* TIMELINE */}
          <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">Linha do tempo</p>
            <ul className="mt-5 space-y-4">
              {dashboardTimeline.map((evt, idx) => (
                <li key={`${evt.date}-${idx}`} className="relative pl-6">
                  <span className="absolute left-0 top-1.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-brand-gradient" />
                  {idx !== dashboardTimeline.length - 1 ? (
                    <span className="absolute left-1.5 top-4 h-full w-px bg-border" aria-hidden />
                  ) : null}
                  <p className="text-[12px] font-bold text-text-subtle">
                    {new Date(evt.date).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="mt-0.5 text-[13.5px] text-text">{evt.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="bg-surface-soft py-14">
        <div className="container-shell">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">Atalhos rápidos</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-text-strong sm:text-3xl">
              Por onde você quer começar?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <ActionCard
              icon={Headphones}
              title="Abrir um chamado"
              desc="Suporte técnico, comercial ou administrativo."
              href="/suporte"
            />
            <ActionCard
              icon={ExternalLink}
              title="Admin Console Google"
              desc="Acesso direto ao painel de admin Workspace."
              href="https://admin.google.com"
              external
            />
            <ActionCard
              icon={FileText}
              title="Documentos e ATAs"
              desc="Documentos institucionais públicos."
              href="/setor-publico"
            />
            <ActionCard
              icon={ShieldCheck}
              title="Compliance"
              desc="Programa de Integridade e canal de ouvidoria."
              href="/setor-publico"
            />
            <ActionCard
              icon={HelpCircle}
              title="Base de conhecimento"
              desc="Tutoriais e respostas para dúvidas comuns."
              href="/suporte"
            />
            <ActionCard
              icon={Sparkles}
              title="Solicitar Gemini"
              desc="Ampliar licenças de Workspace with Gemini."
              href="/solucoes/gemini-enterprise"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: 'emerald' | 'amber' | 'brand';
}) {
  const accentColor =
    accent === 'emerald'
      ? 'text-emerald-400 bg-emerald-500/10'
      : accent === 'amber'
        ? 'text-amber-400 bg-amber-500/10'
        : 'text-brand-400 bg-brand-500/10';

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-4 shadow-soft">
      <span className={cn('inline-flex h-9 w-9 items-center justify-center rounded-lg', accentColor)}>
        <Icon className="h-4 w-4" />
      </span>
      <dt className="mt-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-subtle">{label}</dt>
      <dd className="mt-1 font-extrabold text-[28px] leading-none tracking-tight text-text-strong">{value}</dd>
    </div>
  );
}

function RowItem({
  icon: Icon,
  title,
  desc,
  color
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: 'emerald' | 'brand' | 'amber';
}) {
  const c =
    color === 'emerald'
      ? 'text-emerald-400 bg-emerald-500/10'
      : color === 'amber'
        ? 'text-amber-400 bg-amber-500/10'
        : 'text-brand-400 bg-brand-500/10';
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-soft px-3.5 py-3">
      <span className={cn('inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', c)}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[13px] font-bold text-text-strong">{title}</p>
        <p className="mt-0.5 text-[12px] leading-snug text-text-muted">{desc}</p>
      </div>
    </div>
  );
}

function UsageBar({ label, value, max, unit }: { label: string; value: number; max: number; unit: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-text-subtle">{label}</p>
        <p className="text-[13.5px] font-bold text-text-strong">
          {value}<span className="text-text-muted"> / {max} {unit}</span>
        </p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-brand-gradient"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-[11px] text-text-subtle">{pct}% utilizado</p>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  desc,
  href,
  external
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  external?: boolean;
}) {
  const Component = external ? 'a' : Link;
  const linkProps = external ? { href, target: '_blank', rel: 'noreferrer' } : { href };
  return (
    <Component
      {...(linkProps as any)}
      className="group flex flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30"
    >
      <div className="inline-flex w-fit rounded-xl bg-brand-500/10 p-2.5 text-brand-400">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-text-strong">{title}</h3>
      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-text-muted">{desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-400">
        Acessar
        {external ? (
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        )}
      </span>
    </Component>
  );
}
