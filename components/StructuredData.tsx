import { company } from '@/constants/company';

export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hypercloud.com.br';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.tradeName,
    legalName: company.legalName,
    taxID: company.cnpj,
    url: siteUrl,
    logo: `${siteUrl}/logo/lg.hypercloud_horizontal.png`,
    sameAs: [company.social.linkedin, company.social.instagram, company.social.facebook],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: company.phone.display,
        contactType: 'sales',
        areaServed: 'BR',
        availableLanguage: 'Portuguese'
      },
      {
        '@type': 'ContactPoint',
        email: company.emails.comercial,
        contactType: 'customer service',
        areaServed: 'BR'
      }
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.tradeName,
    image: `${siteUrl}/logo/lg.hypercloud_horizontal.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: company.phone.display,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: 'BR'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
