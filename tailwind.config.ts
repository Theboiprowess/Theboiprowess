import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F4C81",
          light: "#1A5F9E",
          dark: "#0A3A61",
        },
        secondary: {
          DEFAULT: "#F4B400",
          light: "#FFC72C",
          dark: "#D49A00",
        },
        accent: "#FFFFFF",
        background: "#F8F9FA",
        text: {
          DEFAULT: "#333333",
          light: "#666666",
          dark: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
