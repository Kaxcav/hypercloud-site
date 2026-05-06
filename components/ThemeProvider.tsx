'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  applyTheme,
  persistPreference,
  preferenceToTheme,
  readStoredPreference,
  resolveSystemTheme,
  type Theme,
  type ThemePreference
} from '@/lib/theme';

type ThemeContextValue = {
  preference: ThemePreference;
  theme: Theme;
  setPreference: (preference: ThemePreference) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>('dark');
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const stored = readStoredPreference();
    const resolved = preferenceToTheme(stored);
    setPreferenceState(stored);
    setThemeState(resolved);
    applyTheme(resolved);
  }, []);

  useEffect(() => {
    if (preference !== 'system' || typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      const next = resolveSystemTheme();
      setThemeState(next);
      applyTheme(next);
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    persistPreference(next);
    const resolved = preferenceToTheme(next);
    setThemeState(resolved);
    applyTheme(resolved);
  }, []);

  const toggle = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setPreference]);

  const value = useMemo<ThemeContextValue>(
    () => ({ preference, theme, setPreference, toggle }),
    [preference, theme, setPreference, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
