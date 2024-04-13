import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  theme: {
    extend: {
      colors: {
        // "background": "#faeee7",
        // "headline": "#33272a",
        // "paragraph": "#594a4e",
        // "button": "#ff8ba7",
        // "buttonText": "#33272a",
        // "stroke": "#33272a",
        // "main": "#fffffe",
        // "highlight": "#ff8ba7",
        // "secondary": "#ffc6c7",
        // "tertiary": "c3f0ca",
        background: "#16161a",
        headline: "#fffffe",
        paragraph: "#94a1b2",
        button: "#7f5af0",
        buttonText: "#fffffe",
        stroke: "#010101",
        main: "#fffffe",
        highlight: "#7f5af0",
        secondary: "#72757e",
      },
      fontFamily: {
        poppins: ["VT323", "monospace"], // use sans instead with a larger font stack
        sans: ["VT323", "monospace", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
