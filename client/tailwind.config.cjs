/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dce1e2",
        secondary: "#3a3a3a",
      },
    },
  },
  plugins: [],
};
