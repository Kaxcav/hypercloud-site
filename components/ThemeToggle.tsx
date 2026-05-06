'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/components/ui';

type ThemeToggleProps = {
  className?: string;
  variant?: 'default' | 'ghost';
};

export function ThemeToggle({ className, variant = 'default' }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label={mounted && theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      onClick={toggle}
      className={cn(
        'group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border transition',
        variant === 'default'
          ? 'border-border bg-surface-card text-text hover:border-brand-300/60 hover:text-brand-400'
          : 'border-transparent bg-transparent text-text-muted hover:text-text',
        className
      )}
    >
      <Sun
        className={cn(
          'h-4 w-4 transition-all duration-300',
          mounted && theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        )}
        strokeWidth={2.2}
      />
      <Moon
        className={cn(
          'absolute h-4 w-4 transition-all duration-300',
          mounted && theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        )}
        strokeWidth={2.2}
      />
    </button>
  );
}
