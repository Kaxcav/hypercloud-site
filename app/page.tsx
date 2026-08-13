// app/page.tsx
import { Hero } from '@/components/Hero';
import { BadgesShowcase } from '@/components/BadgesShowcase';
import { PlansGrid } from '@/components/PlansGrid';
import { CompareAllTable } from '@/components/CompareAllTable';
import { OtherSolutions } from '@/components/OtherSolutions';
import { Faq } from '@/components/Faq';
import { SpecialistCta } from '@/components/SpecialistCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <div
        className="h-[3px] w-full bg-gradient-to-r from-google-blue via-google-red via-google-yellow to-google-green"
        aria-hidden="true"
      />
      <BadgesShowcase />
      <PlansGrid />
      <section id="compare-all"><CompareAllTable /></section>
      <OtherSolutions />
      <Faq />
      <SpecialistCta />
    </>
  );
}
