/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: "0.5fr 2fr 0.5fr",
      },
      gridTemplateRows: {
        custom: "0.5fr 2fr ",
      },
    },
  },
  plugins: [],
};
