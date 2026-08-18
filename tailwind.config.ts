import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These are referenced throughout the uploaded components
        // (bg-brand-blue, text-brand-red, border-brand-blue/20, etc.)
        // but were never defined in a Tailwind config — without this,
        // every one of those classes was a silent no-op.
        "brand-blue": "#283889",
        "brand-blue-light": "#3a4fa3",
        "brand-blue-50": "#eef1fb",
        "brand-red": "#3f1119",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
