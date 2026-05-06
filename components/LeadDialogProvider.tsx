'use client';

import dynamic from 'next/dynamic';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const LeadFormDialog = dynamic(
  () => import('@/components/LeadFormDialog').then((m) => m.LeadFormDialog),
  { ssr: false }
);

type LeadDialogContextValue = {
  open: (context?: string) => void;
  close: () => void;
};

const LeadDialogContext = createContext<LeadDialogContextValue | null>(null);

export function LeadDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string | undefined>(undefined);

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
