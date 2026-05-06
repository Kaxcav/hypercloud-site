import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Workflow,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { TrustStrip } from '@/components/TrustStrip';

const products = [
  {
    title: 'Google Workspace',
    description:
      'Gmail corporativo, Drive, Meet, Docs e Sheets com administração centralizada e comparação entre os principais planos.',
    href: '/solucoes/google-workspace',
    badge: 'Workspace',
    icon: Building2,
    tone: 'blue' as const,
    iconClassName: 'text-sky-600'
  },
  {
    title: 'Google Cloud',
    description:
      'Infraestrutura, dados, modernização e segurança em Google Cloud com abordagem consultiva para empresas e instituições.',
    href: '/solucoes/google-cloud',
    badge: 'Cloud',
    icon: Cloud,
    tone: 'green' as const,
    iconClassName: 'text-emerald-600'
  },
  {
    title: 'Google Workspace with Gemini',
    description:
      'IA aplicada ao Gmail, Docs, Meet e ao fluxo de trabalho com foco em produtividade e aceleração operacional.',
    href: '/solucoes/gemini-enterprise',
    badge: 'Gemini',
    icon: BrainCircuit,
    tone: 'purple' as const,
    iconClassName: 'text-violet-600'
  },
  {
    title: 'AppSheet',
    description:
      'Automação sem código para processos internos, formulários, aprovações e operações com baixo atrito.',
    href: '/solucoes/appsheet',
    badge: 'AppSheet',
    icon: Workflow,
    tone: 'yellow' as const,
    iconClassName: 'text-amber-600'
  }
] as const;

const heroStats = [
  { value: '10+', label: 'Anos no mercado' },
  { value: '200+', label: 'Clientes ativos' },
  { value: '4', label: 'Verticais Google' }
];

export default function HomePage() {
  return (
    <>
      {/* HERO ============================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-hero-glow">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_72%_62%_at_50%_35%,black,transparent)]" />

        <div className="container-shell relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24 xl:py-28">
          {/* ESQUERDA — texto forte ----------------------------------------- */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Partnered with Google Cloud
            </span>

            <h1 className="mt-6 max-w-[18ch] text-balance text-[40px] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
              Transformação digital com{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Google Cloud
              </span>
              , produtividade e IA.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
              A Hypercloud vende Google Workspace, Google Workspace with
              Gemini, Google Cloud e AppSheet com credenciais oficiais,
              comparador dinâmico de planos e uma frente robusta dedicada a
              governo e estruturas institucionais.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#falar-com-especialista"
                className="inline-flex items-center gap-2 rounded-md bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
              >
                Falar com Especialista
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#comparador"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-600"
              >
                Comparar planos
              </Link>
            </div>

            {/* stats */}
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-200/70 pt-8">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* DIREITA — composição visual moderna --------------------------- */}
          <div className="relative">
            {/* glow laranja por trás */}
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.14),transparent_60%)] blur-2xl" />

            {/* card central — painel produtos */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-premium sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Oferta principal
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    Stack Google da Hypercloud
                  </h2>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                  <span className="h-1 w-1 rounded-full bg-brand-500" />
                  Hypercloud first
                </span>
              </div>

              <ul className="mt-6 space-y-2.5">
                {[
                  {
                    icon: Building2,
                    color: 'text-sky-600 bg-sky-50',
                    title: 'Google Workspace',
                    desc: 'Gmail, Drive, Meet e colaboração'
                  },
                  {
                    icon: BrainCircuit,
                    color: 'text-violet-600 bg-violet-50',
                    title: 'Workspace with Gemini',
                    desc: 'IA aplicada à produtividade'
                  },
                  {
                    icon: Cloud,
                    color: 'text-emerald-600 bg-emerald-50',
                    title: 'Google Cloud',
                    desc: 'Infraestrutura e dados'
                  },
                  {
                    icon: Workflow,
                    color: 'text-amber-600 bg-amber-50',
                    title: 'AppSheet',
                    desc: 'Automação no-code'
                  }
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 px-3.5 py-3 transition hover:border-slate-300 hover:bg-white"
                  >
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-snug text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white px-3.5 py-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
                <p className="text-[12px] leading-snug text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Credenciais oficiais
                  </span>{' '}
                  · jornada comercial consultiva.
                </p>
              </div>
            </div>

            {/* mini-card flutuante 1 — métrica */}
            <div className="absolute -right-4 -top-6 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-medium sm:block lg:-right-6">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-white">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Conversão B2B
                  </p>
                  <p className="text-sm font-bold text-slate-900">+200 clientes</p>
                </div>
              </div>
            </div>

            {/* mini-card flutuante 2 — badge Google */}
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-medium sm:flex sm:items-center sm:gap-2.5 lg:-left-6 lg:-bottom-6">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                Premier Google Cloud Partner
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP ====================================================== */}
      <TrustStrip />

      {/* PARCEIROS ======================================================== */}
      <section id="parceiros" className="border-b border-slate-200/70 bg-white py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Parcerias e credenciais"
            title="Reconhecimento oficial no ecossistema Google."
            description="Badges reais da Hypercloud para reforçar autoridade comercial na venda de Google Workspace, Google Workspace with Gemini, Google Cloud e soluções para Setor Público."
            centered
          />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              'google-clound_select-Tecnology_partner.jpeg',
              'google-clound_select-services-partner.jpeg',
              'google-workspace_premier-Co-sell-service_partner.jpeg',
              'google-workspace_select_tecnology_partner.jpeg'
            ].map((file) => (
              <div
                key={file}
                className="flex min-h-[164px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-medium"
              >
                <Image
                  src={`/logo/logos partner/${file}`}
                  alt={file}
                  width={280}
                  height={120}
                  className="h-auto max-h-24 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÕES ========================================================= */}
      <section id="solucoes" className="bg-slate-50 py-20 sm:py-24 lg:py-28">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Produtos principais"
            title="O stack Google em uma arquitetura comercial mais clara."
            description="A Hypercloud assume uma hierarquia comercial clara: Google Workspace como vitrine principal, Google Workspace with Gemini como camada de IA, Google Cloud como oferta consultiva e AppSheet como automação de processos."
          />
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.title} className="flex h-full flex-col gap-4">
                <div className="inline-flex w-fit rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <product.icon className={`h-6 w-6 ${product.iconClassName}`} />
                </div>
                <ProductCard
                  title={product.title}
                  description={product.description}
                  href={product.href}
                  badge={product.badge}
                  tone={product.tone}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARADOR ======================================================= */}
      <section id="comparador" className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Comparador Pro"
            title="Compare Google Workspace, Gemini e soluções Google lado a lado."
            description="Sem preços públicos. Em vez disso, a Hypercloud posiciona a venda com conversa consultiva, solicitação de diagnóstico e leitura clara dos recursos mais relevantes."
          />
          <ComparisonTable />
        </div>
      </section>

      <SpecialistCta />
    </>
  );
}
