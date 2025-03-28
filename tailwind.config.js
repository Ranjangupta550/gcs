/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        MainBackground: "#1d1719", // Main background
        togglebar: "#030712",
        navbar: "#1A1A1B", // Navbar background
        ParameterBox : "#1d1718", // Parameter box background
        statusGreen: "#22E208", // Green status indicator
        cardBg: "#634F4F", // Card background
        neutralGray: "#D9D9D9", // Neutral gray
        warningStatus: "#D9D9D9", // Warning status color
        draggerBox: "#D9D9D9", // Dragger box color
      },
    },
  },
  plugins: [],
};
