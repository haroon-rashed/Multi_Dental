/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Checks all JS/JSX/TS/TSX files in src
    "./public/index.html"          // Includes your HTML file
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',       // Blue-500 as primary
        secondary: '#10B981',     // Emerald-500 as secondary
      },
    },
  },
  plugins: [],
}