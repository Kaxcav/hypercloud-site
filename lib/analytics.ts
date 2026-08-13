'use client';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    lintrk?: (action: string, data?: any) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Evento em GA4 / GTM via dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  }

  // Evento direto em gtag se carregado
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // Evento LinkedIn Insight Tag se carregado
  if (typeof window.lintrk === 'function') {
    window.lintrk('track', { conversion_id: eventName });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[analytics] event: ${eventName}`, params);
  }
}
