import type { Config } from "tailwindcss";

const config: Config = {
  corePlugins: {
    preflight: false,
  },
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
        ring: "0px 0px 47px 0px rgba(0,0,0,0.5)",
      },
      colors: {
        "mt-dark": {
          0: "#c9c9c9",
          1: "#b8b8b8",
          2: "#828282",
          3: "#696969",
          4: "#424242",
          5: "#3b3b3b",
          6: "#2e2e2e",
          7: "#242424",
          8: "#1f1f1f",
          9: "#141414",
        },
        pl: {
          text: "#FFF",
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
