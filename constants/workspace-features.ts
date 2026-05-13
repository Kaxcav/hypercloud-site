// constants/workspace-features.ts
import type { WorkspacePlanId } from './workspace-plans';

export type FeatureBlock = 'Geral' | 'Armaz.' | 'Colab.' | 'Comun.' | 'Segur.' | 'Compl.';

export type CellValue =
  | { kind: 'check' }
  | { kind: 'cross' }
  | { kind: 'text'; value: string };

export type WorkspaceFeatureRow = {
  block: FeatureBlock;
  feature: string;
  values: Record<WorkspacePlanId, CellValue>;
};

const check: CellValue = { kind: 'check' };
const cross: CellValue = { kind: 'cross' };
const text = (value: string): CellValue => ({ kind: 'text', value });

export const workspaceFeatures: WorkspaceFeatureRow[] = [
  // Geral
  {
    block: 'Geral',
    feature: 'Gmail (e-mail corporativo)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': cross,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Geral',
    feature: 'Limite de usuários',
    values: {
      'wks-fl-starter': text('Ilim.'),
      'wks-fl-std': text('Ilim.'),
      'wks-fl-plus': text('Ilim.'),
      'wks-ent-essentials': text('Ilim.'),
      'wks-ent-essentials-plus': text('Ilim.'),
      'wks-ent-starter': text('Ilim.'),
      'wks-ent-std': text('Ilim.'),
      'wks-ent-plus': text('Ilim.')
    }
  },
  // Armaz.
  {
    block: 'Armaz.',
    feature: 'Espaço por usuário',
    values: {
      'wks-fl-starter': text('5 GB'),
      'wks-fl-std': text('5 GB'),
      'wks-fl-plus': text('5 GB'),
      'wks-ent-essentials': text('1 TB'),
      'wks-ent-essentials-plus': text('5 TB'),
      'wks-ent-starter': text('1 TB'),
      'wks-ent-std': text('5 TB'),
      'wks-ent-plus': text('5 TB+')
    }
  },
  {
    block: 'Armaz.',
    feature: 'Drives compartilhados',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  // Colab.
  {
    block: 'Colab.',
    feature: 'Google Docs, Sheets, Slides',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Colab.',
    feature: 'AppSheet (apps sem código)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  // Comun.
  {
    block: 'Comun.',
    feature: 'Meet: participantes',
    values: {
      'wks-fl-starter': text('100'),
      'wks-fl-std': text('100'),
      'wks-fl-plus': text('100'),
      'wks-ent-essentials': text('150'),
      'wks-ent-essentials-plus': text('500'),
      'wks-ent-starter': text('250'),
      'wks-ent-std': text('500'),
      'wks-ent-plus': text('1.000')
    }
  },
  {
    block: 'Comun.',
    feature: 'Meet: gravação no Drive',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Comun.',
    feature: 'Meet: cancelamento de ruído',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Comun.',
    feature: 'Meet: transmissão ao vivo (domínio)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': text('10k'),
      'wks-ent-starter': cross,
      'wks-ent-std': text('10k'),
      'wks-ent-plus': text('100k')
    }
  },
  // Segur.
  {
    block: 'Segur.',
    feature: 'MDM básico (mobile)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': check,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'MDM avançado (wipe, app mgmt)',
    values: {
      'wks-fl-starter': check,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': check,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Context-Aware Access',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Central de Segurança',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Criptografia S/MIME',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': cross,
      'wks-ent-starter': cross,
      'wks-ent-std': cross,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Segur.',
    feature: 'Criptografia do lado do cliente (CSE)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': cross,
      'wks-ent-starter': cross,
      'wks-ent-std': cross,
      'wks-ent-plus': check
    }
  },
  // Compl.
  {
    block: 'Compl.',
    feature: 'Google Vault (retenção / eDiscovery)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Compl.',
    feature: 'DLP (Data Loss Prevention)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Compl.',
    feature: 'Cloud Identity Premium',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': check,
      'wks-fl-plus': check,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  },
  {
    block: 'Compl.',
    feature: 'Regiões de Dados (Data Locality)',
    values: {
      'wks-fl-starter': cross,
      'wks-fl-std': cross,
      'wks-fl-plus': cross,
      'wks-ent-essentials': cross,
      'wks-ent-essentials-plus': check,
      'wks-ent-starter': cross,
      'wks-ent-std': check,
      'wks-ent-plus': check
    }
  }
];

/** Ordem fixa das colunas — usado pelo CompareAllTable como source of truth. */
export const workspacePlanOrder: WorkspacePlanId[] = [
  'wks-fl-starter',
  'wks-fl-std',
  'wks-fl-plus',
  'wks-ent-essentials',
  'wks-ent-essentials-plus',
  'wks-ent-starter',
  'wks-ent-std',
  'wks-ent-plus'
];

/** Colunas curadas para o modo mobile-compacto do CompareAllTable. */
export const workspacePlanMobileCurated: WorkspacePlanId[] = [
  'wks-fl-plus',
  'wks-ent-std',
  'wks-ent-plus'
];
