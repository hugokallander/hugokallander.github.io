/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'frank-ruhl-libre': ['"Frank Ruhl Libre"', 'serif'],
      },
      // You can also add a custom utility class for small caps
      textTransform: {
        'small-caps': 'uppercase',
      },
    },
  },
  plugins: [],
}