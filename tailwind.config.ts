import type { Config } from 'tailwindcss';
import { churchConfig } from './church.config';

const { theme } = churchConfig;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Pulled from church.config.ts rather than hardcoded — a new
      // church's site changes its whole palette by editing one object,
      // not by hunting through every component for a hex value.
      colors: {
        ink: theme.ink,
        'ink-soft': theme.inkSoft,
        paper: theme.paper,
        'paper-alt': theme.paperAlt,
        indigo: { DEFAULT: theme.indigo, deep: theme.indigoDeep },
        gold: { DEFAULT: theme.gold, deep: theme.goldDeep, pale: theme.goldPale },
        sage: { DEFAULT: theme.sage, soft: theme.sageSoft }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
      },
      borderColor: {
        DEFAULT: 'rgba(33,31,28,0.12)'
      }
    }
  },
  plugins: []
};

export default config;
