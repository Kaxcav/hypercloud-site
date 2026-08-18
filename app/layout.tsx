import type { Metadata } from 'next';
import { Roboto_Flex, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LeadDialogProvider } from '@/components/LeadDialogProvider';
import { CommandPaletteProvider } from '@/components/CommandPaletteProvider';
import { StructuredData } from '@/components/StructuredData';
import { Analytics } from '@/components/Analytics';

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-google-sans',
  axes: ['opsz']
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-google-mono',
  weight: ['400', '500', '600']
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hypercloud.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hypercloud — Premier Google Cloud Partner',
    template: '%s | Hypercloud'
  },
  description:
    'Soluções Google para empresas e Setor Público: Google Workspace, Google Cloud, Gemini Enterprise e AppSheet com credenciais oficiais e atendimento consultivo.',
  openGraph: {
    title: 'Hypercloud — Premier Google Cloud Partner',
    description:
      'Google Workspace, Gemini, Cloud e AppSheet com autoridade, credenciais oficiais e ATAs vigentes.',
    type: 'website',
    url: siteUrl,
    siteName: 'Hypercloud',
    locale: 'pt_BR'
  },
  robots: {
    index: true,
    follow: true
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
      className={`${robotoFlex.variable} ${robotoMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <StructuredData />
      </head>
      <body className="min-h-screen bg-surface-base font-sans text-text antialiased">
        <Analytics />
        <ThemeProvider>
          <LeadDialogProvider>
            <CommandPaletteProvider>{children}</CommandPaletteProvider>
          </LeadDialogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
