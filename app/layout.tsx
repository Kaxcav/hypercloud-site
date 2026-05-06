import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900']
});

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
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-surface-base font-sans text-ink-900 antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
