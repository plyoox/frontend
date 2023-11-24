import { Avatar } from "@mantine/core";
import { Guild } from "@/types/discord";
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
      className={`p-2.5 flex w-full bg-mt-dark-7 my-2 items-center hover:bg-mt-dark-6 duration-200 rounded-md ${
        guild.has_bot ? "hover:shadow-pl-button" : "hover:shadow-pl-primary"
      }`}
      href={url}
    >
      <Avatar alt={guild.name} color="gray" radius="xl" src={iconUrl}>
        {acronym}
      </Avatar>
      <span className="text-lg mt-1.5 ml-2">{guild.name}</span>
      {guild.has_bot ? <IconLayoutDashboard className={"ml-auto"} /> : <IconUserPlus className={"ml-auto"} />}
    </Link>
  );
}

export default ServerCard;
