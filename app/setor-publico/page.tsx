import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionHeader } from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Setor Público',
  description:
    'Landing page da Hypercloud para governo, instituições, ATAs, governança e modernização com soluções Google.'
};

const badges = [
  'google-clound_select-services-partner.jpeg',
  'google-clound_select-Tecnology_partner.jpeg',
  'google-workspace_premier-Co-sell-service_partner.jpeg'
];

const steps = [
  'Diagnóstico institucional com foco em Workspace, Gemini e Google Cloud.',
  'Estruturação da jornada pública com linguagem executiva e credenciais oficiais.',
  'Comparação e priorização de frentes para tomada de decisão mais clara.',
  'Atendimento contínuo para governo, instituições e estruturas críticas.'
];

export default function SetorPublicoPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-surface-soft py-24 sm:py-28">
        <div className="container-shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Setor Público · Google Workspace · Governança
            </span>
            <h1 className="mt-6 text-balance text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
              Modernização, colaboração e credibilidade para governo e instituições.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              A Hypercloud preserva a frente pública como uma área estratégica do site, com foco em Google Workspace,
              Gemini, credenciais Google e uma jornada dedicada para estruturas institucionais e operações críticas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="mailto:corporativo@hypercloud.com.br?subject=Quero%20falar%20sobre%20Setor%20P%C3%BAblico"
                className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
              >
                Falar com Especialista
              </Link>
              <Link
                href="/#comparador"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
              >
                Comparar soluções
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Jornada pública</p>
            <div className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-100 bg-surface-soft p-5">
                  <p className="text-sm font-bold text-slate-950">0{index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-20">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Credenciais Google"
            title="Badges oficiais para sustentar autoridade institucional."
            description="A Hypercloud usa as credenciais reais do ecossistema Google para apoiar a jornada comercial e institucional no Setor Público."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {badges.map((file) => (
              <div key={file} className="flex min-h-[160px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <Image src={`/logo/logos partner/${file}`} alt={file} width={280} height={120} className="h-auto max-h-24 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
