/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#102e44",
          700: "#184e77",
          500: "#1e658f",
          300: "#4f8aad",
          200: "#89b4cc",
          100: "#c1d9e6",
        },
        secondary: {
          900: "#7f0d0f",
          700: "#ba181b",
          500: "#d83739",
          300: "#e97374",
          200: "#f5a1a3",
          100: "#fbd3d3",
        },
        neutral: {
          900: "#2D2D2D",
          700: "#595959",
          500: "#A1A1A1",
          300: "#D9D9D9",
          200: "#EFEFEF",
          100: "#F7F7F7",
        },
        background: {
          100: "#FFFFFF",
        },
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" },
          "50%": { boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)" },
        },
      },
      animation: {
        glow: "glow 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
