import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";
import { pallete } from "./app/_ui/pallete";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    colors: pallete,
    backgroundColor: {
      DEFAULT: pallete.zinc[900],
      primary: pallete.zinc[900],
      secondary: pallete.zinc[800],
      highlight: pallete.zinc[700],
      blue: {
        DEFAULT: pallete.blue[600],
        primary: pallete.blue[600],
        secondary: pallete.blue[500],
      },
      emerald: {
        DEFAULT: pallete.emerald[600],
        primary: pallete.emerald[600],
        secondary: pallete.emerald[500],
      },
      red: {
        DEFAULT: pallete.red[600],
        primary: pallete.red[600],
        secondary: pallete.red[500],
      },
      yellow: {
        DEFAULT: pallete.yellow[600],
        primary: pallete.yellow[600],
        secondary: pallete.yellow[500],
      },
    },
    borderColor: {
      DEFAULT: pallete.zinc[800],
      default: pallete.zinc[800],
      hide: pallete.zinc[900],
      focus: pallete.blue[400],
    },
    textColor: {
      DEFAULT: pallete.zinc[300],
      default: pallete.zinc[300],
      secondary: pallete.zinc[400],
      faint: pallete.zinc[500],
      focus: pallete.blue[400],
    },
    stroke: {
      DEFAULT: pallete.zinc[400],
      default: pallete.zinc[400],
      info: pallete.blue[400],
      success: pallete.emerald[400],
      failure: pallete.red[400],
    },
    extend: {
      ringWidth: {
        DEFAULT: "0",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
