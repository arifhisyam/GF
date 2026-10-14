/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: "#0A1A4F",
          mid: "#13307F",
        },
        blue: {
          dom1: "#9ED6FF",
          dom2: "#BFE4FF",
          dom3: "#7CC4FF",
        },
        purple: {
          accent: "#8B7CF6",
          light: "#B9A8FF",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
