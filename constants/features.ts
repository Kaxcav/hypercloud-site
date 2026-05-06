export type FeatureValue = boolean | string;

export type Feature = {
  id: string;
  label: string;
  tooltip?: string;
  values: Record<string, FeatureValue>;
};

export type FeatureCategory = {
  id: string;
  label: string;
  description?: string;
  features: Feature[];
};

export const comparisonPlanIds = [
  'workspace-starter',
  'workspace-standard',
  'workspace-plus',
  'workspace-enterprise'
] as const;

export const recommendedPlanId = 'workspace-plus';

export const featureMatrix: FeatureCategory[] = [
  {
    id: 'collaboration',
    label: 'Colaboração Base',
    description: 'Os fundamentos de produtividade e trabalho em equipe.',
    features: [
      {
        id: 'gmail-domain',
        label: 'Gmail corporativo com domínio próprio',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'drive',
        label: 'Google Drive, Docs, Sheets, Slides e Forms',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'shared-drive',
        label: 'Drives compartilhados de equipe',
        tooltip:
          'Drives geridos pela organização (e não pelo usuário individual). Garantem continuidade quando uma pessoa sai da empresa.',
        values: {
          'workspace-starter': false,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'calendar',
        label: 'Google Calendar com agendamento',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'storage',
        label: 'Espaço de armazenamento por usuário',
        values: {
          'workspace-starter': '30 GB',
          'workspace-standard': '2 TB',
          'workspace-plus': '5 TB',
          'workspace-enterprise': 'Personalizado'
        }
      }
    ]
  },
  {
    id: 'meet',
    label: 'Reuniões e Vídeo (Meet)',
    description: 'Capacidade de Meet, gravação e recursos avançados.',
    features: [
      {
        id: 'meet-participants',
        label: 'Participantes por reunião no Meet',
        values: {
          'workspace-starter': '100',
          'workspace-standard': '150',
          'workspace-plus': '500',
          'workspace-enterprise': '1.000'
        }
      },
      {
        id: 'meet-recording',
        label: 'Gravação de reuniões na nuvem',
        values: {
          'workspace-starter': false,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'meet-noise',
        label: 'Cancelamento de ruído e enquadramento',
        tooltip:
          'Filtra ruído de fundo e ajusta automaticamente o enquadramento da câmera durante a reunião.',
        values: {
          'workspace-starter': false,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'meet-livestream',
        label: 'Transmissão ao vivo no domínio',
        tooltip:
          'Transmite uma reunião do Meet para até 100.000 espectadores internos ao domínio da organização.',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': false,
          'workspace-enterprise': true
        }
      }
    ]
  },
  {
    id: 'security',
    label: 'Segurança Avançada',
    description:
      'Compliance, governança e proteção de dados em níveis crescentes.',
    features: [
      {
        id: 'two-step',
        label: 'Verificação em duas etapas (2FA)',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'vault',
        label: 'Google Vault',
        tooltip:
          'Retém, pesquisa e exporta e-mails, chats e arquivos para fins legais (eDiscovery e legal hold).',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'dlp',
        label: 'DLP — Data Loss Prevention',
        tooltip:
          'Previne vazamento de dados sensíveis (CPF, cartões, segredos) em Gmail, Drive e Chat com regras automáticas.',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'endpoint',
        label: 'Endpoint Management',
        tooltip:
          'Aplica políticas centralizadas a celulares, tablets e desktops corporativos: bloqueio remoto, limpeza, exigência de senha.',
        values: {
          'workspace-starter': 'Básico',
          'workspace-standard': 'Básico',
          'workspace-plus': 'Avançado',
          'workspace-enterprise': 'Enterprise'
        }
      },
      {
        id: 'smime',
        label: 'Criptografia S/MIME para Gmail',
        tooltip:
          'Assinatura digital e criptografia ponta a ponta de e-mails entre destinatários com certificados emitidos.',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': false,
          'workspace-enterprise': true
        }
      },
      {
        id: 'cloud-identity',
        label: 'Cloud Identity Premium',
        tooltip:
          'Gestão unificada de identidades, SSO, provisionamento e políticas de acesso enterprise.',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': false,
          'workspace-enterprise': true
        }
      }
    ]
  },
  {
    id: 'ai',
    label: 'IA & Gemini',
    description:
      'Google Workspace with Gemini aplicado a Gmail, Docs, Meet e fluxos de trabalho.',
    features: [
      {
        id: 'gemini-app',
        label: 'App Gemini com modelos avançados',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'gemini-gmail',
        label: 'Gemini no Gmail (escrita e resumo)',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'gemini-docs',
        label: 'Gemini no Docs e Sheets',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'gemini-meet',
        label: 'Take notes for me — anotações de reunião com IA',
        tooltip:
          'O Gemini participa da reunião, gera ata em tempo real, lista decisões e itens de ação.',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'notebooklm',
        label: 'NotebookLM Plus',
        tooltip:
          'Caderno com IA que entende seus próprios documentos, gera resumos, FAQs e podcasts a partir das fontes carregadas.',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      }
    ]
  },
  {
    id: 'support',
    label: 'Suporte Hypercloud',
    description: 'Atendimento consultivo brasileiro acima do suporte oficial Google.',
    features: [
      {
        id: 'onboarding',
        label: 'Onboarding consultivo de implementação',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'pt-support',
        label: 'Suporte técnico em português',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'training',
        label: 'Treinamento de adoção para equipe',
        values: {
          'workspace-starter': false,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      },
      {
        id: 'sla',
        label: 'SLA Enterprise dedicado',
        tooltip:
          'Atendimento prioritário com tempos de resposta contratados e gerente de conta nomeado.',
        values: {
          'workspace-starter': false,
          'workspace-standard': false,
          'workspace-plus': false,
          'workspace-enterprise': true
        }
      },
      {
        id: 'public-sector',
        label: 'Atendimento Setor Público (ATAs e licitações)',
        values: {
          'workspace-starter': true,
          'workspace-standard': true,
          'workspace-plus': true,
          'workspace-enterprise': true
        }
      }
    ]
  }
];
