/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        box1: "from-left 4s infinite",
        box2: "from-right 4s infinite",
        box3: "from-left 4s infinite 2s",
        box4: "from-right 4s infinite 3s",
      },
      keyframes: {
        "from-left": {
          "0%": { opacity: "0", transform: "translate(-20px, -6px)" },
          "20%": { opacity: "1", transform: "translate(0, 0)" },
          "100%": { opacity: "0", transform: "translate(0, 30px)" },
        },
        "from-right": {
          "0%": { opacity: "0", transform: "translate(20px, -6px)" },
          "20%": { opacity: "1", transform: "translate(0, 0)" },
          "100%": { opacity: "0", transform: "translate(0, 30px)" },
        },
      },
    },
    plugins: [],
  },
};
