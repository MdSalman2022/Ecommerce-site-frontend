/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "scrolling-text": "scroll-left 10s linear infinite",
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#2bbef9",

          "secondary": "#233a95",

          "accent": "#f7f8fd",

          "neutral": "#00171F",

          "base-100": "#FFFFFF",

          "info": "#ACC8E7",

          "success": "#19C332",

          "warning": "#E27E03",

          "error": "#ea2b0f",
        },
      },
    ],
  },
  plugins: [require("daisyui"), "prettier-plugin-organize-imports", "prettier-plugin-tailwindcss", ], "pluginSearchDirs": false
}
