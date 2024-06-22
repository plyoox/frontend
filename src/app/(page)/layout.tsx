import Header from "@/components/app-shell/header/header";
import type { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
