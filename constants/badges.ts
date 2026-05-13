// constants/badges.ts
export type Badge = {
  /** Caminho relativo a `/public`. */
  file: string;
  alt: string;
  /** Label curta exibida abaixo do logo. */
  label: string;
  /** Família do badge — usado em filtros futuros, opcional. */
  family?: 'google-cloud' | 'google-workspace';
};

export const badges: Badge[] = [
  // Premier e Specialization vêm primeiro — credenciais mais altas
  {
    file: '/logo/badges/tier_gws_cosell_and_service_premier.png',
    alt: 'Google Workspace Premier Co-Sell & Service Partner',
    label: 'Premier Co-Sell · Workspace',
    family: 'google-workspace'
  },
  {
    file: '/logo/badges/gc_specialization_work_transformation_enterprise.png',
    alt: 'Google Cloud Specialization — Work Transformation, Enterprise',
    label: 'Specialization · Work Transformation',
    family: 'google-cloud'
  },
  {
    file: '/logo/badges/tier_gcp_technology_select.png',
    alt: 'Google Cloud Select Technology Partner',
    label: 'Select Technology · Cloud',
    family: 'google-cloud'
  },
  {
    file: '/logo/badges/tier_gcp_services_select.png',
    alt: 'Google Cloud Select Services Partner',
    label: 'Select Services · Cloud',
    family: 'google-cloud'
  },
  {
    file: '/logo/badges/tier_gcp_cosell_select.png',
    alt: 'Google Cloud Select Co-Sell Partner',
    label: 'Select Co-Sell · Cloud',
    family: 'google-cloud'
  },
  {
    file: '/logo/badges/tier_gws_technology_select.png',
    alt: 'Google Workspace Select Technology Partner',
    label: 'Select Technology · Workspace',
    family: 'google-workspace'
  },
  {
    file: '/logo/badges/chrome_competency.png',
    alt: 'Google Cloud Competency — Chrome Enterprise',
    label: 'Competency · Chrome Enterprise',
    family: 'google-cloud'
  }
];
