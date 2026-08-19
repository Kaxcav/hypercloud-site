import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Compass,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  ScrollText,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  UserRound
} from 'lucide-react';
import { InternalHero } from '@/components/InternalHero';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';

export const metadata: Metadata = {
  title: 'Sobre a Hypercloud',
  description:
    'Consultoria brasileira de TI para empresas, governo e instituições. Premier Partner do Google, com foco em ROI, adoção e atendimento direto por engenheiros.'
};

// Pilares no recorte comercial: o que o cliente sente na relação, não a
// prateleira de credenciais (essa vive em /cases e nos selos da home).
const pillars = [
  {
    icon: TrendingDown,
    title: 'FinOps & ROI',
    description:
      'Cada projeto começa pela conta que já existe. Auditamos licenças, edições e arquitetura antes de propor qualquer coisa nova — e o resultado é medido no orçamento, não em slide.'
  },
  {
    icon: Headset,
    title: 'Atendimento sem intermediários',
    description:
      'Você fala direto com engenharia N2/N3. Sem Nível 1 lendo script, sem fila de triagem para descrever de novo o mesmo problema a cada contato.'
  },
  {
    icon: GraduationCap,
    title: 'Adoção & Treinamento',
    description:
      'A ferramenta é cerca de 10% do projeto. O resto é gente usando — por isso o onboarding treina as áreas de negócio, não só a TI, até a rotina virar hábito.'
  },
  {
    icon: ShieldCheck,
    title: 'Segurança & Governança',
    description:
      'Controle de acesso, retenção e rastreabilidade desenhados junto com a operação, com adequação à LGPD tratada como requisito de projeto e não como anexo.'
  }
];

// {/* CONFIRMAR: nomes, cargos e fotos reais do time. Enquanto não chegam, os
//     slots ficam neutros — sem stock, sem rosto inventado. */}
const team = [
  { role: 'Liderança técnica' },
  { role: 'Engenharia de nuvem' },
  { role: 'Adoção e treinamento' },
  { role: 'Setor público' }
];

const sectors = [
  { icon: Building2, title: 'Empresas privadas', description: 'Infraestrutura, produtividade e segurança em escala corporativa.' },
  { icon: Landmark, title: 'Governo', description: 'Aquisições via ATAs, modernização e transformação digital do setor público.' },
  { icon: GraduationCap, title: 'Educação', description: 'Google for Education, Chromebooks e plataformas para gestão acadêmica.' },
  { icon: HeartPulse, title: 'Saúde', description: 'Soluções para hospitais e clínicas, com foco em LGPD e dados sensíveis.' }
];

const manifesto = [
  {
    title: 'Recomendação honesta vale mais que uma venda.',
    body: 'Se uma solução mais simples ou mais barata resolve, é ela que entra na proposta. Perder um upgrade é mais barato que perder a confiança de quem assina o contrato.'
  },
  {
    title: 'Resultado prático, não entrega formal.',
    body: 'Projeto encerrado com o ambiente de pé e ninguém usando não é projeto entregue. A régua é a operação rodando melhor do que rodava antes.'
  },
  {
    title: 'Quem atende é quem entende.',
    body: 'O engenheiro que desenhou o ambiente é o mesmo que responde quando ele falha. É o que sustenta um plantão que resolve em vez de escalar.'
  }
];

export default function SobrePage() {
  return (
    <>
      <InternalHero
        breadcrumbs={[{ label: 'Sobre' }]}
        title="Tecnologia de ponta com atendimento humano e foco real no seu ROI."
        description="Nascemos para acabar com o suporte burocrático e as soluções de TI caras que não geram resultado prático."
        primaryCta={{ label: 'Conhecer Nossa Equipe', href: '#equipe' }}
        secondaryCta={{ label: 'Falar com Engenheiro', href: '#falar-com-especialista' }}
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

      {/* Manifesto — os valores em primeira pessoa, antes de qualquer credencial. */}
      <section className="border-b border-border bg-surface-soft py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            title="O que a gente combina antes de começar."
            description="Três compromissos que valem para empresa privada, governo ou instituição — e que a equipe comercial não tem autorização para flexibilizar."
            maxWidth="narrow"
          />
          <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
            {manifesto.map((item) => (
              <div key={item.title} className="py-7">
                <h3 className="text-lg font-extrabold tracking-tight text-text-strong sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quem faz acontecer — fotos reais entram aqui. */}
      <section id="equipe" className="border-b border-border bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            title="Quem faz acontecer."
            description="Aqui você não fala com robôs. Fala com engenheiros que conhecem o seu negócio pelo nome."
            maxWidth="narrow"
          />
          {/* CONFIRMAR: substituir os slots abaixo por fotos reais do time,
              com nome e cargo de cada pessoa. */}
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.role}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-surface-card p-6 text-center shadow-soft">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-border bg-surface-muted text-text-subtle"
                  >
                    <UserRound className="h-8 w-8" />
                  </span>
                  <p className="mt-4 text-[13.5px] font-bold text-text-strong">{member.role}</p>
                  <p className="mt-1 text-[12.5px] text-text-subtle">Foto e nome em breve</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="diferenciais" className="border-b border-border bg-surface-soft py-20 sm:py-24">
        <div className="container-shell">
          <SectionHeader
            title="Quatro pilares que sustentam cada projeto."
            description="Diferenciais que aparecem em todos os contratos da Hypercloud — empresa privada, governo ou instituição."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div className="h-full rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
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

      <section className="border-b border-border bg-surface-base py-20 sm:py-24">
        <div className="container-shell">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                Compliance não é diferencial. É pré-requisito.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
                A Hypercloud opera sob um Programa de Integridade formal, com Código de Ética, Canal de Denúncias e
                políticas de conformidade publicadas. Para nós, transparência é parte do contrato.
              </p>
              <p className="mt-5 rounded-xl border border-brand-500/25 bg-brand-500/5 px-5 py-4 text-[14.5px] leading-relaxed text-text-default">
                Se identificarmos que uma solução mais simples ou mais barata atende perfeitamente
                sua demanda, nós seremos os primeiros a te recomendar essa opção.
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
            title="Quatro verticais com jornada própria."
            description="Cada vertical recebe linguagem, cases e desenho de oferta apropriados à sua realidade — sem se misturar com as demais."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <StaggerItem key={sector.title}>
                <div className="h-full rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
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
