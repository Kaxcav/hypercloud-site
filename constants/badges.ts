// constants/badges.ts
export type Badge = {
  /** Caminho relativo a `/public`. Ex: '/logo/logos partner/x.jpeg'. */
  file: string;
  alt: string;
  /** Label curta exibida abaixo do logo. Ex: "Select Technology Partner". */
  label: string;
  /** Família do badge — usado em filtros futuros, opcional. */
  family?: 'google-cloud' | 'google-workspace';
};

export const badges: Badge[] = [
  {
    file: '/logo/logos partner/google-clound_select-Tecnology_partner.jpeg',
    alt: 'Google Cloud Select Technology Partner',
    label: 'Select Technology Partner',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-clound_select-services-partner.jpeg',
    alt: 'Google Cloud Select Services Partner',
    label: 'Select Services Partner',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-clound_select-Co-sell_partner.jpeg',
    alt: 'Google Cloud Select Co-Sell Partner',
    label: 'Select Co-Sell Partner',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-clound_competency-chrome.jpeg',
    alt: 'Google Cloud Competency — Chrome Enterprise',
    label: 'Competency — Chrome Enterprise',
    family: 'google-cloud'
  },
  {
    file: '/logo/logos partner/google-workspace_premier-Co-sell-service_partner.jpeg',
    alt: 'Google Workspace Premier Co-Sell Service Partner',
    label: 'Premier Co-Sell Partner',
    family: 'google-workspace'
  },
  {
    file: '/logo/logos partner/google-workspace_select_tecnology_partner.jpeg',
    alt: 'Google Workspace Select Technology Partner',
    label: 'Select Technology Partner',
    family: 'google-workspace'
  }
];
