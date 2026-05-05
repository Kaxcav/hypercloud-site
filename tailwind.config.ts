import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './constants/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c'
        },
        surface: {
          base: '#ffffff',
          soft: '#f8fafc',
          muted: '#eef3f9'
        },
        ink: {
          900: '#0f172a',
          700: '#334155',
          500: '#64748b'
        }
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 23, 42, 0.08)',
        brand: '0 18px 48px rgba(249, 115, 22, 0.18)'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #f97316 0%, #fb923c 45%, #facc15 100%)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
};

export default config;
