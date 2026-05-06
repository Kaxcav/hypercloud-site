/**
 * Conteúdo mockado do /dashboard.
 * Tudo abaixo é estático e ilustrativo — substitua por integração real
 * com API da Hypercloud quando disponível.
 */

export const dashboardLicenses = [
  { product: 'Google Workspace Plus', count: 42, status: 'ativa' as const, renewsAt: '2026-09-12' },
  { product: 'Google Workspace with Gemini', count: 12, status: 'ativa' as const, renewsAt: '2026-08-30' },
  { product: 'AppSheet Core', count: 6, status: 'em-piloto' as const, renewsAt: '2026-07-01' }
];

export const dashboardTickets = [
  {
    id: 'HC-2814',
    title: 'Configurar DLP para domínio @financeiro',
    status: 'aberto' as const,
    priority: 'alta' as const,
    updatedAt: '2026-05-05'
  },
  {
    id: 'HC-2802',
    title: 'Revisar Vault retention policy',
    status: 'em-andamento' as const,
    priority: 'media' as const,
    updatedAt: '2026-05-03'
  },
  {
    id: 'HC-2785',
    title: 'Onboarding de 8 novos usuários — engenharia',
    status: 'resolvido' as const,
    priority: 'baixa' as const,
    updatedAt: '2026-04-28'
  }
];

export const dashboardTimeline = [
  { date: '2026-05-05', label: 'Ticket HC-2814 aberto' },
  { date: '2026-05-03', label: 'HC-2802 movido para Em Andamento' },
  { date: '2026-04-28', label: 'HC-2785 resolvido — 8 usuários provisionados' },
  { date: '2026-04-22', label: 'Renovação confirmada — Workspace Plus' },
  { date: '2026-04-15', label: 'Reunião trimestral com gerente de conta' }
];

export const dashboardUsage = {
  storageUsedTb: 142,
  storageQuotaTb: 210,
  meetMinutesMonth: 18420,
  geminiUsesMonth: 6210
};
