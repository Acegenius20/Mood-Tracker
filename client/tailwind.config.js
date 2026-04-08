/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glass: "0 8px 32px rgba(31, 38, 135, 0.2)",
        soft: "0 8px 24px rgba(0, 0, 0, 0.08)"
      },
      colors: {
        surface: {
          light: "#f7f8fb",
          dark: "#111318"
        }
      }
    }
  },
  plugins: []
};
