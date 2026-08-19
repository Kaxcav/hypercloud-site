import type { Metadata } from 'next';
import Image from 'next/image';
import { Award, CheckCircle2, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { CaseStudies } from '@/components/CaseStudies';
import { SpecialistCta } from '@/components/SpecialistCta';
import { googleCredentials, trackRecord } from '@/constants/cases';
import { badges } from '@/constants/badges';

export const metadata: Metadata = {
  title: 'Cases e Credenciais',
  description:
    'Credenciais oficiais Google Cloud Premier Partner, especializações técnicas e ATAs de Registro de Preços vigentes para o setor público e privado.'
};

export default function CasesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container-shell relative py-14 sm:py-16 lg:py-20">
          <Breadcrumbs items={[{ label: 'Cases e Credenciais' }]} />
          <h1 className="mt-5 max-w-3xl text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            Resultados comprovados em números, não apenas em papéis e certificações.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
            Reduzir a fatura de nuvem, migrar sem interromper a operação e automatizar com IA o
            que consome o tempo do time. É isso que os projetos precisam entregar — e é isso que
            aparece aqui.
          </p>
        </div>
      </section>

      <CaseStudies />

      <section className="bg-surface-base py-16 sm:py-20 lg:py-24">
        <div className="container-shell">
          <SectionHeader
            title="Credenciais emitidas e auditadas pela própria Google."
            description="Para ser Premier Partner e ter Especialização, a equipe técnica passa por avaliações rigorosas de arquitetura, segurança e atendimento."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {googleCredentials.map((cred) => {
              const badgeObj = badges.find((b) => b.file.includes(cred.badgeKey)) || badges[0];
              return (
                <article
                  key={cred.id}
                  className="flex flex-col rounded-2xl border border-border bg-surface-card p-7 shadow-soft transition hover:border-brand-500/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-400">
                      <Award className="h-3.5 w-3.5" />
                      {cred.category}
                    </span>
                    <Image
                      src={badgeObj.file}
                      alt={badgeObj.alt}
                      width={160}
                      height={50}
                      className="h-10 w-auto object-contain"
                    />
                  </div>

                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-text-strong sm:text-2xl">
                    {cred.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {cred.description}
                  </p>

                  <div className="mt-6 mt-auto flex items-start gap-2.5 rounded-xl border border-border bg-surface-soft p-4 text-xs text-text-strong">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span><strong>Garantia ao cliente:</strong> {cred.guarantee}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl border border-border bg-surface-soft p-8 sm:p-10">
            <h3 className="text-xl font-bold tracking-tight text-text-strong">
              Todas as 7 Credenciais Ativas no Portal Google Partner
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Nossa equipe mantém certificações continuadas cobrindo Workspace, Cloud Infrastructure, Security e AppSheet.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {badges.map((b) => (
                <div key={b.label} className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-card p-4 text-center">
                  <Image src={b.file} alt={b.alt} width={120} height={40} className="h-10 w-auto object-contain" />
                  <span className="mt-3 text-[11px] font-semibold text-text-muted">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SpecialistCta
        title="Quer validar como essas credenciais se aplicam ao seu projeto?"
        description="Fale com nosso time de engenharia e receba a documentação técnica de habilitação da Hypercloud."
      />
    </>
  );
}
