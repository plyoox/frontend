"use client";

import { useGuildId } from "@/lib/hooks";
import Link from "next/link";
import type { ReactNode } from "react";

function InfoBox({ title, children, link, icon }: { title: string; children: string; link: string; icon: ReactNode }) {
  const id = useGuildId();

  return (
    <Link
      className={"block w-full rounded-md bg-mt-dark-6 p-5 duration-300 hover:bg-mt-dark-7 lg:w-96"}
      href={`${id}/${link}`}
    >
      <div className={"flex items-center gap-2"}>
        {icon}
        <h3 className={"text-xl font-medium"}>{title}</h3>
      </div>

      <span className={"text-mt-dark-0"}>{children}</span>
    </Link>
  );
}

export default InfoBox;
