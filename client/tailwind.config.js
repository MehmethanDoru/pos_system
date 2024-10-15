/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "card": "repeat(auto-fill, minmax(150px, 1fr))",
        "card-md": "repeat(auto-fill, minmax(200px, 1fr))"
      },
    },
  },
  plugins: [],
}

