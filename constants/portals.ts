// constants/portals.ts
// URLs dos portais do ecossistema Hypercloud (spec DESIGN-SYSTEM-HYPERCLOUD §5.1).
// Configuráveis por ambiente via NEXT_PUBLIC_HSM_URL / NEXT_PUBLIC_HLM_URL,
// com defaults de desenvolvimento (HSM: Vite em 5173 · HLM: next dev -p 3001).

export type PortalKey = 'hsm' | 'hlm';

export interface Portal {
  key: PortalKey;
  name: string;
  shortLabel: string;
  badge: string;
  url: string;
}

export const portalUrls: Record<PortalKey, string> = {
  hsm: process.env.NEXT_PUBLIC_HSM_URL ?? 'http://localhost:5173',
  hlm: process.env.NEXT_PUBLIC_HLM_URL ?? 'http://localhost:3001'
};

export const portals: readonly Portal[] = [
  {
    key: 'hsm',
    name: 'Hypercloud Support Manager',
    shortLabel: 'Suporte',
    badge: 'HSM',
    url: portalUrls.hsm
  },
  {
    key: 'hlm',
    name: 'Hypercloud License Manager',
    shortLabel: 'Licenças',
    badge: 'HLM',
    url: portalUrls.hlm
  }
] as const;
