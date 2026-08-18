import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { company } from '@/constants/company';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: `Política de Privacidade e Proteção de Dados da ${company.tradeName} em conformidade com a LGPD (Lei 13.709/2018).`,
  alternates: {
    canonical: '/politica-de-privacidade'
  }
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="py-16 sm:py-20">
      <div className="container-shell max-w-4xl">
        <Breadcrumbs items={[{ label: 'Política de Privacidade' }]} />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-text-strong sm:text-4xl">
          Política de Privacidade e Proteção de Dados
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Última atualização: 13 de agosto de 2026 · Versão 1.0 (LGPD Compliance)
        </p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-text-muted">
          <section>
            <h2 className="text-xl font-bold text-text-strong">1. Quem somos e compromisso</h2>
            <p className="mt-3">
              A <strong>{company.legalName}</strong> (nome fantasia <strong>{company.tradeName}</strong>), inscrita no CNPJ sob o nº <strong>{company.cnpj}</strong>, com sede em {company.address.city} - {company.address.state}, é controladora de dados pessoais no âmbito dos serviços de intermediação, consultoria e distribuição de soluções Google Cloud, Google Workspace, Gemini Enterprise e AppSheet.
            </p>
            <p className="mt-2">
              Respeitamos rigorosamente a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD) e estabelecemos esta política para demonstrar como coletamos, usamos, armazenamos e protegemos seus dados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">2. Dados Pessoais Coletados</h2>
            <p className="mt-3">
              Coletamos os dados necessários para o atendimento comercial B2B/B2G, qualificação de propostas e prestação de suporte técnico:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li><strong>Dados de identificação e contato:</strong> Nome completo, e-mail corporativo, telefone/WhatsApp, empresa e cargo.</li>
              <li><strong>Dados de perfil empresarial:</strong> Porte da empresa, setor de atuação (privado, público, saúde, educação) e interesse em soluções tecnológicas.</li>
              <li><strong>Dados de navegação e atribuição:</strong> Endereço IP, dados de cookies, parâmetros UTM de campanha, referrer e páginas visitadas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">3. Finalidades do Tratamento</h2>
            <p className="mt-3">Seus dados pessoais são tratados para as seguintes finalidades legítimas:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li>Atendimento a solicitações de cotação, propostas comerciais e elaboração de minutas de contratação;</li>
              <li>Instalação, migração e suporte técnico das licenças contratadas;</li>
              <li>Atendimento a exigências formais de órgãos públicos em processos de dispensa, inexigibilidade ou adesão a ATAs;</li>
              <li>Comunicação institucional e envio de novidades sobre atualizações dos produtos Google Cloud (mediante consentimento).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">4. Compartilhamento de Dados</h2>
            <p className="mt-3">
              Não vendemos nem alugamos dados pessoais. O compartilhamento ocorre exclusivamente com parceiros estritamente necessários para a prestação do serviço:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li><strong>Google LLC / Google Brasil:</strong> Para fornecimento e provisionamento oficial de licenças no programa Premier Partner;</li>
              <li><strong>Provedores de infraestrutura e e-mail:</strong> Serviços de mensageria corporativa com criptografia e padrões de segurança de mercado.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">5. Direitos do Titular de Dados</h2>
            <p className="mt-3">
              Nos termos do artigo 18 da LGPD, você possui direito a confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou solicitar a eliminação dos seus dados pessoais dos nossos cadastros ativamente mantidos.
            </p>
            <p className="mt-2">
              Para exercer qualquer um destes direitos, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: <a href={`mailto:${company.emails.contato}`} className="text-brand-500 font-semibold hover:underline">{company.emails.contato}</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-strong">6. Segurança da Informação</h2>
            <p className="mt-3">
              Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acessos não autorizados, destruição, perda ou alteração. Todo o tráfego em nosso site é protegido por criptografia HTTPS (TLS 1.3).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
