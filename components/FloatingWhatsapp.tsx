'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { company } from '@/constants/company';

export function FloatingWhatsapp() {
  const pathname = usePathname();

  // Mensagem personalizada por página
  let pageContext = 'soluções Google';
  if (pathname.includes('/solucoes/google-workspace')) pageContext = 'Google Workspace';
  else if (pathname.includes('/solucoes/gemini-enterprise')) pageContext = 'Gemini Enterprise';
  else if (pathname.includes('/solucoes/google-cloud')) pageContext = 'Google Cloud';
  else if (pathname.includes('/solucoes/appsheet')) pageContext = 'AppSheet';
  else if (pathname.includes('/setor-publico')) pageContext = 'ATAs e Setor Público';
  else if (pathname.includes('/suporte')) pageContext = 'suporte técnico';
  else if (pathname.includes('/calculadora')) pageContext = 'estimativa da Calculadora M365';
  else if (pathname.includes('/diagnostico')) pageContext = 'Diagnóstico Gratuito';

  const text = encodeURIComponent(`Olá, estou navegando no site da Hypercloud e gostaria de falar com um especialista sobre ${pageContext}.`);
  const whatsappUrl = `${company.whatsapp.href}?text=${text}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-600 px-4 py-3 text-white shadow-[0_8px_30px_rgb(5,150,105,0.4)] transition motion-safe:hover:scale-105 hover:bg-emerald-500 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="h-5 w-5 fill-current text-white" />
      <span className="hidden text-xs font-bold sm:inline-block">WhatsApp Direto</span>
    </a>
  );
}
