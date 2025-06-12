/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
      sans: ['"Noto Sans"', 'sans-serif'],
    },
    },
  },
  plugins: [],
};
