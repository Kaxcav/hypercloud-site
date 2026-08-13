import { MetadataRoute } from 'next';
import { solutions } from '@/constants/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hypercloud.com.br';

  const staticRoutes = [
    '',
    '/cases',
    '/setor-publico',
    '/sobre',
    '/suporte',
    '/diagnostico',
    '/calculadora',
    '/comparativo/google-workspace-vs-microsoft-365',
    '/politica-de-privacidade',
    '/termos-de-uso',
    '/portal-do-cliente'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  const solutionRoutes = solutions.map((sol) => ({
    url: `${baseUrl}/solucoes/${sol.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9
  }));

  return [...staticRoutes, ...solutionRoutes];
}
