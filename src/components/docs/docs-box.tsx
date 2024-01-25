import DocsHeading from "@/components/docs/docs-heading";
import type { ReactNode } from "react";

function DocsBox({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <article className={"p-1 text-mt-dark-0"}>
      {title && <DocsHeading title={title} />}
      {children}
    </article>
  );
}

export default DocsBox;
