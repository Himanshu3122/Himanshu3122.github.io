/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          900: '#070b14',
          800: '#0b111e',
          700: '#101828',
          600: '#162033',
          500: '#1f2b42',
        },
        gold: {
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        parchment: {
          100: '#e6edf6',
          200: '#cfdbea',
          300: '#a9b8cc',
          400: '#8495ad',
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
