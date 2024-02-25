import { AppShell } from "@mantine/core";
import { ILink } from "@/types/utils";
import {
  IconBrandTwitch,
  IconMessages,
  IconSettings,
  IconShieldChevron,
  IconUserPlus,
  IconUserUp,
} from "@tabler/icons-react";
import Link from "./components/link";

interface SidenavProps {
  setOpen: (value: boolean) => void;
}

const LINKS: ILink[] = [
  {
    color: "pink",
    icon: <IconSettings size={20} />,
    label: "Settings",
    link: "settings",
  },
  {
    color: "grape",
    icon: <IconBrandTwitch size={20} />,
    label: "Notifications",
    link: "notifications",
  },
  {
    color: "blue",
    icon: <IconUserPlus size={20} />,
    label: "Welcome",
    link: "welcome",
  },
  {
    color: "teal",
    icon: <IconShieldChevron size={20} />,
    label: "Moderation",
    link: "moderation",
  },
  {
    color: "lime",
    icon: <IconMessages size={20} />,
    label: "Logging",
    link: "logging",
  },
  {
    color: "yellow",
    icon: <IconUserUp size={20} />,
    label: "Leveling",
    link: "leveling",
  },
];

function Sidenav({ setOpen }: SidenavProps) {
  return (
    <AppShell.Navbar pt={20} px={10} py={5}>
      <AppShell.Section>
        {LINKS.map((link) => (
          <Link key={link.label} {...link} setOpened={setOpen} />
        ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

export default Sidenav;
