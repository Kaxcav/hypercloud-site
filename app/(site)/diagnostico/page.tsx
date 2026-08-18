import type { Metadata } from 'next';
import { ShieldCheck, ArrowRight, CheckCircle2, FileSpreadsheet, Zap } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SpecialistCta } from '@/components/SpecialistCta';

export const metadata: Metadata = {
  title: 'Diagnóstico Gratuito de Licenciamento',
  description:
    'Receba uma análise consultiva completa de consumo, licenças ociosas e potencial de otimização no Google Workspace e Google Cloud.',
  alternates: {
    canonical: '/diagnostico'
  }
};

export default function DiagnosticoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container-shell relative py-14 sm:py-16 lg:py-20">
          <Breadcrumbs items={[{ label: 'Diagnóstico Gratuito' }]} />
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
            <Zap className="h-3.5 w-3.5" />
            Diagnóstico de Licenciamento
          </span>
          <h1 className="mt-5 max-w-3xl text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            Sua empresa pode estar pagando por licenças{' '}
            <span className="font-extrabold text-gradient-brand">ociosas ou superdimensionadas</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
            Nossa equipe de engenharia analisa seu inventário atual (Google Workspace ou Microsoft 365) e entrega um relatório com recomendações de ajuste de SKUs, migração de tiers e estimativa de economia.
          </p>
        </div>
      </section>

      <section className="bg-surface-base py-16 sm:py-20">
        <div className="container-shell max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-text-strong">
                O que você recebe no relatório em 1 dia útil:
              </h2>
              <ul className="mt-6 space-y-4 text-sm text-text">
                {[
                  { title: 'Inventário de Contas Ativas vs Inativas', desc: 'Identificação de contas duplicadas ou sem uso recente no ambiente.' },
                  { title: 'Recomposição de Tiers (Frontline vs Enterprise)', desc: 'Mapeamento de usuários que não precisam do tier máximo e podem usar edições operacionais.' },
                  { title: 'Análise de Sobrecusto de Ferramentas Terceirizadas', desc: 'Identificação de softwares paralelos (Zoom, Dropbox, Docusign) substituíveis por ferramentas nativas do Workspace.' },
                  { title: 'Estimativa de Desconto por Volume e Contrato Plurianual', desc: 'Projeção financeira de redução do valor por usuário com faturamento direto em BRL.' }
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3 rounded-xl border border-border bg-surface-soft p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <div>
                      <p className="font-bold text-text-strong">{item.title}</p>
                      <p className="mt-1 text-xs text-text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface-card p-7 shadow-premium">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-400">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Solicitar Relatório Gratuito
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-text-strong">
                Preencha os dados da sua empresa
              </h3>
              <p className="mt-1 text-xs text-text-muted">
                Sem necessidade de conceder acessos de admin — apenas os dados agregados do seu contrato atual.
              </p>

              <div className="mt-6">
                <SpecialistCta
                  id="diagnostico-form"
                  title="Pronto para otimizar seus custos?"
                  description="Clique no botão para iniciar a solicitação em 3 passos."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
