import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, BrainCircuit, Cloud, ShieldCheck, Workflow } from 'lucide-react';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeader } from '@/components/SectionHeader';

const products = [
  {
    title: 'Google Workspace',
    description: 'Gmail corporativo, Drive, Meet, Docs e Sheets com administração centralizada e comparação entre os principais planos.',
    href: '/solucoes/google-workspace',
    badge: 'Workspace',
    icon: Building2,
    tone: 'blue' as const,
    iconClassName: 'text-sky-600'
  },
  {
    title: 'Google Cloud',
    description: 'Infraestrutura, dados, modernização e segurança em Google Cloud com abordagem consultiva para empresas e instituições.',
    href: '/solucoes/google-cloud',
    badge: 'Cloud',
    icon: Cloud,
    tone: 'green' as const,
    iconClassName: 'text-emerald-600'
  },
  {
    title: 'Google Workspace with Gemini',
    description: 'IA aplicada ao Gmail, Docs, Meet e ao fluxo de trabalho com foco em produtividade e aceleração operacional.',
    href: '/solucoes/gemini-enterprise',
    badge: 'Gemini',
    icon: BrainCircuit,
    tone: 'purple' as const,
    iconClassName: 'text-violet-600'
  },
  {
    title: 'AppSheet',
    description: 'Automação sem código para processos internos, formulários, aprovações e operações com baixo atrito.',
    href: '/solucoes/appsheet',
    badge: 'AppSheet',
    icon: Workflow,
    tone: 'yellow' as const,
    iconClassName: 'text-amber-600'
  }
] as const;

const credibility = [
  'Partnered with Google Cloud',
  'Google Workspace para empresas e instituições',
  'Jornada dedicada para Setor Público',
  'Comparador comercial orientado por planos'
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-hero-glow py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(ellipse_72%_62%_at_50%_35%,black,transparent)]" />
        <div className="container-shell relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="inline-flex max-w-full rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700 sm:text-xs">
              Google Workspace · Google Workspace with Gemini · Google Cloud · AppSheet
            </span>
            <h1 className="mt-6 max-w-5xl text-balance text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
              Transformação digital com <span className="bg-brand-gradient bg-clip-text text-transparent">Google Cloud</span>, produtividade e IA em padrão enterprise.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              A Hypercloud vende Google Workspace, Google Workspace with Gemini, Google Cloud e AppSheet com credenciais oficiais, comparador dinâmico de planos e uma frente robusta dedicada a governo e estruturas institucionais.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20com%20um%20especialista"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
              >
                Falar com Especialista <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#comparador"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
              >
                Comparar planos
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {credibility.map((item, index) => (
                <div
                  key={item}
                  className={`rounded-2xl border px-4 py-4 text-sm font-medium leading-6 shadow-soft backdrop-blur ${
                    index === 0
                      ? 'border-sky-100 bg-sky-50/70 text-sky-800'
                      : index === 1
                        ? 'border-violet-100 bg-violet-50/70 text-violet-800'
                        : index === 2
                          ? 'border-emerald-100 bg-emerald-50/70 text-emerald-800'
                          : 'border-amber-100 bg-amber-50/70 text-amber-800'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-premium sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Oferta principal</span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">Google para produtividade, IA e governança</h2>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                Hypercloud first
              </span>
            </div>
            <div className="mt-8 space-y-4">
              {[
                ['Google Workspace', 'Gmail, Drive, Meet e colaboração com Google Workspace with Gemini.'],
                ['Google Workspace with Gemini', 'IA do Google para produtividade, escrita, resumo e ganho operacional.'],
                ['Setor Público', 'Jornada dedicada para instituições, governo e estruturas críticas com narrativa própria.']
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-surface-soft p-5">
                  <p className="text-sm font-bold text-slate-950">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-brand-600" />
                <div>
                  <p className="text-sm font-bold text-slate-950">Partnered with Google Cloud</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Posicionamento consultivo com credenciais oficiais, jornada comercial clara e foco em conversão B2B e institucional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="parceiros" className="border-b border-slate-200 bg-white py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Parcerias e credenciais"
            title="Reconhecimento oficial no ecossistema Google."
            description="Badges reais da Hypercloud para reforçar autoridade comercial na venda de Google Workspace, Google Workspace with Gemini, Google Cloud e soluções para Setor Público."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              'google-clound_select-Tecnology_partner.jpeg',
              'google-clound_select-services-partner.jpeg',
              'google-workspace_premier-Co-sell-service_partner.jpeg',
              'google-workspace_select_tecnology_partner.jpeg'
            ].map((file) => (
              <div key={file} className="flex min-h-[172px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
                <Image src={`/logo/logos partner/${file}`} alt={file} width={280} height={120} className="h-auto max-h-24 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solucoes" className="bg-surface-soft py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Produtos principais"
            title="Google Workspace, Google Cloud, Google Workspace with Gemini e AppSheet em uma arquitetura de venda mais forte."
            description="A Hypercloud assume uma hierarquia comercial clara: Google Workspace como vitrine principal, Google Workspace with Gemini como camada de IA, Google Cloud como oferta consultiva e AppSheet como automação de processos."
          />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.title} className="space-y-4">
                <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
                  <product.icon className={`h-7 w-7 ${product.iconClassName}`} />
                </div>
                <ProductCard title={product.title} description={product.description} href={product.href} badge={product.badge} tone={product.tone} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="comparador" className="bg-white py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Comparador Pro"
            title="Compare Google Workspace, Google Workspace with Gemini e soluções Google lado a lado."
            description="Sem preços públicos. Em vez disso, a Hypercloud posiciona a venda com conversa consultiva, solicitação de diagnóstico e leitura clara dos recursos mais relevantes."
          />
          <ComparisonTable />
        </div>
      </section>
    </>
  );
}
