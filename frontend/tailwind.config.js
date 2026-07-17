/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drawCheck: {
          '0%': { strokeDashoffset: '50' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      // ---> ADD THIS ANIMATION BLOCK <---
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        scaleIn: 'scaleIn 0.4s ease-out 0.2s both',
        drawCheck: 'drawCheck 0.5s ease-out 0.5s both',
      },
      colors: {
        creator: {
          white: '#ffffff',
          black: '#0a0a0a',
          surface: '#f5f5f5',
          border: '#e5e5e5',
          muted: '#737373',
          accent: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}