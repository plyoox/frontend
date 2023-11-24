import { MantineProvider } from "@mantine/core";
import { Poppins } from "next/font/google";
import { Provider } from "@/app/_provider";
import React from "react";
import type { Metadata } from "next";

import "./globals.css";
import "@mantine/core/styles.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="/favicon.svg" rel="shortcut icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" name="viewport" />
        <title>Plyoox.net - Discord Bot</title>
      </head>
      <body className={`${poppins.className} bg-mt-dark-9 text-pl-text`}>
        <MantineProvider defaultColorScheme="dark" forceColorScheme="dark">
          <Provider>{children}</Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
