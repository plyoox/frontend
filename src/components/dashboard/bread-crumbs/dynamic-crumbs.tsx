"use client";

import { GuildStoreContext } from "@/stores/guild-store";
import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { useGuildId } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import Link from "next/link";

function DynamicCrumbs() {
  const guildStore = useContext(GuildStoreContext);

  const id = useGuildId();
  const pathname = usePathname();

  const path: { path: string; isLink: boolean } | null = useMemo(() => {
    const pathSlices = pathname.split("/").slice(3);
    if (pathSlices.length === 0) return null;

    return {
      path: pathSlices[0].charAt(0).toUpperCase() + pathSlices[0].slice(1),
      isLink: pathSlices.length > 1,
    };
  }, [pathname]);

  const guild = guildStore.guild;

  return (
    <>
      <li className={"text-xs font-semibold text-mt-dark-2"}>/</li>

      <li className={"font-medium text-blue-400 hover:underline"}>
        <Link href={`/dashboard/${id}`}>
          <span>{guild?.name ?? id}</span>
        </Link>
      </li>

      {path && (
        <>
          <li className={"text-xs font-semibold text-mt-dark-2"}>/</li>

          <li>
            {path.isLink ? (
              <Link
                className={"font-medium text-blue-400 hover:underline"}
                href={`/dashboard/${id}/${path.path.toLowerCase()}`}
              >
                {path.path}
              </Link>
            ) : (
              <span>{path.path}</span>
            )}
          </li>
        </>
      )}
    </>
  );
}

export default observer(DynamicCrumbs);
