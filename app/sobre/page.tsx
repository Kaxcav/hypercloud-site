import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Building2,
  Cloud,
  Compass,
  GraduationCap,
  HeartPulse,
  Landmark,
  ScrollText,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { InternalHero } from '@/components/InternalHero';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';

export const metadata: Metadata = {
  title: 'Sobre a Hypercloud',
  description:
    'A Hypercloud é uma consultoria brasileira especializada em projetos de Tecnologia da Informação para empresas privadas, governo e instituições. Premier Partner do Google.'
};

const pillars = [
  {
    icon: Award,
    title: '01 · Premier Partner do Google',
    description:
      'Pertencemos ao nível mais alto de parceria do Google Cloud no Brasil. Implementamos Workspace, Cloud e Education com certificação direta da fabricante.'
  },
  {
    icon: Cloud,
    title: '02 · Multi-cloud por design',
    description:
      'Trabalhamos com AWS, Azure e Google Cloud com profundidade técnica equivalente. Recomendamos a melhor arquitetura — não a que dá mais comissão.'
  },
  {
    icon: Landmark,
    title: '03 · Especialistas em Setor Público',
    description:
      'Atendemos governos municipais, estaduais e federais por meio de ARP/ATAs vigentes. Conhecemos as exigências de licitação, compliance e integridade.'
  },
  {
    icon: ShieldCheck,
    title: '04 · Metodologias certificadas',
    description:
      'Operamos com PMI, ITIL e processos ágeis. Nossos especialistas possuem certificações ativas das principais autoridades técnicas do mercado.'
  }
];

const sectors = [
  { icon: Building2, title: 'Empresas privadas', description: 'Infraestrutura, produtividade e segurança em escala corporativa.' },
  { icon: Landmark, title: 'Governo', description: 'Aquisições via ATAs, modernização e transformação digital do setor público.' },
  { icon: GraduationCap, title: 'Educação', description: 'Google for Education, Chromebooks e plataformas para gestão acadêmica.' },
  { icon: HeartPulse, title: 'Saúde', description: 'Soluções para hospitais e clínicas, com foco em LGPD e dados sensíveis.' }
];

export default function SobrePage() {
  return (
    <>
      <InternalHero
        breadcrumbs={[{ label: 'Sobre' }]}
        eyebrow="Quem somos"
        title={
          <>
            Tecnologia estratégica,{' '}
            <span className="font-serif italic font-normal text-gradient-brand">sem amarras</span>{' '}
            de fabricante.
          </>
        }
        description="Consultoria brasileira especializada em projetos de TI para empresas, governo e instituições de ensino e saúde. Premier Partner do Google e independência sobre todas as principais plataformas de nuvem."
        primaryCta={{ label: 'Falar com Especialista', href: '#falar-com-especialista' }}
        secondaryCta={{ label: 'Ver soluções', href: '/#solucoes' }}
        meta={[
          { value: '10+', label: 'Anos de operação' },
          { value: '200+', label: 'Clientes ativos' },
          { value: '4', label: 'Verticais atendidas' }
        ]}
        visual={
          <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-premium sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <Compass className="h-6 w-6" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-400">
                <Sparkles className="h-3 w-3" />
                Premier Partner
              </span>
            </div>

            <h2 className="mt-5 text-lg font-extrabold tracking-tight text-text-strong sm:text-xl">
              Nossa história
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
              Nascemos da convicção de que decisões de TI estratégica não deveriam estar presas a um único fornecedor.
              Por mais de uma década, nossos sócios construíram relacionamentos com os principais fabricantes de tecnologia do mundo.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-text-muted">
              Hoje, somos uma operação independente focada em entregar projetos que vão da infraestrutura de Data Center
              ao software de gestão, com a liberdade de recomendar exatamente a tecnologia que cada cliente precisa.
            </p>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface-soft px-3.5 py-3">
              <ScrollText className="h-4 w-4 shrink-0 text-brand-400" />
              <p className="text-[12px] leading-snug text-text">
                <span className="font-bold text-text-strong">Programa de Integridade</span> · documentos publicados.
              </p>
            </div>
          </div>
        }
      />

      <section className="border-b border-border bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="O que nos diferencia"
            title="Quatro pilares que sustentam cada projeto."
            description="Diferenciais que aparecem em todos os contratos da Hypercloud — empresa privada, governo ou instituição."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  <div className="inline-flex rounded-xl bg-brand-500/10 p-2.5 text-brand-400">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-text-strong">{pillar.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-text-muted">{pillar.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-b border-border bg-surface-soft py-20 sm:py-24">
        <div className="container-shell">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
                <span className="h-1 w-1 rounded-full bg-brand-500" />
                Nosso compromisso
              </span>
              <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                Compliance não é diferencial. É pré-requisito.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
                A Hypercloud opera sob um Programa de Integridade formal, com Código de Ética, Canal de Denúncias e
                políticas de conformidade publicadas. Para nós, transparência é parte do contrato.
              </p>
              <Link
                href="/setor-publico"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-gradient px-5 py-3 text-[13px] font-bold text-white shadow-brand transition hover:opacity-95"
              >
                Acessar políticas de compliance
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-surface-card p-7 shadow-soft">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-subtle">Documentos publicados</p>
              <ul className="mt-5 space-y-3 text-[14px] text-text">
                {[
                  'Código de Conduta Disciplinar',
                  'Código de Ética e Conduta',
                  'Código de Ética para Fornecedores',
                  'Política de Procedimentos',
                  'Programa de Integridade'
                ].map((doc) => (
                  <li key={doc} className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-500/10 text-brand-400">
                      <ScrollText className="h-3.5 w-3.5" />
                    </span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Setores que atendemos"
            title="Quatro verticais com jornada própria."
            description="Cada vertical recebe linguagem, cases e desenho de oferta apropriados à sua realidade — sem se misturar com as demais."
            centered
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <StaggerItem key={sector.title}>
                <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  <div className="inline-flex rounded-xl bg-brand-500/10 p-2.5 text-brand-400">
                    <sector.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold tracking-tight text-text-strong">{sector.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{sector.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <SpecialistCta
        title="Quer começar uma conversa com a Hypercloud?"
        description="Três passos rápidos pra a gente entender seu cenário. Especialista preparado responde em até 1 dia útil."
      />
    </>
  );
}
