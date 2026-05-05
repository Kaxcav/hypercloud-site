import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionHeader } from '@/components/SectionHeader';
import { getSolutionBySlug, solutions } from '@/constants/solutions';

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const solution = getSolutionBySlug(params.slug);
  if (!solution) {
    return { title: 'Solução não encontrada' };
  }
  return solution.metadata;
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = getSolutionBySlug(params.slug);

  if (!solution) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-surface-soft py-24 sm:py-28">
        <div className="container-shell max-w-5xl">
          <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            {solution.eyebrow}
          </span>
          <h1 className="mt-6 text-balance text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">{solution.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{solution.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="mailto:contato@hypercloud.com.br?subject=Quero%20falar%20sobre%20essa%20solu%C3%A7%C3%A3o"
              className="rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-brand transition hover:opacity-95"
            >
              Falar com Especialista
            </Link>
            <Link
              href="/#comparador"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600"
            >
              Comparar planos
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-shell max-w-5xl">
          <SectionHeader eyebrow="Visão técnica" title="Conteúdo específico e comercial por solução." description={solution.intro} />
          <div className="grid gap-4 md:grid-cols-2">
            {solution.bullets.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
