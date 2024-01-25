import type { ReactNode } from "react";

function DocsBox({ children }: { children: ReactNode }) {
  return <article className={"p-1 text-mt-dark-0"}>{children}</article>;
}

export default DocsBox;
