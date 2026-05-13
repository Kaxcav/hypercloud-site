// app/preview/page.tsx
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { BadgesShowcase } from '@/components/BadgesShowcase';
import { PricingGrid } from '@/components/PricingGrid';
import { CompareAllTable } from '@/components/CompareAllTable';
import { OtherSolutions } from '@/components/OtherSolutions';
import { Faq } from '@/components/Faq';
import { SpecialistCta } from '@/components/SpecialistCta';

export const metadata: Metadata = {
  title: 'Preview — Home Pricing-First',
  description: 'Preview interno da nova home Hypercloud. Não indexar.',
  robots: { index: false, follow: false }
};

export default function PreviewPage() {
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
