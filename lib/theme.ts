export type Theme = 'dark' | 'light';
export type ThemePreference = Theme | 'system';

export const THEME_STORAGE_KEY = 'hypercloud-theme';

export function resolveSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function readStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      return stored;
    }
  } catch {
    /* localStorage indisponível */
  }
  return 'dark';
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

export function persistPreference(preference: ThemePreference) {
  if (typeof window === 'undefined') return;
  try {
    if (preference === 'system') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    /* localStorage indisponível */
  }
}

export function preferenceToTheme(preference: ThemePreference): Theme {
  return preference === 'system' ? resolveSystemTheme() : preference;
}
