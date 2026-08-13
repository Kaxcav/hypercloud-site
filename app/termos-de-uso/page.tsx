import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { company } from '@/constants/company';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: `Termos e Condições de Uso do site oficial da ${company.tradeName}.`,
  alternates: {
    canonical: '/termos-de-uso'
  }
};

export default function TermosDeUsoPage() {
  return (
    <main className="py-16 sm:py-20">
      <div className="container-shell max-w-4xl">
        <Breadcrumbs items={[{ label: 'Termos de Uso' }]} />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
          Termos e Condições de Uso
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Última atualização: 13 de agosto de 2026
        </p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-text-muted">
          <section>
            <h2 className="text-xl font-bold text-text-strong">1. Aceitação dos Termos</h2>
            <p className="mt-3">
              Ao acessar e utilizar o site institucional da <strong>{company.legalName}</strong> (<strong>{company.tradeName}</strong>), você concorda integralmente com estes Termos de Uso e com a nossa Política de Privacidade. Caso não concorde com qualquer condição, solicitamos que interrompa a navegação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">2. Natureza do Serviço e Cotações</h2>
            <p className="mt-3">
              O site da Hypercloud destina-se a apresentar soluções de tecnologia corporativa e governamental (Google Workspace, Gemini, Google Cloud e AppSheet).
            </p>
            <p className="mt-2">
              As informações técnicas e descritivos de planos disponíveis no site servem como referência de escopo. As propostas comerciais definitivas e valores contratualizados dependem de cotação formal emitida pela equipe comercial da Hypercloud, considerando volume, prazos, modelo de licenciamento e regramento licitatório (ATAs/Pregões para setor público).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">3. Propriedade Intelectual</h2>
            <p className="mt-3">
              As marcas "Hypercloud", a identidade visual, logos, textos e código do site são de propriedade exclusiva da Hypercloud. As marcas Google, Google Cloud, Google Workspace, Gemini e AppSheet são marcas registradas da Google LLC.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">4. Atendimento e Suporte</h2>
            <p className="mt-3">
              Os canais de atendimento e suporte indicados no site funcionam em horário comercial ({company.phone.display} / {company.emails.comercial}), com SLAs estipulados individualmente no contrato de prestação de serviços assinado entre as partes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">5. Foro e Legislação Aplicável</h2>
            <p className="mt-3">
              Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de Contagem/MG para dirimir quaisquer controvérsias oriundas da utilização deste site.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
