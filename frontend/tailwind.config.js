/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors:{
        'main-color':'#434343'
      },
      fontFamily: {
        'serif': ['BBH Sans Bartle','system-ui','sans-serif']
      }
    },
  },
  plugins: [],
}

