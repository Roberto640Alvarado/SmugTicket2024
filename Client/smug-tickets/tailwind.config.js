/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue": "#062343",
        "gray": "#ECECEC",
        "card-gray": "#DFE6E8",
        "locations-gray": "#D9D9D9",
        "white": "#FFFFFF",
        "orange": "#E98A15",
        "pay-gray": "#F9F7F4",
        "mustard": "#c99a00"
      },
    },
  },
  plugins: [],
}
