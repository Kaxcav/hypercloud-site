import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Award,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Cloud,
  Headphones,
  ShieldCheck,
  TrendingUp,
  Workflow
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { InternalHero } from '@/components/InternalHero';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { getSolutionBySlug, solutions } from '@/constants/solutions';

type SolutionVisual = {
  icon: LucideIcon;
  iconClass: string;
  badgeClass: string;
};

const visualBySlug: Record<string, SolutionVisual> = {
  'google-workspace': {
    icon: Building2,
    iconClass: 'text-sky-600 bg-sky-50',
    badgeClass: 'border-sky-200 text-sky-700 bg-sky-50'
  },
  'gemini-enterprise': {
    icon: BrainCircuit,
    iconClass: 'text-violet-600 bg-violet-50',
    badgeClass: 'border-violet-200 text-violet-700 bg-violet-50'
  },
  'google-cloud': {
    icon: Cloud,
    iconClass: 'text-emerald-600 bg-emerald-50',
    badgeClass: 'border-emerald-200 text-emerald-700 bg-emerald-50'
  },
  appsheet: {
    icon: Workflow,
    iconClass: 'text-amber-600 bg-amber-50',
    badgeClass: 'border-amber-200 text-amber-700 bg-amber-50'
  }
};

const differentiators = [
  {
    icon: Award,
    title: 'Credenciais oficiais',
    description:
      'Premier Co-Sell, Select Services e Select Technology Partner — autoridade comercial validada pelo próprio Google.'
  },
  {
    icon: Headphones,
    title: 'Atendimento consultivo em pt-BR',
    description:
      'Onboarding, treinamento e suporte com equipe brasileira que entende seu cenário de negócio e regulatório.'
  },
  {
    icon: ShieldCheck,
    title: 'Setor Público pronto',
    description:
      'ATAs vigentes e Programa de Integridade publicado para órgãos que exigem fornecedor com compliance formal.'
  },
  {
    icon: TrendingUp,
    title: 'Foco em conversão B2B',
    description:
      'Mais de 200 clientes ativos com jornada comercial estruturada por vertical e estágio de maturidade.'
  }
];

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) {
    return { title: 'Solução não encontrada' };
  }
  return solution.metadata;
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = getSolutionBySlug(params.slug);

  if (!solution) {
    notFound();
  }

  const visual = visualBySlug[solution.slug] ?? {
    icon: Building2,
    iconClass: 'text-brand-600 bg-brand-50',
    badgeClass: 'border-brand-200 text-brand-700 bg-brand-50'
  };

  const VisualIcon = visual.icon;

  return (
    <>
      <InternalHero
        breadcrumbs={[
          { label: 'Soluções', href: '/#solucoes' },
          { label: solution.eyebrow }
        ]}
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.description}
        primaryCta={{
          label: 'Falar com Especialista',
          href: '#falar-com-especialista'
        }}
        secondaryCta={{ label: 'Comparar planos', href: '/#comparador' }}
        visual={
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${visual.iconClass}`}
              >
                <VisualIcon className="h-6 w-6" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${visual.badgeClass}`}
              >
                {solution.eyebrow}
              </span>
            </div>

            <h2 className="mt-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              O que está incluído
            </h2>

            <ul className="mt-5 space-y-2.5">
              {solution.bullets.slice(0, 4).map((bullet, index) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 px-3.5 py-3"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-50 text-[10px] font-extrabold text-brand-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[12px] leading-snug text-slate-700">
                    {bullet}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-3.5 py-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
              <p className="text-[12px] leading-snug text-slate-700">
                <span className="font-semibold text-slate-900">
                  Credenciais oficiais
                </span>{' '}
                · jornada consultiva.
              </p>
            </div>
          </div>
        }
      />

      <section className="border-b border-slate-200/70 bg-white py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Visão técnica"
            title="O que entregamos nesta solução."
            description={solution.intro}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {solution.bullets.map((item) => (
              <article
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <p className="text-[14px] leading-relaxed text-slate-700">
                  {item}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#comparador"
              className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-[13px] font-semibold text-white shadow-brand transition hover:opacity-95"
            >
              Ver comparador
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/setor-publico"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-600"
            >
              Soluções para Setor Público
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/70 bg-slate-50 py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Por que com a Hypercloud"
            title="Diferenciais que sustentam a entrega desta solução."
            description="Quatro pilares que aparecem em todos os projetos da Hypercloud — independente do cenário de Workspace, Cloud, Gemini ou AppSheet."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300"
              >
                <div className="inline-flex rounded-xl bg-brand-50 p-2.5 text-brand-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpecialistCta
        title={`Quer avançar com ${solution.eyebrow}?`}
        description="Escolha o canal mais confortável e nossa equipe continua a conversa para entender contexto, planos e próximos passos da implementação."
      />
    </>
  );
}
