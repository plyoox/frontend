import { Avatar } from "@mantine/core";
import { Guild } from "@/discord/types";
import { IconLayoutDashboard, IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  guild: Guild;
}

function ServerCard({ guild }: Props) {
  const acronym = guild.name
    .replace(/'s /g, " ")
    .replace(/\w+/g, (e) => e[0])
    .replace(/\s/g, "");

  const url = guild.has_bot ? `/dashboard/${guild.id}` : `/invite/${guild.id}`;
  const iconUrl = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256` : null;

  return (
    <Link
      className={`my-2 flex w-full items-center rounded-md bg-mt-dark-7 p-2.5 duration-200 hover:bg-mt-dark-6 ${
        guild.has_bot ? "hover:shadow-pl-button" : "hover:shadow-pl-primary"
      }`}
      href={url}
    >
      <Avatar alt={guild.name} color="gray" radius="xl" src={iconUrl}>
        {acronym}
      </Avatar>
      <span className="ml-2 mt-1.5 text-lg">{guild.name}</span>
      {guild.has_bot ? <IconLayoutDashboard className={"ml-auto"} /> : <IconUserPlus className={"ml-auto"} />}
    </Link>
  );
}

export default ServerCard;
