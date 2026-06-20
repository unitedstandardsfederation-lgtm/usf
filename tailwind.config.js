/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        usf: {
          blue: '#0C2B5B',
          'blue-dark': '#081E40',
          'blue-deep': '#04122A',
          red: '#D6141B',
          'red-dark': '#A50F15',
          white: '#FDFDFD',
          gray: '#F5F7FA',
          'gray-mid': '#E5E9F0',
          text: '#1A1A1A',
          muted: '#666666',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', '"Source Serif Pro"', 'Georgia', 'serif'],
        sans: ['Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Source Serif 4"', '"Source Serif Pro"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(8, 30, 64, 0.04), 0 10px 30px -10px rgba(8, 30, 64, 0.08)',
        'card-hover': '0 2px 4px rgba(8, 30, 64, 0.06), 0 20px 40px -12px rgba(8, 30, 64, 0.16)',
        ring: '0 0 0 1px rgba(12, 43, 91, 0.08)',
      },
      backgroundImage: {
        'usf-hero':
          'radial-gradient(ellipse at top, rgba(12, 43, 91, 0.85) 0%, rgba(8, 30, 64, 0.95) 45%, #04122A 100%)',
        'usf-grid':
          'linear-gradient(rgba(253, 253, 253, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(253, 253, 253, 0.04) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ping1: {
          '0%': { transform: 'scale(1)', opacity: '0.75' },
          '80%, 100%': { transform: 'scale(3.4)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-6px,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        ping1: 'ping1 2.8s cubic-bezier(0,0,0.2,1) infinite',
        drift: 'drift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
