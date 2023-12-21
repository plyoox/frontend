import { Provider } from "@/app/_provider";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

export default Layout;
