import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  HeadphonesIcon,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard do Cliente',
  description: 'Área autenticada do Portal do Cliente Hypercloud.'
};

const quickStats = [
  { label: 'Chamados abertos', value: '0', icon: LifeBuoy, tone: 'text-sky-600 bg-sky-50' },
  { label: 'Em acompanhamento', value: '0', icon: Clock, tone: 'text-amber-600 bg-amber-50' },
  { label: 'Resolvidos', value: '—', icon: CheckCircle2, tone: 'text-emerald-600 bg-emerald-50' }
];

const quickActions = [
  {
    icon: HeadphonesIcon,
    title: 'Abrir um chamado',
    description: 'Solicite suporte técnico, comercial ou administrativo.',
    href: '/suporte'
  },
  {
    icon: FileText,
    title: 'Documentos e ATAs',
    description: 'Acesse documentos públicos e materiais institucionais.',
    href: '/setor-publico'
  },
  {
    icon: ShieldCheck,
    title: 'Compliance',
    description: 'Programa de Integridade, Código de Ética e Canal de Ouvidoria.',
    href: '/setor-publico'
  }
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/portal-do-cliente');
  }

  const userName = session.user?.name ?? 'Cliente Hypercloud';

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-hero-glow">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

        <div className="container-shell relative grid items-start gap-12 py-14 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <Breadcrumbs
              items={[
                { label: 'Portal do Cliente', href: '/portal-do-cliente' },
                { label: 'Dashboard' }
              ]}
            />

            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Sessão autenticada
            </span>

            <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
              Bem-vindo de volta,{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {userName.split(' ')[0]}
              </span>
              .
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
              Sua área central para acompanhar chamados, acessar documentos e
              centralizar o relacionamento com a Hypercloud. Esta área evoluirá
              com tickets, integrações e indicadores de uso.
            </p>

            <dl className="mt-9 grid grid-cols-3 gap-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.tone}`}
                  >
                    <stat.icon className="h-4 w-4" />
                  </span>
                  <dt className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.16),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.12),transparent_60%)] blur-2xl" />

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Status da conta
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900">
                    Tudo em ordem
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ativa
                </span>
              </div>

              <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 px-3.5 py-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-900">
                      Conta Hypercloud
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-slate-600">
                      Acompanhamento ativo · Sem pendências.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 px-3.5 py-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-900">
                      Sessão segura
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-slate-600">
                      Autenticação validada com sucesso.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/suporte"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-[13px] font-semibold text-white shadow-brand transition hover:opacity-95"
              >
                Abrir chamado
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-shell">
          <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              Ações rápidas
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Por onde você quer começar?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300"
              >
                <div className="inline-flex w-fit rounded-xl bg-brand-50 p-2.5 text-brand-600">
                  <action.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                  {action.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-600">
                  {action.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
                  Acessar
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
