import type { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <div className={"sticky top-[91px] flex-1 self-start"}>{children}</div>;
}

export default Layout;
