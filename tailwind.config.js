/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Tous les fichiers JavaScript/TypeScript/React dans src/
    "./app/**/*.{js,ts,jsx,tsx}", // Tous les fichiers dans app/ (structure suggérée par Next.js 13+)
    "./public/**/*.html" // Fichiers HTML statiques dans public/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
