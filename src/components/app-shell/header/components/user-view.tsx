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
            className={`flex items-center duration-200 hover:bg-mt-dark-7 hover:shadow-pl-button p-1.5 px-2 rounded-lg justify-center bg-transparent outline-none ${
              open ? "shadow-pl-button" : ""
            }`}
            ref={buttonRef}
          >
            <Image
              alt="avatar"
              className="rounded-full mr-2"
              height={36}
              src={`https://cdn.discordapp.com/${avatar}`}
              width={36}
            />

            <span>{store.user?.display_name ?? store.user?.username}</span>

            <IconChevronDown className={`duration-200 ml-1 ${open ? "rotate-180" : ""}`} size={15} />
          </Menu.Button>

          <Menu.Items
            className="bg-mt-dark-7 absolute right-0 w-44 mt-2 p-2 rounded-md z-20 shadow-pl-accent-light drop-shadow-2xl text-gray-200 text-sm"
            style={{ width: buttonRef.current?.clientWidth }}
          >
            <Menu.Item
              as={Link}
              className="flex p-2 cursor-pointer hover:bg-mt-dark-6 rounded-md hover:text-white"
              href="/dashboard"
            >
              <IconListSearch className="mr-2" size={18} />
              Server list
            </Menu.Item>

            <Menu.Item
              as={Link}
              className="mt-0.5 flex p-2 cursor-pointer hover:bg-red-400/20 rounded-md hover:text-white duration-200"
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
