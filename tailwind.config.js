/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#A3A3A3',
        'light-gray': '#F0F0F0',
        'dark-gray': '#5D6965',
        'disabled-font': '#C7C7C7',
      },
      minHeight: {
        '80': '80px',
      }
    },
  },
  plugins: [],
}
