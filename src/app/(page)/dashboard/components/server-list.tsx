"use client";

import { Guild } from "@/discord/types";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserGuilds } from "@/lib/hooks";
import ServerCard from "./server-card";
import ServerLoading from "./server-loading";

function ServerList({ guilds: parsedGuilds }: { guilds: Guild[] | null }) {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const [guilds, setGuilds] = useState<Guild[] | null>(parsedGuilds);

  const fetchedGuilds = useUserGuilds({ enabled: !guilds });

  useEffect(() => {
    if (searchParams.has("data")) {
      push("/dashboard");
    }
  }, [searchParams, push]);

  useEffect(() => {
    if (fetchedGuilds.data) {
      setGuilds(
        fetchedGuilds.data.sort((a, b) => {
          if (a.has_bot && !b.has_bot) return -1;
          if (!a.has_bot && b.has_bot) return 1;
          return 0;
        }),
      );
    }
  }, [fetchedGuilds.data]);

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
