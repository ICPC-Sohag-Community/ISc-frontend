/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      colors: {
        activeLink: "#3D91C7",
        sidebarColor: "#686666",
      },
      animation: {
        pop: "popBtn 1s  infinite",
      },
      keyframes: {
        popBtn: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};
