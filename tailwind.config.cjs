/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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

          "success": "#04342C",

          "warning": "#E27E03",

          "error": "#ea2b0f",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}