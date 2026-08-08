/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F3EFEF',
          100: '#E2D5FF',
          500: '#6C3BFF',
          600: '#5B2EE6',
          700: '#4820C4',
          secondary: '#9D6BFF'
        }
      }
    },
  },
  plugins: [],
}
