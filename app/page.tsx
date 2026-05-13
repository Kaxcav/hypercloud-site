// app/page.tsx
import { Hero } from '@/components/Hero';
import { BadgesShowcase } from '@/components/BadgesShowcase';
import { PricingGrid } from '@/components/PricingGrid';
import { CompareAllTable } from '@/components/CompareAllTable';
import { OtherSolutions } from '@/components/OtherSolutions';
import { Faq } from '@/components/Faq';
import { SpecialistCta } from '@/components/SpecialistCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BadgesShowcase />
      <section id="pricing"><PricingGrid /></section>
      <section id="compare-all"><CompareAllTable /></section>
      <OtherSolutions />
      <Faq />
      <SpecialistCta />
    </>
  );
}
