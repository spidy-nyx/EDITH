/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spider-red': '#DC143C',
        'spider-blue': '#1E90FF',
        'comic-yellow': '#FFD700',
        'comic-cream': '#FFFDD0',
      },
      fontFamily: {
        'comic': ['Bangers', 'cursive'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 2s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { transform: 'scaleY(0.1)' },
          '50%': { transform: 'scaleY(1)' },
        }
      }
    },
  },
  plugins: [],
}
