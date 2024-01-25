import Link from "next/link";
import type { ReactNode } from "react";

function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className={"rounded-sm bg-pl-secondary px-1.5 py-0.5 font-semibold text-pl-accent-light hover:underline"}
      href={href}
    >
      {children}
    </Link>
  );
}

export default InternalLink;
