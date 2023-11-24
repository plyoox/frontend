import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "pl-button": "0 20px 80px -10px #40BA7F",
        "pl-primary": "0 20px 80px -10px #5865F2",
      },
      colors: {
        "mt-dark": {
          0: "#C1C2C5",
          1: "#A6A7AB",
          2: "#909296",
          3: "#5C5F66",
          4: "#373A40",
          5: "#2C2E33",
          6: "#25262B",
          7: "#1A1B1E",
          8: "#141517",
          9: "#101113",
        },
        dark: {
          0: "hsl(40,6%,0%)",
          1: "hsl(40,6%,5%)",
          2: "hsl(40,6%,10%)",
          3: "hsl(40,6%,13%)",
          4: "hsl(40,6%,16%)",
        },
        pl: {
          text: "#FBEFEF",
          primary: "#41BCBE",
          accent: "#40BA7F",
          "accent-light": "#64DEA3",
          "accent-dark": "#347C58",
          secondary: "#032F30",
          background: "#1B1A18",
          card: "#22211F",
          blurple: "#5865F2",
        },
      },
      borderRadius: {
        xs: "var(--mantine-radius-xs)",
        sm: "var(--mantine-radius-sm)",
        md: "var(--mantine-radius-md)",
        lg: "var(--mantine-radius-lg)",
        xl: "var(--mantine-radius-xl)",
      },
    },
  },
  plugins: [],
};
export default config;
