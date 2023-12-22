import { ReactNode } from "react";
import Header from "@/components/app-shell/header/header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
