/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        final:"#222831",
        tertiary:"#31363F",
        secondary:"#76ABAE",
        primary:"#EEEEEE"
      }
    },
  },
  plugins: [],
}

