import { IconChevronDown, IconListSearch, IconLogout } from "@tabler/icons-react";
import { Menu } from "@mantine/core";
import { UserStoreContext } from "@/stores/user-store";
import { observer } from "mobx-react-lite";
import { useContext, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function UserView() {
  const store = useContext(UserStoreContext);
  const [open, setOpen] = useState(false);

  const avatar = useMemo(() => {
    const user = store.user!;

    return user.avatar
      ? `avatars/${user.id}/${user.avatar}.webp?size=256`
      : `embed/avatars/${(BigInt(user.id) << BigInt(22)) % BigInt(6)}.webp`;
  }, [store.user]);

  return (
    <Menu onChange={setOpen} opened={open}>
      <Menu.Target>
        <button
          className={`flex items-center justify-center rounded-lg bg-transparent p-1.5 px-2 outline-none duration-200 hover:bg-mt-dark-7 hover:shadow-pl-button ${
            open ? "shadow-pl-button" : ""
          }`}
        >
          <Image
            unoptimized
            alt="avatar"
            className="mr-2 rounded-full"
            height={36}
            src={`https://cdn.discordapp.com/${avatar}`}
            width={36}
          />

          <span className={"text-white"}>{store.user?.display_name ?? store.user?.username}</span>

          <IconChevronDown className={`ml-1 duration-200 ${open ? "rotate-180" : ""}`} size={15} />
        </button>
      </Menu.Target>

      <Menu.Dropdown className="p-2 shadow-pl-accent-light drop-shadow-2xl">
        <Menu.Label>Server</Menu.Label>
        <Menu.Item component={Link} href="/dashboard" leftSection={<IconListSearch className={"size-3.5"} />}>
          Server list
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>User</Menu.Label>
        <Menu.Item
          color={"red"}
          component={Link}
          href="/"
          leftSection={<IconLogout className={"size-3.5"} />}
          onClick={() => {
            store.requestLogout(false);
          }}
        >
          Logout
        </Menu.Item>

        <Menu.Item
          color={"red"}
          component={Link}
          href="/"
          leftSection={<IconLogout className={"size-3.5"} />}
          onClick={() => {
            store.requestLogout(true);
          }}
        >
          Logout everywhere
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default observer(UserView);
