'use client';

import dynamic from 'next/dynamic';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LeadFormDialog = dynamic(
  () => import('@/components/LeadFormDialog').then((m) => m.LeadFormDialog),
  { ssr: false }
);

type LeadDialogContextValue = {
  open: (context?: string) => void;
  close: () => void;
};

const LeadDialogContext = createContext<LeadDialogContextValue | null>(null);

const STORAGE_KEY = 'hypercloud_attribution';

export function LeadDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      if (sessionStorage.getItem(STORAGE_KEY)) return; // Mantém a primeira atribuição da sessão

      const urlParams = new URLSearchParams(window.location.search);
      const attributionData = {
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || '',
        gclid: urlParams.get('gclid') || '',
        referrer: document.referrer || '',
        landingPage: window.location.pathname
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attributionData));
    } catch {
      // Ignora falhas de storage privado
    }
  }, []);

  const open = useCallback((ctx?: string) => {
    setContext(ctx);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadDialogContext.Provider value={value}>
      {children}
      <LeadFormDialog open={isOpen} context={context} onClose={close} />
    </LeadDialogContext.Provider>
  );
}

export function useLeadDialog() {
  const ctx = useContext(LeadDialogContext);
  if (!ctx) throw new Error('useLeadDialog must be used inside LeadDialogProvider');
  return ctx;
}

