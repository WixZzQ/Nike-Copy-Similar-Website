/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nike-black': '#111111',
        'nike-gray': '#7E7E7E',
        'nike-light-gray': '#F5F5F5',
      },
    },
  },
  plugins: [],
}