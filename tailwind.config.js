module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxHeight: {
      half: "50vh",
      "1/2": "50%",
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
