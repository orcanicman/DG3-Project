module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: "#181818",
      white: "#FEFEFE",
      red: "#E71D36",
      gold: "F6AA1C",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
