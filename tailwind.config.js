/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // True Luxury Obsidian System replacing default blue-slate
        slate: {
          50: '#F9F9FB',
          100: '#F2F2F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#27272A',
          800: '#18181B',
          900: '#121215', // Pure Luxury Onyx (no blue tint)
          950: '#0A0A0C', // Pure Luxury Obsidian Canvas (no navy tint)
        },
        // Refined subdued status replacing neon greens
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#C5A059', // Champagne Gold indicator
          600: '#1E3A2F', // Restrained Dark Sage
          700: '#14261C',
          800: '#0F1D15',
          900: '#0A140E',
          950: '#050A07',
        },
        luxury: {
          bg: '#0A0A0C',
          card: '#121215',
          elevated: '#17171B',
          border: 'rgba(255, 255, 255, 0.08)',
          borderSubtle: 'rgba(255, 255, 255, 0.04)',
          text: '#EDEDEF',
          muted: '#A1A1AA',
          faint: '#71717A',
          gold: '#C5A059',
          goldHover: '#B38F48',
          goldLight: '#E8D5B5',
          goldMuted: 'rgba(197, 160, 89, 0.15)',
        },
        institutional: {
          50: '#F9F8F6',
          100: '#F2EFE9',
          200: '#E4DFD5',
          300: '#D1C8B8',
          400: '#B8A992',
          500: '#9E8C73',
          600: '#7F6F59',
          700: '#625544',
          800: '#483E32',
          900: '#2E2720',
          950: '#1A1612',
        },
        classicGold: {
          50: '#FCFBF7',
          100: '#F7F3E9',
          200: '#EFE7D2',
          300: '#E2D3B1',
          400: '#D5BE8F',
          500: '#C5A059',
          600: '#A88342',
          700: '#85642F',
          800: '#644A22',
          900: '#473318',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Source Serif 4', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 1px 2px rgba(0, 0, 0, 0.5), 0 8px 24px -4px rgba(0, 0, 0, 0.6)',
        'luxury-subtle': '0 1px 3px rgba(0, 0, 0, 0.4)',
        'soft': '0 1px 3px rgba(0, 0, 0, 0.4)',
        'soft-md': '0 4px 16px -2px rgba(0, 0, 0, 0.5)',
        'soft-lg': '0 10px 25px -4px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
