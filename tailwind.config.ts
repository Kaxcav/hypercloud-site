import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './constants/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        serif: [
          'var(--font-instrument-serif)',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif'
        ],
        mono: [
          'var(--font-jetbrains-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        },
        ink: {
          0: '#050507',
          1: '#0A0A0D',
          2: '#13131A',
          3: '#1A1A23',
          4: '#2A2A35',
          5: '#3F3F4D',
          6: '#64647A'
        },
        paper: {
          0: '#FAFAF7',
          1: '#FFFFFF',
          2: '#F5F5F0',
          3: '#EAEAE0'
        },
        surface: {
          base: 'var(--surface-base)',
          soft: 'var(--surface-soft)',
          card: 'var(--surface-card)',
          muted: 'var(--surface-muted)'
        },
        border: {
          subtle: 'var(--border-subtle)',
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)'
        },
        text: {
          strong: 'var(--text-strong)',
          DEFAULT: 'var(--text-default)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)'
        }
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        medium: 'var(--shadow-medium)',
        brand: 'var(--shadow-brand)',
        premium: 'var(--shadow-premium)',
        glow: 'var(--shadow-glow)'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #f97316 0%, #fb923c 45%, #facc15 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(249,115,22,0.16) 0%, rgba(251,146,60,0.06) 100%)',
        'hero-glow': 'var(--hero-glow)',
        'grid-pattern': 'var(--grid-pattern)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E\")"
      },
      borderRadius: {
        '4xl': '2rem'
      },
      keyframes: {
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(251,146,60,0.55)' },
          '70%': { boxShadow: '0 0 0 10px rgba(251,146,60,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(251,146,60,0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.2,1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'float-y': 'float-y 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both'
      }
    }
  },
  plugins: []
};

export default config;
