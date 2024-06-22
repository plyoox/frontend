import type { Guild } from "@/discord/types";
import { API_URL } from "@/environment";
import { Avatar } from "@mantine/core";
import { IconLayoutDashboard, IconUserPlus } from "@tabler/icons-react";
import { clsx } from "clsx";
import Link from "next/link";

interface Props {
  guild: Guild;
}

function ServerCard({ guild }: Props) {
  function openInviteWindow() {
    window.open(`${API_URL}/discord/invite?guild_id=${guild.id}`, "Invite Bot | Plyoox", "height=900,width=500");
  }

  const acronym = guild.name
    .replace(/'s /g, " ")
    .replace(/\w+/g, (e) => e[0])
    .replace(/\s/g, "");

  const iconUrl = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256` : null;

  let textSize: string;
  switch (acronym.length) {
    case 1:
      textSize = "text-2xl";
      break;
    case 2:
      textSize = "text-xl";
      break;
    case 3:
      textSize = "text-base";
      break;
    default:
      textSize = "text-xs";
      break;
  }

  const guildData = (
    <>
      <Avatar alt={guild.name} color="gray" radius="xl" src={iconUrl}>
        <span className={`whitespace-nowrap ${textSize}`}>{acronym}</span>
      </Avatar>
      <span className="ml-2 mt-1.5 text-lg">{guild.name}</span>
      {guild.has_bot ? <IconLayoutDashboard className={"ml-auto"} /> : <IconUserPlus className={"ml-auto"} />}
    </>
  );

  if (guild.has_bot) {
    return (
      <Link
        className={clsx(
          "my-2 flex w-full items-center rounded-md bg-mt-dark-7 p-2.5 duration-200 hover:bg-mt-dark-6 hover:shadow-pl-button",
          guild.is_new && "shadow-ring-sm shadow-amber-300",
        )}
        href={`/dashboard/${guild.id}`}
      >
        {guildData}
      </Link>
    );
  }

  return (
    <button
      type={"button"}
      className={
        "my-2 flex w-full items-center rounded-md bg-mt-dark-7 p-2.5 duration-200 hover:bg-mt-dark-6 hover:shadow-pl-primary"
      }
      onClick={openInviteWindow}
    >
      {guildData}
    </button>
  );
}

export default ServerCard;
