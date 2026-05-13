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
import { EndpointVsCeu } from '@/components/EndpointVsCeu';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';
import { getSolutionBySlug, solutions } from '@/constants/solutions';
import { cn } from '@/components/ui';

type SolutionVisual = {
  icon: LucideIcon;
  iconClass: string;
  badgeClass: string;
};

const visualBySlug: Record<string, SolutionVisual> = {
  'google-workspace': {
    icon: Building2,
    iconClass: 'text-sky-400 bg-sky-500/10',
    badgeClass: 'border-sky-500/30 bg-sky-500/10 text-sky-400'
  },
  'gemini-enterprise': {
    icon: BrainCircuit,
    iconClass: 'text-violet-400 bg-violet-500/10',
    badgeClass: 'border-violet-500/30 bg-violet-500/10 text-violet-400'
  },
  'google-cloud': {
    icon: Cloud,
    iconClass: 'text-emerald-400 bg-emerald-500/10',
    badgeClass: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  },
  appsheet: {
    icon: Workflow,
    iconClass: 'text-amber-400 bg-amber-500/10',
    badgeClass: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
  }
};

const differentiators = [
  {
    icon: Award,
    title: 'Credenciais oficiais',
    description: 'Premier Co-Sell, Select Services e Select Technology Partner — autoridade comercial validada pelo próprio Google.'
  },
  {
    icon: Headphones,
    title: 'Atendimento consultivo em pt-BR',
    description: 'Onboarding, treinamento e suporte com equipe brasileira que entende seu cenário de negócio e regulatório.'
  },
  {
    icon: ShieldCheck,
    title: 'Setor Público pronto',
    description: 'ATAs vigentes e Programa de Integridade publicado para órgãos que exigem fornecedor com compliance formal.'
  },
  {
    icon: TrendingUp,
    title: 'Foco em conversão B2B',
    description: 'Mais de 200 clientes ativos com jornada comercial estruturada por vertical e estágio de maturidade.'
  }
];

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) return { title: 'Solução não encontrada' };
  return solution.metadata;
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) notFound();

  const visual = visualBySlug[solution.slug] ?? {
    icon: Building2,
    iconClass: 'text-brand-400 bg-brand-500/10',
    badgeClass: 'border-brand-500/30 bg-brand-500/10 text-brand-400'
  };
  const VisualIcon = visual.icon;

  return (
    <>
      <InternalHero
        breadcrumbs={[{ label: 'Soluções', href: '/#pricing' }, { label: solution.eyebrow }]}
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.description}
        primaryCta={{ label: 'Falar com Especialista', href: '#falar-com-especialista' }}
        secondaryCta={{ label: 'Comparar planos', href: '/#compare-all' }}
        visual={
          <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-premium sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className={cn('inline-flex h-12 w-12 items-center justify-center rounded-xl', visual.iconClass)}>
                <VisualIcon className="h-6 w-6" />
              </span>
              <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', visual.badgeClass)}>
                {solution.eyebrow}
              </span>
            </div>

            <h2 className="mt-5 text-lg font-extrabold tracking-tight text-text-strong sm:text-xl">
              O que está incluído
            </h2>

            <ul className="mt-5 space-y-2.5">
              {solution.bullets.slice(0, 4).map((bullet, index) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface-soft px-3.5 py-3"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-500/10 text-[10px] font-extrabold text-brand-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[12px] leading-snug text-text">{bullet}</p>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface-card px-3.5 py-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-400" />
              <p className="text-[12px] leading-snug text-text">
                <span className="font-bold text-text-strong">Credenciais oficiais</span> · jornada consultiva.
              </p>
            </div>
          </div>
        }
      />

      <section className="border-b border-border bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Visão técnica"
            title="O que entregamos nesta solução."
            description={solution.intro}
          />
          <Stagger className="grid gap-5 md:grid-cols-2">
            {solution.bullets.map((item) => (
              <StaggerItem key={item}>
                <article className="flex items-start gap-4 rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <p className="text-[14px] leading-relaxed text-text">{item}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#compare-all"
              className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
            >
              Ver comparador
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/setor-publico"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-card px-5 py-3 text-[13px] font-bold text-text shadow-soft transition hover:border-brand-500/40 hover:text-text-strong"
            >
              Soluções para Setor Público
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-soft py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Por que com a Hypercloud"
            title="Diferenciais que sustentam a entrega desta solução."
            description="Quatro pilares que aparecem em todos os projetos da Hypercloud — independente do cenário de Workspace, Cloud, Gemini ou AppSheet."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  <div className="inline-flex rounded-xl bg-brand-500/10 p-2.5 text-brand-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold tracking-tight text-text-strong">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {solution.slug === 'google-workspace' ? <EndpointVsCeu /> : null}

      <SpecialistCta
        title={`Quer avançar com ${solution.eyebrow}?`}
        description="Três passos rápidos pra a gente entender contexto, planos e próximos passos da implementação."
      />
    </>
  );
}
