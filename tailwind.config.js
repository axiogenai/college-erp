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
        // Authentic Rich Forest Emerald & Pine Palette (matching luxury beUI Pro)
        emerald: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#022C22',
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
          wine: '#7A1C28',
          wineHover: '#641620',
          wineLight: '#E7788A',
          wineMuted: 'rgba(122, 28, 40, 0.15)',
        },
        institutional: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#627D98',
          500: '#334E68',
          600: '#1B3F66', // Oxford Navy Mid
          700: '#0F2942', // Signature Deep Oxford Navy
          800: '#0B1D30', // Ultra Deep Navy
          900: '#081422',
          950: '#040A12',
        },
        classicWine: {
          50: '#FDF2F4',
          100: '#FCE7EA',
          200: '#F9D0D6',
          300: '#F3AAB5',
          400: '#E7788A',
          500: '#B8283D',
          600: '#7A1C28',
          700: '#641620',
          800: '#501119',
          900: '#3D0D13',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Source Serif 4', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'specular': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'luxury': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        'luxury-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
