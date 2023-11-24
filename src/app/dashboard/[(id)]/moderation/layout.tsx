import { Provider } from "@/app/_provider";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

export default Layout;
