/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans], // Use defaultTheme.fontFamily.sans
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono], // Use defaultTheme.fontFamily.mono
      },
      colors: {
        "bg-gradient": {
          start: "var(--bg-gradient-start)",
          end: "var(--bg-gradient-end)",
        },
      },
      backgroundImage: {
        noise: 'url("/noise.svg")', // Optional noise background
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        glass:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      backdropBlur: {
        xs: "2px",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--text-primary)",
          },
        },
      },
      spacing: {},
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
};
