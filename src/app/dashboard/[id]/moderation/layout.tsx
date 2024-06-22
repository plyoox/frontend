import type React from "react";
import { Provider } from "./_provider";

function Layout({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}

export default Layout;
