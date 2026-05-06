import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  FileText,
  Gavel,
  Landmark,
  ScrollText,
  ShieldCheck,
  Users
} from 'lucide-react';
import { InternalHero } from '@/components/InternalHero';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';

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

const acquisitionPaths = [
  {
    icon: ScrollText,
    title: 'Adesão a ATAs vigentes',
    description: 'Aderir a uma de nossas ARPs já homologadas dispensa novo processo licitatório.'
  },
  {
    icon: Gavel,
    title: 'Participação em pregões',
    description: 'Acompanhamos editais eletrônicos e presenciais com equipe dedicada a licitações.'
  },
  {
    icon: Landmark,
    title: 'Contratação direta (Lei 14.133/21)',
    description: 'Documentação habilitatória pronta para hipóteses previstas na Nova Lei de Licitações.'
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
            <span className="font-serif italic font-normal text-gradient-brand">governo e instituições</span>.
          </>
        }
        description="Fornecedora de tecnologia para governos municipais, estaduais e federais com ATAs vigentes, programa de integridade formal e conhecimento profundo das exigências do setor público brasileiro."
        primaryCta={{ label: 'Falar com Especialista', href: '#falar-com-especialista' }}
        secondaryCta={{ label: 'Comparar soluções', href: '/#comparador' }}
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

            <div className="absolute -right-4 -top-5 hidden items-center gap-2 rounded-xl border border-border bg-surface-card px-3 py-2 shadow-medium sm:flex lg:-right-6">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text">
                Equipe de licitações dedicada
              </p>
            </div>
          </div>
        }
      />

      <section className="border-b border-border bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Direção institucional"
            title="Uma frente pública mais leve, clara e executiva."
            description="Reduzimos o ruído visual e priorizamos entendimento institucional, confiança e clareza sobre a oferta Google da Hypercloud."
          />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Building2, title: 'Instituições', description: 'Workspace e Cloud apresentados com leitura apropriada para ambientes públicos.' },
              { icon: ShieldCheck, title: 'Credibilidade', description: 'Badges reais do ecossistema Google como prova institucional sem carregar a interface.' },
              { icon: Users, title: 'Decisão guiada', description: 'Comparação entre frentes mais objetiva para públicos leigos e técnicos.' }
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  <div className="inline-flex rounded-xl bg-brand-500/10 p-2.5 text-brand-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-text-strong">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-text-muted">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-b border-border bg-surface-soft py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="ATAs e documentos"
            title="ATAs públicas disponíveis para consulta."
            description="Documentos publicados em bloco direto para facilitar o acesso institucional."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {atas.map((ata) => (
              <article
                key={ata.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30"
              >
                <div className="inline-flex w-fit rounded-xl bg-brand-500/10 p-2.5 text-brand-400">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-text-strong">{ata.title}</h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-text-muted">{ata.description}</p>
                <Link
                  href={ata.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-md border border-border bg-surface-card px-3.5 py-2 text-[13px] font-bold text-text transition hover:border-brand-500/40 hover:text-text-strong"
                >
                  Abrir PDF
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Credenciais Google"
            title="Badges oficiais para sustentar autoridade institucional."
            description="A Hypercloud usa as credenciais reais do ecossistema Google para apoiar a jornada comercial e institucional no Setor Público."
            centered
          />
          <div className="grid gap-5 md:grid-cols-3">
            {badges.map((file) => (
              <div
                key={file}
                className="flex min-h-[164px] items-center justify-center rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30"
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

      <SpecialistCta
        title="Fale com um especialista para Setor Público"
        description="Avançar em Workspace, Cloud, credenciais ou consulta sobre ATAs — três passos rápidos e nossa equipe continua a conversa."
      />
    </>
  );
}
