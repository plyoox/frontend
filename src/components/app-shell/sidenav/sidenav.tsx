import { AppShell } from "@mantine/core";
import {
  IconArrowUpCircle,
  IconBrandTwitch,
  IconMessages,
  IconSettings,
  IconShieldChevron,
  IconUserPlus,
} from "@tabler/icons-react";
import { FC } from "react";
import Link from "./components/link";
import { ILink } from "@/types/utils";

interface SidenavProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const LINKS: ILink[] = [
  {
    color: "pink",
    icon: <IconSettings size={15} />,
    label: "Settings",
    link: "settings",
  },
  {
    color: "grape",
    icon: <IconBrandTwitch size={15} />,
    label: "Twitch",
    link: "notifications",
    beta: true,
  },
  {
    color: "blue",
    icon: <IconUserPlus size={15} />,
    label: "Welcome",
    link: "welcome",
  },
  {
    color: "teal",
    icon: <IconShieldChevron size={15} />,
    label: "Moderation",
    link: "moderation",
  },
  {
    color: "lime",
    icon: <IconMessages size={15} />,
    label: "Logging",
    link: "logging",
  },
  {
    color: "yellow",
    icon: <IconArrowUpCircle size={15} />,
    label: "Leveling",
    link: "leveling",
  },
];

function Sidenav({ open, setOpen }: SidenavProps) {
  return (
    <AppShell.Navbar hidden={open} pt={20} px={10} py={5}>
      <AppShell.Section>
        {LINKS.map((link) => (
          <Link key={link.label} {...link} setOpened={setOpen} />
        ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

export default Sidenav;
