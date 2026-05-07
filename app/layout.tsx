import type { Metadata } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LeadDialogProvider } from '@/components/LeadDialogProvider';
import { CommandPaletteProvider } from '@/components/CommandPaletteProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900']
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600']
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

const themeInitScript = `(function(){try{
  var s=localStorage.getItem('hypercloud-theme');
  var t=(s==='dark'||s==='light')?s:'light';
  document.documentElement.setAttribute('data-theme',t);
}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-surface-base font-sans text-text antialiased">
        <ThemeProvider>
          <LeadDialogProvider>
            <CommandPaletteProvider>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </CommandPaletteProvider>
          </LeadDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
