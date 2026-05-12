import {
  BrainCircuit,
  Building2,
  Cloud,
  Workflow
} from 'lucide-react';
import { ComparisonExplorer } from '@/components/ComparisonExplorer';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeader } from '@/components/SectionHeader';
import { SpecialistCta } from '@/components/SpecialistCta';
import { AtasStrip } from '@/components/AtasStrip';
import { Hero } from '@/components/Hero';
import { InvestmentEstimator } from '@/components/InvestmentEstimator';
import { Cases } from '@/components/Cases';
import { WhyHypercloud } from '@/components/WhyHypercloud';
import { Process } from '@/components/Process';
import { Faq } from '@/components/Faq';
import { Stagger, StaggerItem } from '@/components/MotionWrapper';

const products = [
  {
    title: 'Google Workspace',
    description:
      'Gmail corporativo, Drive, Meet, Docs e Sheets com administração centralizada e comparação entre os principais planos.',
    href: '/solucoes/google-workspace',
    badge: 'Workspace',
    iconNode: <Building2 className="h-5 w-5" />,
    tone: 'blue' as const
  },
  {
    title: 'Google Cloud',
    description:
      'Infraestrutura, dados, modernização e segurança em Google Cloud com abordagem consultiva para empresas e instituições.',
    href: '/solucoes/google-cloud',
    badge: 'Cloud',
    iconNode: <Cloud className="h-5 w-5" />,
    tone: 'green' as const
  },
  {
    title: 'Workspace with Gemini',
    description:
      'IA aplicada ao Gmail, Docs, Meet e ao fluxo de trabalho com foco em produtividade e aceleração operacional.',
    href: '/solucoes/gemini-enterprise',
    badge: 'Gemini',
    iconNode: <BrainCircuit className="h-5 w-5" />,
    tone: 'purple' as const
  },
  {
    title: 'AppSheet',
    description:
      'Automação sem código para processos internos, formulários, aprovações e operações com baixo atrito.',
    href: '/solucoes/appsheet',
    badge: 'AppSheet',
    iconNode: <Workflow className="h-5 w-5" />,
    tone: 'yellow' as const
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <AtasStrip />

      <section id="solucoes" className="bg-surface-soft py-20 sm:py-24 lg:py-28">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Produtos principais"
            title={
              <>
                O stack Google em arquitetura <span className="font-serif italic font-normal text-gradient-brand">comercial clara</span>.
              </>
            }
            description="Workspace como vitrine principal, Gemini como camada de IA, Google Cloud como oferta consultiva e AppSheet como automação. Cada um com sua jornada — sem misturar discurso."
          />
          <Stagger className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <StaggerItem key={product.title}>
                <ProductCard
                  title={product.title}
                  description={product.description}
                  href={product.href}
                  badge={product.badge}
                  iconNode={product.iconNode}
                  tone={product.tone}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <WhyHypercloud />

      <Cases />

      <section id="comparador-section" className="bg-surface-soft py-20 sm:py-24 lg:py-28">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Comparador interativo"
            title="Compare Google Workspace, Gemini e soluções Google lado a lado."
            description="Sem preços públicos. Filtre por necessidade, veja o plano recomendado, compartilhe a comparação por link."
          />
          <ComparisonExplorer />
        </div>
      </section>

      <Process />

      <InvestmentEstimator />

      <Faq />

      <SpecialistCta />
    </>
  );
}
