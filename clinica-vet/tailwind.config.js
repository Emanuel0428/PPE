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
        'dot-pattern': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23E76F51\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
        'gradient-bg': 'linear-gradient(135deg, #FDF6E3 0%, #FFF8E1 100%)',
      },
    },
  },
  plugins: [],
};