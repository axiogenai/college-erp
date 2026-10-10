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
        // Redefine slate to dignified academic neutral (NO cold cyber blue/slate!)
        slate: {
          50: '#f9fafb',   // Pure off-white
          100: '#f3f4f6',  // Crisp light gray
          200: '#e5e7eb',  // Clean subtle border
          300: '#d1d5db',  // Muted border
          400: '#9ca3af',  // Muted secondary text
          500: '#6b7280',  // Muted text
          600: '#4b5563',  // Regular body text
          700: '#374151',  // Strong text
          800: '#1f242d',  // Executive dark card surface
          900: '#161920',  // Elevated university dark surface
          950: '#0f1115',  // Deep academic charcoal background
        },
        institutional: {
          50: '#eaf1f8',   // Soft, distinct collegiate ice-blue tint
          100: '#dce5ee',  // Clean academic surface tint
          200: '#b9cce0',
          300: '#8eb0ce',
          400: '#5f8fba',
          500: '#356999',
          600: '#1e4e79',  // Dignified Collegiate Academic Navy
          700: '#153c61',  // Deep University Blue
          800: '#0e2a47',
          900: '#081c30',
          950: '#04101e',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Source Serif 4', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px -1px rgba(0, 0, 0, 0.07)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
