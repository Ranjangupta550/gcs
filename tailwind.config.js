/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%, 100%": { height: "10px" },
          "50%": { height: "50px" },
        },

      },
      animation: {
        wave: "wave 1s ease-in-out infinite",
      },
      fontFamily: {
        robotoMono: ['"Roboto Mono"', 'monospace'],
        custom: ['Inter', 'sans-serif'], // no extra quotes needed
      },
      colors: {
        backgroundPrimary: "#000011", // Primary background
        backgroundSecondary: "#1c1c1e", // Secondary background
        backgroundTertiary: "#1A1A1B", // Tertiary background
        backgroundQuaternary: "#1d1718", // Quaternary background
        statusSuccess: "#22E208", // Success status indicator
        backgroundAccent: "#634F4F", // Accent background
        neutral: "#D9D9D9", // Neutral color
        statusWarning: "#D9D9D9", // Warning status color
        elementHighlight: "#D9D9D9", // Highlighted element color
      },
    },
  },
  plugins: [],
};
