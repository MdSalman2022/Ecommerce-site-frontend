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

          "primary": "#4E7AEF",

          "secondary": "#3D65CE",

          "accent": "#F2F2F6",

          "neutral": "#2D364F",

          "base-100": "#FFFFFF",

          "info": "#304B97",

          "success": "#19C332",

          "warning": "#E27E03",

          "error": "#ea2b0f",
        },
      },
    ],
  },
  plugins: [require("daisyui"), "prettier-plugin-organize-imports", "prettier-plugin-tailwindcss", ], "pluginSearchDirs": false
}
