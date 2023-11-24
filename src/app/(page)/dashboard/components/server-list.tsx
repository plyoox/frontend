"use client";

import { Guild } from "@/types/discord";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ServerCard from "./server-card";
import ServerLoading from "./server-loading";

function ServerList({ guilds: parsedGuilds }: { guilds: Guild[] | null }) {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [guilds, setGuilds] = useState<Guild[] | null>(parsedGuilds);

  useEffect(() => {
    if (searchParams.has("data")) {
      push("/dashboard");
    }
  }, [searchParams, push]);

  if (!guilds || !guilds.length) return <ServerLoading />;

  return (
    <div>
      {guilds.map((g) => (
        <ServerCard guild={g} key={g.id} />
      ))}
    </div>
  );
}

export default ServerList;
