module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: "#181818",
      white: "#FEFEFE",
      red: "#E71D36",
      gold: "F6AA1C",
      lightGray: "#F3F3F3",
      gray: "#F8F8F8",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
