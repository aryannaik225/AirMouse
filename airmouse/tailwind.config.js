/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // adjust this based on your structure
    "./public/index.html"
  ],
  theme: {
    extend: {
      cursor:{
        airmouse: "url('airmouse/public/cursors/default.png'), auto",
        pointer: "url('/cursors/pointer.png'), pointer",
        text: "url('airmouse/public/cursors/select.png'), text",
      },
    },
  },
  plugins: [],
}
