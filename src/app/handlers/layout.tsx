import { type ReactNode, Suspense } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default Layout;
