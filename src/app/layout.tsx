import "./globals.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Provider } from "@/app/_provider";
import { MantineProvider, createTheme } from "@mantine/core";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import type React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const theme = createTheme({
  cursorType: "pointer",
  colors: {
    plyoox: [
      "#64e3b2",
      "#53dfa9",
      "#41dca1",
      "#30d998",
      "#24c789",
      "#23be82",
      "#20ac76",
      "#1c9b6b",
      "#198a5f",
      "#167953",
    ],
  },
});

export const metadata: Metadata = {
  title: "Plyoox | Discord Bot",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" name="viewport" />
        <title>Plyoox.net - Discord Bot</title>
      </head>
      <body className={`${poppins.className} bg-mt-dark-9`}>
        <MantineProvider forceColorScheme="dark" theme={theme}>
          <Provider>{children}</Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
