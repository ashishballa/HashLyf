/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main brand colors - warm coral theme
        primary: {
          50: '#fef7f7',
          100: '#fdeaea',
          200: '#fcd2d2',
          300: '#f8b8b8',
          400: '#f39393',
          500: '#ee6b6b',
          600: '#e04545',
          700: '#c83333',
          800: '#a62c2c',
          900: '#892929',
        },
        // Accent colors - warm complementary tones
        accent: {
          50: '#fef8f0',
          100: '#feecdc',
          200: '#fcd6b3',
          300: '#f9b87a',
          400: '#f59542',
          500: '#f27d1e',
          600: '#e36414',
          700: '#bc4e12',
          800: '#954016',
          900: '#783515',
        },
        // Coral - your main brand color
        coral: {
          50: '#fef7f7',
          100: '#fdeaea',
          200: '#fcd2d2',
          300: '#f8b8b8',
          400: '#f39393',
          500: '#ee6b6b',
          600: '#e04545',
          700: '#c83333',
          800: '#a62c2c',
          900: '#892929',
        },
        // Warm neutrals
        warm: {
          50: '#fdfcfb',
          100: '#faf8f6',
          200: '#f5f1eb',
          300: '#ebe4d9',
          400: '#ddd0c0',
          500: '#c9b8a3',
          600: '#b0a085',
          700: '#928671',
          800: '#786f5e',
          900: '#635b4f',
        },
        // Success colors - warm green
        success: {
          50: '#f0fdf0',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
    },
  },
  plugins: [],
}