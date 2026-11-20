/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      /*
        Palette colours are CSS variables (space-separated RGB channels) set in
        styles/globals.css, so the whole site can switch between dark and light
        themes. `<alpha-value>` keeps opacity modifiers like bg-noir-800/85 working.
      */
      colors: {
        noir: {
          900: 'rgb(var(--noir-900) / <alpha-value>)',
          800: 'rgb(var(--noir-800) / <alpha-value>)',
          700: 'rgb(var(--noir-700) / <alpha-value>)',
          600: 'rgb(var(--noir-600) / <alpha-value>)',
          500: 'rgb(var(--noir-500) / <alpha-value>)',
        },
        // "gold" is the accent colour (electric blue); the name predates the redesign
        gold: {
          100: 'rgb(var(--gold-100) / <alpha-value>)',
          200: 'rgb(var(--gold-200) / <alpha-value>)',
          300: 'rgb(var(--gold-300) / <alpha-value>)',
          400: 'rgb(var(--gold-400) / <alpha-value>)',
          500: 'rgb(var(--gold-500) / <alpha-value>)',
          600: 'rgb(var(--gold-600) / <alpha-value>)',
        },
        parchment: {
          100: 'rgb(var(--parchment-100) / <alpha-value>)',
          200: 'rgb(var(--parchment-200) / <alpha-value>)',
          300: 'rgb(var(--parchment-300) / <alpha-value>)',
          400: 'rgb(var(--parchment-400) / <alpha-value>)',
        },
        crimson: {
          400: '#e05c5c',
          500: '#c84040',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'Courier New', 'monospace'],
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'glow':     'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in':  'fadeIn 0.8s ease forwards',
        'shimmer':  'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 5px #0ea5e9, 0 0 10px #0ea5e9' },
          to:   { boxShadow: '0 0 15px #0ea5e9, 0 0 30px #0ea5e9, 0 0 45px #0ea5e9' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(14, 165, 233,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233,0.05) 1px, transparent 1px)",
        'radial-gold':  'radial-gradient(ellipse at center, rgba(14, 165, 233,0.15) 0%, transparent 70%)',
      },
      fontSize: {
        'xs':   ['clamp(0.7rem, 2vw, 0.75rem)', { lineHeight: '1.5' }],
        'sm':   ['clamp(0.8rem, 2.5vw, 0.875rem)', { lineHeight: '1.5' }],
        'base': ['clamp(0.9rem, 3vw, 1rem)', { lineHeight: '1.6' }],
        'lg':   ['clamp(1.1rem, 4vw, 1.25rem)', { lineHeight: '1.5' }],
        'xl':   ['clamp(1.25rem, 5vw, 1.5rem)', { lineHeight: '1.4' }],
        '2xl':  ['clamp(1.5rem, 6vw, 1.875rem)', { lineHeight: '1.3' }],
        '3xl':  ['clamp(1.875rem, 7vw, 2.25rem)', { lineHeight: '1.2' }],
        '4xl':  ['clamp(2.25rem, 8vw, 3rem)', { lineHeight: '1.1' }],
        '5xl':  ['clamp(3rem, 10vw, 4.5rem)', { lineHeight: '1' }],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
