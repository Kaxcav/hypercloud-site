import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Building2,
  FileCheck,
  Gavel,
  Landmark,
  ScrollText,
  ShieldCheck,
  Download,
  CheckCircle2,
  Users
} from 'lucide-react';
import { InternalHero } from '@/components/InternalHero';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { AtasStrip } from '@/components/AtasStrip';
import { Cases } from '@/components/Cases';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';
import { badges } from '@/constants/badges';

export const metadata: Metadata = {
  title: 'Setor Público',
  description:
    'Soluções Google para Governo e Instituições Públicas: ATAs vigentes, adesão por carona, conformidade com a Lei 14.133/2021 e suporte em BRL.'
};

const acquisitionPaths = [
  {
    icon: ScrollText,
    title: 'Adesão a ATAs vigentes',
    description: 'Aderir a uma de nossas ARPs já homologadas dispensa novo processo licitatório de longa duração.'
  },
  {
    icon: Gavel,
    title: 'Participação em pregões',
    description: 'Acompanhamos editais eletrônicos e presenciais com equipe jurídica e técnica dedicada a licitações.'
  },
  {
    icon: Landmark,
    title: 'Contratação direta (Lei 14.133/21)',
    description: 'Documentação habilitatória pronta para hipóteses de dispensa e inexigibilidade previstas na Nova Lei de Licitações.'
  }
];

export default function SetorPublicoPage() {
  return (
    <>
      <InternalHero
        breadcrumbs={[{ label: 'Setor Público' }]}
        eyebrow="Setor Público · Governança"
        title={
          <>
            Modernização e credibilidade para{' '}
            <span className="font-extrabold text-gradient-brand">governo e instituições</span>.
          </>
        }
        description="Fornecedora de tecnologia para governos municipais, estaduais e federais com ATAs vigentes, programa de integridade formal e conhecimento profundo das exigências do setor público brasileiro."
        primaryCta={{ label: 'Falar com Especialista', href: '#falar-com-especialista' }}
        secondaryCta={{ label: 'Comparar soluções', href: '/#compare-all' }}
        meta={[
          { value: '15+', label: 'Estados e municípios' },
          { value: '8+', label: 'ATAs vigentes' },
          { value: '100%', label: 'Compliance publicado' }
        ]}
        visual={
          <div className="relative rounded-2xl border border-border bg-surface-card p-6 shadow-premium sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-subtle">
              Como o governo compra da Hypercloud
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-text-strong">
              3 caminhos formais de aquisição
            </h2>

            <ul className="mt-6 space-y-2.5">
              {acquisitionPaths.map((path, index) => (
                <li
                  key={path.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface-soft px-3.5 py-3 transition hover:border-brand-500/30"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    <path.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-text-strong">
                      0{index + 1} · {path.title}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-text-muted">{path.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface-card px-3.5 py-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-400" />
              <p className="text-[12px] leading-snug text-text">
                <span className="font-bold text-text-strong">Programa de Integridade</span> · documentos publicados.
              </p>
            </div>
          </div>
        }
      />

      <AtasStrip />

      {/* Kit de Adesão a ATA */}
      <section className="bg-surface-soft py-16 sm:py-20 border-b border-border">
        <div className="container-shell max-w-5xl">
          <div className="rounded-3xl border border-brand-500/40 bg-surface-card p-8 shadow-premium sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-400">
                  <FileCheck className="h-3.5 w-3.5" />
                  Kit de Adesão a ATA de Registro de Preços
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-text-strong sm:text-3xl">
                  Minuta de Ofício de Adesão e Checklist Lei 14.133/2021
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Disponibilizamos para servidores públicos e procuradorias a documentação técnica e jurídica necessária para instruir o processo de adesão (carona) às nossas ATAs de Registro de Preços vigentes.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-medium text-text">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-500" /> Modelo editável de Ofício de Solicitação de Adesão ao Órgão Gerenciador</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-500" /> Checklist de enquadramento da Lei 14.133/2021 e limites de adesão</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-500" /> Declaração de anuidade e concordância da fornecedora Hypercloud</li>
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-soft p-6 text-center">
                <FileCheck className="h-12 w-12 text-brand-400" />
                <h3 className="mt-3 text-base font-bold text-text-strong">Solicitar Kit de Adesão</h3>
                <p className="mt-1 text-xs text-text-muted">Enviado por e-mail para equipes de compras e licitação.</p>
                <a
                  href="#falar-com-especialista"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-5 py-2.5 text-xs font-bold text-white shadow-brand"
                >
                  <Download className="h-4 w-4" />
                  Receber Kit Completo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Credenciais Google"
            title="Badges oficiais para sustentar autoridade institucional."
            description="A Hypercloud usa as credenciais reais do ecossistema Google para apoiar a jornada comercial e institucional no Setor Público."
          />
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-card p-4 text-center shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30"
              >
                <Image
                  src={b.file}
                  alt={b.alt}
                  width={140}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
                <span className="mt-2 text-[11px] font-semibold text-text-muted">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cases />

      <SpecialistCta
        title="Fale com um especialista para Setor Público"
        description="Avançar em Workspace, Cloud, credenciais ou consulta sobre ATAs — três passos rápidos e nossa equipe de licitações continua a conversa."
      />
    </>
  );
}
