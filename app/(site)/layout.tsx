import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWhatsapp } from '@/components/FloatingWhatsapp';
import { MobileCtaBar } from '@/components/MobileCtaBar';

// Chrome do site institucional. A área logada vive em `app/(portal)` e não
// monta nada disto — sem barra de venda, sem rodapé comercial.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsapp />
      <MobileCtaBar />
    </div>
  );
}
