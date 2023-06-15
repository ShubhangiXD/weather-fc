/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'Gaseok': ['Gasoek One'],
      'Kanit': ['Kanit'],
      'Geologica': ['Geologica'],
      'Montserrat': ['Montserrat']
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}

