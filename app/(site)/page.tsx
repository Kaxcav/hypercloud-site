// app/(site)/page.tsx
import { Hero } from '@/components/Hero';
import { BadgesShowcase } from '@/components/BadgesShowcase';
import { SolutionsSection } from '@/components/SolutionsSection';
import { FinOpsCalculator } from '@/components/FinOpsCalculator';
import { QuoteQuiz } from '@/components/QuoteQuiz';
import { PlansGrid } from '@/components/PlansGrid';
import { CompareAllTable } from '@/components/CompareAllTable';
import { Faq } from '@/components/Faq';
import { SpecialistCta } from '@/components/SpecialistCta';

// Ordem da home segue o funil comercial: promessa de resultado, prova,
// a dor de custo primeiro (FinOps), a estimativa, o diagnóstico curto, e só
// então catálogo e comparativo para quem quer descer ao detalhe.
export default function HomePage() {
  return (
    <>
      <Hero />
      <div
        className="h-[3px] w-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"
        aria-hidden="true"
      />
      <BadgesShowcase />
      <SolutionsSection />
      <FinOpsCalculator />
      <QuoteQuiz />
      <PlansGrid />
      <section id="compare-all">
        <CompareAllTable />
      </section>
      <Faq />
      <SpecialistCta />
    </>
  );
}
