/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#dadad2",
        "secondary": "#c7c7bb",
      },
    },
  },
  plugins: [],
};
