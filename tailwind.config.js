/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#002768',
        'input-blue': '#ffffff12',
        'sender': '#091B39',
        'customer': '#E6E6E6',
        'copilot-gray': "#666666"
      },
    },
    fontFamily: {
      'clashDisplay':'ClashDisplay',
      'Satoshi': 'Satoshi',
    },
  },
  plugins: [],
}