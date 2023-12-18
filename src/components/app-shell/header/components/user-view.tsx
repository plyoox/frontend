import { IconChevronDown, IconListSearch, IconLogout } from "@tabler/icons-react";
import { Menu } from "@headlessui/react";
import { UserStoreContext } from "@/stores/user-store";
import { observer } from "mobx-react-lite";
import { useContext, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function UserView() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const store = useContext(UserStoreContext);

  const avatar = useMemo(() => {
    const user = store.user!;

    return user.avatar
      ? `avatars/${user.id}/${user.avatar}.webp?size=256`
      : `embed/avatars/${(BigInt(user.id) << BigInt(22)) % BigInt(6)}.png`;
  }, [store.user]);

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`flex items-center justify-center rounded-lg bg-transparent p-1.5 px-2 outline-none duration-200 hover:bg-mt-dark-7 hover:shadow-pl-button ${
              open ? "shadow-pl-button" : ""
            }`}
            ref={buttonRef}
          >
            <Image
              alt="avatar"
              className="mr-2 rounded-full"
              height={36}
              src={`https://cdn.discordapp.com/${avatar}`}
              width={36}
            />

            <span className={"text-white"}>{store.user?.display_name ?? store.user?.username}</span>

            <IconChevronDown className={`ml-1 duration-200 ${open ? "rotate-180" : ""}`} size={15} />
          </Menu.Button>

          <Menu.Items
            className="absolute right-0 z-20 mt-2 w-44 rounded-md bg-mt-dark-7 p-2 text-sm text-gray-200 shadow-pl-accent-light drop-shadow-2xl"
            style={{ width: buttonRef.current?.clientWidth }}
          >
            <Menu.Item
              as={Link}
              className="flex cursor-pointer rounded-md p-2 hover:bg-mt-dark-6 hover:text-white"
              href="/dashboard"
            >
              <IconListSearch className="mr-2" size={18} />
              Server list
            </Menu.Item>

            <Menu.Item
              as={Link}
              className="mt-0.5 flex cursor-pointer rounded-md p-2 duration-200 hover:bg-red-400/20 hover:text-white"
              href="/"
              onClick={() => {
                store.requestLogout();
              }}
            >
              <IconLogout className="mr-2 text-red-400" size={18} />
              Logout
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export default observer(UserView);
