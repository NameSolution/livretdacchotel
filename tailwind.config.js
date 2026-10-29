const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Les couleurs viennent exclusivement des design tokens (voir src/lib/theme.js).
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: token('paper'),
      'paper-2': token('paper-2'),
      ink: token('ink'),
      'ink-2': token('ink-2'),
      line: token('line'),
      accent: token('accent'),
      'accent-ink': token('accent-ink'),
      'accent-soft': token('accent-soft'),
      'on-accent': token('on-accent'),
      white: '#fff',
    },
    fontFamily: {
      display: ['"Fraunces Variable"', 'Georgia', 'serif'],
      sans: ['"DM Sans Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    },
    borderRadius: { none: '0', sm: '4px', DEFAULT: '8px', lg: '12px', full: '9999px' },
    extend: {
      maxWidth: { page: '40rem' },
      spacing: { nav: 'calc(4.25rem + env(safe-area-inset-bottom))' },
    },
  },
  plugins: [],
};
