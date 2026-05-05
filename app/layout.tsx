import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://oi-production.up.railway.app'),
  title: {
    default: 'Hypercloud — Google Workspace, Gemini, GCP e AppSheet',
    template: '%s | Hypercloud'
  },
  description:
    'Soluções Google para empresas e Setor Público: Google Workspace, Google Cloud, Gemini Enterprise e AppSheet com credenciais oficiais e atendimento consultivo.',
  openGraph: {
    title: 'Hypercloud — Google Workspace, Gemini, GCP e AppSheet',
    description:
      'Soluções Google para empresas e Setor Público com foco em conversão, credibilidade e transformação digital.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-surface-base text-ink-900">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
