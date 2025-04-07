/** @type {import('tailwindcss').Config} */
export default  {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFF8E1',
          200: '#F5E8C7',
          400: '#F4A261',
          500: '#E76F51',
          600: '#D65F41',
          700: '#C54F31',
        },
        secondary: {
          400: '#8B4513',
          600: '#5A2E0A',
        },
        beige: {
          100: '#FDF6E3',
        },
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(135deg, #FDF6E3 0%, #FFF8E1 100%)',
      },
    },
  },
  plugins: [],
};