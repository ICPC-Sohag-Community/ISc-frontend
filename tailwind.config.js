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
        mainGreen: "#41b253",
        mainRed: "#e44449",
        mainYellow: "#cca827",
        mainblue: "#3D91C7",
        profileTColor: "#e69c24",
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
      fontFamily: {
        dm: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
