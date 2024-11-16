/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#fff",
        secondary: "#10a37f",
        gray: "#f4f4f4",
      },
      colors: {
        primary: "#000",
        primaryLight: "#2d333a",
        secondary: "#10a37f",
        secondaryLight: "#f7724e",
        secondaryDark: "#08916e",
        gray500: "#647380",
        gray400: "#b2bbc2",
        white: "#fff",
      },
    },
  },
  plugins: [],
};
