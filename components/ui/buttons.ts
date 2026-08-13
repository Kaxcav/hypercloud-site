// components/ui/buttons.ts
// Helpers de classe Tailwind para os 3 variantes de botão usados no site.
// Não é um componente React — só constantes de classe pra evitar inconsistências
// entre os ~15 CTAs inline espalhados.

import { cn } from '@/components/ui';

const BASE = 'inline-flex items-center justify-center gap-2 rounded-md font-bold transition';

const SIZES = {
  sm: 'px-4 py-2 text-[12px]',
  md: 'px-5 py-2.5 text-[13px]',
  lg: 'px-6 py-3 text-[13px] sm:text-[14px]'
} as const;

export type BtnSize = keyof typeof SIZES;

/**
 * Botão primário — CTAs principais. Brand gradient + shadow brand + texto branco.
 * Aplica um shimmer sutil no :hover via pseudo-element.
 */
export function btnPrimary(size: BtnSize = 'md', extra?: string) {
  return cn(
    BASE,
    SIZES[size],
    'relative overflow-hidden bg-brand-gradient text-white shadow-brand hover:opacity-95',
    'before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full',
    extra
  );
}

/**
 * Botão secundário — alternativa calma. Outline em surface-card.
 */
export function btnSecondary(size: BtnSize = 'md', extra?: string) {
  return cn(
    BASE,
    SIZES[size],
    'border border-border bg-surface-card text-text-strong shadow-soft hover:border-brand-500/40 hover:shadow-medium',
    extra
  );
}

/**
 * Botão terciário — link estilo. Sem padding/border, só texto.
 * Não tem `size` — sempre o mesmo tamanho de link inline.
 */
export function btnTertiary(extra?: string) {
  return cn(
    'inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand-600 hover:text-brand-700 transition',
    extra
  );
}
