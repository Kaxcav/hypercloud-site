export type CaseStudy = {
  id: string;
  client: string;
  vertical: string;
  metric: { value: string; label: string };
  challenge: string;
  outcome: string;
  product: 'workspace' | 'gemini' | 'cloud' | 'appsheet' | 'multi';
  /** Marca conteúdo placeholder até o cliente fornecer dados reais */
  placeholder?: boolean;
};

/**
 * NOTA — Conteúdo abaixo é placeholder ilustrativo.
 * Substituir por cases reais com nome do cliente, métrica e link público autorizado.
 */
export const cases: CaseStudy[] = [
  {
    id: 'industria-acme',
    client: 'Indústria Acme',
    vertical: 'Indústria · 1.200 colaboradores',
    metric: { value: '38%', label: 'Redução de tempo em reuniões' },
    challenge: 'Reuniões longas e dispersas, difíceis de acompanhar entre fábrica e administrativo.',
    outcome: 'Adoção do Take Notes for Me (Gemini no Meet) com atas automáticas e itens de ação distribuídos via Drive.',
    product: 'gemini',
    placeholder: true
  },
  {
    id: 'cidade-digital',
    client: 'Prefeitura · Cidade Digital',
    vertical: 'Setor Público · 4.800 servidores',
    metric: { value: '6 meses', label: 'Migração concluída' },
    challenge: 'Modernizar a infraestrutura de e-mail e colaboração com aderência à Nova Lei de Licitações.',
    outcome: 'Adesão à ATA com migração completa para Workspace Enterprise + Vault e DLP, dentro do prazo legal.',
    product: 'workspace',
    placeholder: true
  },
  {
    id: 'rede-saude',
    client: 'Rede Hospitalar Norte',
    vertical: 'Saúde · 2.300 colaboradores',
    metric: { value: '4×', label: 'Velocidade em automações operacionais' },
    challenge: 'Processos manuais de admissão de paciente, ronda de enfermagem e checklist de equipamento.',
    outcome: 'AppSheet integrado ao Workspace para apps internos sem código, com governança centralizada.',
    product: 'appsheet',
    placeholder: true
  }
];

export const clientLogos = [
  { name: 'Cliente A', placeholder: true },
  { name: 'Cliente B', placeholder: true },
  { name: 'Cliente C', placeholder: true },
  { name: 'Cliente D', placeholder: true },
  { name: 'Cliente E', placeholder: true },
  { name: 'Cliente F', placeholder: true },
  { name: 'Cliente G', placeholder: true },
  { name: 'Cliente H', placeholder: true }
];
