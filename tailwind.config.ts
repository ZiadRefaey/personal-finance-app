import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "preset-1": [
          "2rem",
          {
            lineHeight: "120%",
            letterSpacing: "0px",
            fontWeight: 700,
          },
        ],
        "preset-2": [
          "1.25rem",
          {
            lineHeight: "120%",
            letterSpacing: "0px",
            fontWeight: 700,
          },
        ],
        "preset-3": [
          "1rem",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
            fontWeight: 700,
          },
        ],
        "preset-4": [
          "0.875rem",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
          },
        ],
        "preset-4-bold": [
          "0.875rem",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
            fontWeight: 700,
          },
        ],
        "preset-5": [
          "0.75rem",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
          },
        ],
        "preset-5-bold": [
          "0.75rem",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
            fontWeight: 700,
          },
        ],
      },
      colors: {
        background: "rgba(var(--background))",
        primary: "rgba(var(--primary-text))",
        secondary: "rgba(var(--secondary-text))",
        "card-back-ground": "rgba(var(--card-back-ground))",
        navbar: "rgba(var(--navbar))",
        "highlighted-card": "rgba(var(--highlighted-card))",
        seperator: "rgba(var(--seperator))",
        green: "var(--green)",
        yellow: "var(--yellow)",
        cyan: "var(--cyan)",
        navy: "var(--navy)",
        red: "var(--red)",
        turquoise: "var(--turquoise)",
        purple: "var(--purple)",
        brown: "var(--brown)",
        magenta: "var(--magenta)",
        blue: "var(--blue)",
        gold: "var(--gold)",
        pink: "var(--pink)",
        orange: "var(--orange)",
        icon: "var(--icon)",
        "navy-grey": "var(--navy-grey)",
        "army-green": "var(--army-green)",
      },
    },
  },
  plugins: [],
};
export default config;
