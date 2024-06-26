import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bv-green": {
          dark: "#15803d",
          DEFAULT: "#16a34a",
          light: "#22c55e",
        },
        "bv-purple": {
          DEFAULT: "#6c63ff",
          light: "#c4b5fd",
        },
        "bv-blue": {
          dark: "#0f172a",
          DEFAULT: "#1e293b",
          light: "#334155",
        },
      },
    },
  },
  plugins: [],
};
export default config;
