'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { useLeadDialog } from '@/components/LeadDialogProvider';
import { company } from '@/constants/company';

export function MobileCtaBar() {
  const { open: openLead } = useLeadDialog();

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 border-t border-border bg-surface-card/95 p-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={company.phone.href}
          aria-label="Ligar para a Hypercloud"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-soft text-text-strong"
        >
          <Phone className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={() => openLead('Mobile Sticky Bar')}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gradient py-2.5 px-4 text-[13px] font-bold text-white shadow-brand"
        >
          Falar com Especialista
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
