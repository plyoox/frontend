"use client";

import { Alert, List } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconAlertTriangle, IconX } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const PERMISSION_NAME_MAP = new Map<bigint, string>();
PERMISSION_NAME_MAP.set(BigInt(0x2000), "Manage Messages");
PERMISSION_NAME_MAP.set(BigInt(0x800), "Send Messages");
PERMISSION_NAME_MAP.set(BigInt(0x10000000), "Manage Roles");
PERMISSION_NAME_MAP.set(BigInt(0x2), "Kick Members");
PERMISSION_NAME_MAP.set(BigInt(0x4), "Ban Members");
PERMISSION_NAME_MAP.set(BigInt(0x2000), "Manage Messages");
PERMISSION_NAME_MAP.set(BigInt(0x10000000000), "Moderate Members");
PERMISSION_NAME_MAP.set(BigInt(0x20), "Manager Server");

function RequiredPermissionAlert({ permissions }: { permissions: bigint[] }) {
  const guildStore = useContext(GuildStoreContext);

  if (!guildStore.loaded) return null;

  const permissionList = [];

  for (const perm of permissions) {
    if (!guildStore.botHasPermission(perm)) {
      const permissionName = PERMISSION_NAME_MAP.get(perm);

      permissionName && permissionList.push(permissionName);
    }
  }

  if (!permissionList.length) return null;

  return (
    <Alert className={"mb-2"} color={"red"} icon={<IconAlertTriangle />} title={"Missing Permissions"}>
      <List size={"sm"}>
        {permissionList.map((permission) => (
          <List.Item key={permission}>
            <div className={"flex items-center gap-2"}>
              <IconX color={"red"} />
              {permission}
            </div>
          </List.Item>
        ))}
      </List>
    </Alert>
  );
}

export default observer(RequiredPermissionAlert);
