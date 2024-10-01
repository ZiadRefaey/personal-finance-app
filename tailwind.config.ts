import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        "primary-text": "rgba(var(--primary-text))",
        "secondary-text": "rgba(var(--secondary-text))",
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
        "navy-grey": "var(--navy-grey)",
        "army-green": "var(--army-green)",
      },
    },
  },
  plugins: [],
};
export default config;
