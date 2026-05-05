import Image from 'next/image';
import Link from 'next/link';
import { Building2, BrainCircuit, Cloud, Workflow } from 'lucide-react';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeader } from '@/components/SectionHeader';

const products = [
  {
    title: 'Google Workspace',
    description: 'Gmail corporativo, Drive, Meet, Docs e Sheets com administração centralizada e comparação entre os principais planos.',
    href: '/solucoes/google-workspace',
    badge: 'Workspace',
    icon: Building2
  },
  {
    title: 'Google Cloud Platform',
    description: 'Infraestrutura, dados, modernização e segurança em GCP com abordagem consultiva para empresas e instituições.',
    href: '/solucoes/google-cloud',
    badge: 'GCP',
    icon: Cloud
  },
  {
    title: 'Gemini Enterprise',
    description: 'IA aplicada ao Gmail, Docs, Meet e ao fluxo de trabalho com foco em produtividade e aceleração operacional.',
    href: '/solucoes/gemini-enterprise',
    badge: 'Gemini',
    icon: BrainCircuit
  },
  {
    title: 'AppSheet',
    description: 'Automação sem código para processos internos, formulários, aprovações e operações com baixo atrito.',
    href: '/solucoes/appsheet',
    badge: 'AppSheet',
    icon: Workflow
  }
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-surface-soft py-24 sm:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <div className="container-shell relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Google Workspace · Gemini Enterprise · Google Cloud · AppSheet
            </span>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
              Transformação digital com Google Cloud, Workspace e IA para empresas e Setor Público.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              A Hypercloud vende Google Workspace, Gemini Enterprise, GCP e AppSheet com credenciais oficiais, comparador dinâmico de planos e uma frente robusta dedicada a governo e estruturas institucionais.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20com%20um%20especialista"
                className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
              >
                Falar com Especialista
              </Link>
              <Link
                href="#comparador"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
              >
                Comparar planos
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Badges Google originais</span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Setor Público com jornada própria</span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Comparador Pro de Workspace</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Oferta principal</span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">Produtos Google com posicionamento enterprise</h2>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
                Google Partner
              </span>
            </div>
            <div className="mt-8 space-y-4">
              {[
                ['Workspace', 'Gmail, Drive, Meet e colaboração com IA Gemini.'],
                ['Gemini', 'IA do Google para produtividade e ganho operacional.'],
                ['Setor Público', 'Jornada dedicada para instituições, governo e estruturas críticas.']
              ].map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-slate-100 bg-surface-soft p-5">
                  <p className="text-sm font-bold text-slate-950">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="parceiros" className="border-b border-slate-200 bg-white py-20">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Parcerias e credenciais"
            title="Reconhecimento oficial no ecossistema Google."
            description="Badges reais da Hypercloud para reforçar autoridade comercial na venda de Google Workspace, Gemini Enterprise, GCP e soluções para Setor Público."
            centered
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              'google-clound_select-Tecnology_partner.jpeg',
              'google-clound_select-services-partner.jpeg',
              'google-workspace_premier-Co-sell-service_partner.jpeg',
              'google-workspace_select_tecnology_partner.jpeg'
            ].map((file) => (
              <div key={file} className="flex min-h-[160px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
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
            title="Google Workspace, Google Cloud, Gemini e AppSheet em uma arquitetura de venda mais forte."
            description="A Hypercloud assume uma hierarquia comercial clara: Workspace como vitrine principal, Gemini como camada de IA, GCP como oferta consultiva e AppSheet como automação de processos."
          />
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.title} className="space-y-4">
                <product.icon className="h-10 w-10 text-brand-600" />
                <ProductCard title={product.title} description={product.description} href={product.href} badge={product.badge} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="comparador" className="bg-white py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Comparador Pro"
            title="Compare Google Workspace, Gemini Enterprise e soluções Google lado a lado."
            description="Sem preços públicos. Em vez disso, a Hypercloud posiciona a venda com conversa consultiva, solicitação de diagnóstico e leitura clara dos recursos mais relevantes."
          />
          <ComparisonTable />
        </div>
      </section>
    </>
  );
}
