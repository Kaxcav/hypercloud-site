import type { Metadata } from 'next';
import { CompareAllTable } from '@/components/CompareAllTable';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SpecialistCta } from '@/components/SpecialistCta';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Google Workspace vs Microsoft 365 — Comparativo Técnico Completo',
  description:
    'Análise comparativa imparcial entre Google Workspace e Microsoft 365: recursos, custos, segurança, colaboração em tempo real e IA Gemini vs Copilot.',
  alternates: {
    canonical: '/comparativo/google-workspace-vs-microsoft-365'
  }
};

export default function ComparativoWorkspaceM365Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-hero-glow">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="container-shell relative py-14 sm:py-16 lg:py-20">
          <Breadcrumbs
            items={[
              { label: 'Comparativos', href: '/#compare-all' },
              { label: 'Google Workspace vs Microsoft 365' }
            ]}
          />
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
            Comparativo Técnico · TI Corporativa
          </span>
          <h1 className="mt-5 max-w-4xl text-balance text-[34px] font-extrabold leading-[1.06] tracking-tight text-text-strong sm:text-[44px] lg:text-[52px] lg:leading-[1.05]">
            Google Workspace vs Microsoft 365:{' '}
            <span className="font-extrabold text-gradient-brand">Qual a melhor escolha para sua empresa?</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
            Compare arquitetura cloud-native, facilidade de gerenciamento, colaboração simultânea sem conflito de arquivo, IA integrada e custo total de propriedade (TCO).
          </p>
        </div>
      </section>

      <section className="bg-surface-base py-16 sm:py-20">
        <div className="container-shell max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-brand-500/40 bg-surface-card p-7 shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Google Workspace</span>
              <h2 className="mt-2 text-2xl font-extrabold text-text-strong">Nativo na Nuvem e Colaborativo</h2>
              <ul className="mt-6 space-y-3 text-sm text-text">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span><strong>Zero conflito de versão:</strong> edição simultânea por 100+ pessoas no mesmo documento sem travar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span><strong>IA Gemini Integrada:</strong> resumos de reuniões, geração de texto e análises sem trocar de aplicativo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span><strong>Administração simplificada:</strong> Console de Admin unificado na web sem necessidade de PowerShell complexo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span><strong>Google Vault:</strong> retenção legal e eDiscovery nativo com busca ultra-rápida em milissegundos.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface-soft p-7 shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">Microsoft 365</span>
              <h2 className="mt-2 text-2xl font-extrabold text-text-strong">Legado Desktop e Suíte Tradicional</h2>
              <ul className="mt-6 space-y-3 text-sm text-text-muted">
                <li className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <span><strong>Dependência de apps instalados:</strong> sincronização via OneDrive sujeita a conflitos de arquivo e cópias locais.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <span><strong>Custo adicional de Copilot:</strong> exige add-on cobrado separadamente na maioria dos planos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <span><strong>Complexidade de licenças:</strong> dezenas de variações de SKUs e complementos difíceis de gerenciar.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/calculadora"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-bold text-white shadow-brand hover:opacity-95"
            >
              Simular Custo da sua Empresa na Calculadora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-soft py-16 sm:py-20 border-t border-border">
        <div className="container-shell">
          <h2 className="text-2xl font-extrabold text-text-strong text-center mb-10">
            Matriz de Recursos Detalhada por Edição
          </h2>
          <CompareAllTable />
        </div>
      </section>

      <SpecialistCta
        title="Quer uma avaliação comparativa para sua equipe?"
        description="Fale com nosso time de especialistas. Preparamos uma proposta comparando os recursos exatos usados na sua empresa."
      />
    </>
  );
}
