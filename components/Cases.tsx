import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';
import { googleCredentials, trackRecord } from '@/constants/cases';
import { badges } from '@/constants/badges';
import { SectionHeader } from '@/components/SectionHeader';
import { Reveal, Stagger, StaggerItem } from '@/components/MotionWrapper';

export function Cases() {
  return (
    <section id="cases" className="bg-surface-base py-20 sm:py-24 lg:py-28">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Credenciais & Autoridade"
          title="Credibilidade verificável na prática."
          description="Enquanto outros prometem resultados com dados fictícios, fundamentamos nossa atuação no selo Google Cloud Premier Partner e em auditorias formais."
        />

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {googleCredentials.map((cred) => {
            const badgeObj = badges.find((b) => b.file.includes(cred.badgeKey)) || badges[0];
            return (
              <StaggerItem key={cred.id}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand-500/30">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-400">
                      <Award className="h-3 w-3" />
                      {cred.category}
                    </span>
                  </div>

                  <div className="mt-5 flex h-16 items-center">
                    <Image
                      src={badgeObj.file}
                      alt={badgeObj.alt}
                      width={180}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-extrabold tracking-tight text-text-strong">
                    {cred.title}
                  </h3>

                  <p className="mt-2.5 text-[13px] leading-relaxed text-text-muted">
                    {cred.description}
                  </p>

                  <div className="mt-auto pt-5">
                    <div className="flex items-start gap-2 rounded-xl border border-border bg-surface-soft p-3 text-[12px] text-text">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="leading-tight">{cred.guarantee}</span>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-500/8 via-surface-card to-surface-card p-7 shadow-soft sm:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" aria-hidden />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_2fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
                  Garantia Institucional
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-text-strong sm:text-[28px] sm:leading-tight">
                  Segurança para contratação direta, órgãos públicos e grandes empresas.
                </h3>
                <Link
                  href="/cases"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-brand-400 transition hover:text-brand-300"
                >
                  Ver todas as credenciais e ATAs vigentes
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {trackRecord.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-border bg-surface-soft p-4 sm:p-5">
                    <dd className="font-extrabold text-[28px] leading-none tracking-tight text-brand-400 sm:text-[34px]">
                      {item.value}
                    </dd>
                    <dt className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-text-subtle">
                      {item.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
