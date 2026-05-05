import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, FileText, ShieldCheck, Users } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';

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

const atas = [
  {
    title: 'ARP CIMPAR — Software',
    description: 'Ata disponível para consulta pública com foco em software e jornada institucional.',
    href: 'https://hypercloud.com.br/atas/arp_cimpar-software.pdf'
  },
  {
    title: 'CIASC-SC',
    description: 'Documento institucional público para apoio à navegação e entendimento da atuação da Hypercloud.',
    href: 'https://hypercloud.com.br/atas/ciasc-sc.pdf'
  }
];

const steps = [
  {
    title: 'Diagnóstico institucional',
    description: 'Mapeamos o contexto de governo, instituição ou estrutura crítica com foco em Google Workspace, Google Workspace with Gemini e Google Cloud.'
  },
  {
    title: 'Estruturação da jornada pública',
    description: 'Organizamos a oferta com linguagem mais executiva, credenciais oficiais e clareza de escopo para facilitar a decisão.'
  },
  {
    title: 'Comparação e priorização',
    description: 'Comparamos frentes, planos e direcionamentos para tornar diferenças mais visíveis e apoiar a escolha institucional.'
  }
];

export default function SetorPublicoPage() {
  return (
    <>
      <section className="border-b border-slate-200/60 bg-gradient-to-b from-white to-slate-50 py-20 sm:py-24 lg:py-28">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="inline-flex rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              Setor Público · Google Workspace · Governança
            </span>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl">
              Modernização, colaboração e credibilidade para governo e instituições.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
              A Hypercloud mantém a frente pública como uma área estratégica do app, com foco em Google Workspace,
              Google Workspace with Gemini, credenciais Google e uma jornada dedicada para instituições e operações críticas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#falar-com-especialista"
                className="rounded-md bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
              >
                Falar com Especialista
              </Link>
              <Link
                href="/#comparador"
                className="rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
              >
                Comparar soluções
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200/60 bg-white p-6 shadow-soft sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Jornada pública</p>
            <div className="mt-6 space-y-3">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-2xl border border-slate-200/60 bg-slate-50 p-5">
                  <p className="text-sm font-bold text-slate-900">0{index + 1} · {step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/60 bg-white py-20 sm:py-24 lg:py-32">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Direção institucional"
            title="Uma frente pública mais leve, mais clara e mais executiva."
            description="Reduzimos o ruído visual e priorizamos entendimento institucional, confiança e clareza sobre a oferta Google da Hypercloud."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6">
              <Building2 className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-xl font-extrabold tracking-tighter text-slate-900">Instituições</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Google Workspace e Google Cloud apresentados com uma leitura mais apropriada para ambientes públicos e institucionais.</p>
            </div>
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-xl font-extrabold tracking-tighter text-slate-900">Credibilidade</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">Badges reais do ecossistema Google aparecem como prova institucional sem carregar demais a interface.</p>
            </div>
            <div className="rounded-3xl border border-slate-200/60 bg-white p-6">
              <Users className="h-6 w-6 text-brand-600" />
              <h3 className="mt-4 text-xl font-extrabold tracking-tighter text-slate-900">Decisão guiada</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">A comparação entre frentes e soluções fica mais objetiva para públicos leigos e técnicos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/60 bg-slate-50 py-20 sm:py-24 lg:py-32">
        <div className="container-shell">
          <SectionHeader
            eyebrow="ATAs e documentos"
            title="ATAs públicas disponíveis para consulta."
            description="Incluímos as ATAs fornecidas por você em um bloco claro e direto para facilitar o acesso institucional a esses documentos."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {atas.map((ata) => (
              <article key={ata.title} className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-soft">
                <FileText className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-xl font-extrabold tracking-tighter text-slate-900">{ata.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{ata.description}</p>
                <Link
                  href={ata.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
                >
                  Abrir PDF
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Credenciais Google"
            title="Badges oficiais para sustentar autoridade institucional."
            description="A Hypercloud usa as credenciais reais do ecossistema Google para apoiar a jornada comercial e institucional no Setor Público."
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {badges.map((file) => (
              <div key={file} className="flex min-h-[160px] items-center justify-center rounded-3xl border border-slate-200/60 bg-white p-6 shadow-soft">
                <Image src={`/logo/logos partner/${file}`} alt={file} width={280} height={120} className="h-auto max-h-24 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpecialistCta
        title="Fale com um especialista da Hypercloud para Setor Público"
        description="Se quiser avançar em Google Workspace, Google Cloud, credenciais ou consulta sobre ATAs, escolha o canal mais confortável e nossa equipe continua a conversa com você."
      />
    </>
  );
}
