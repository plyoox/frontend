import { ActionIcon, Badge, Kbd, Tooltip } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconX } from "@tabler/icons-react";
import { LevelRole } from "@/types/leveling";
import { useContext, useMemo } from "react";

function LevelRoleItem({ levelRole, onRemove }: { levelRole: LevelRole; onRemove: (role: LevelRole) => void }) {
  const guildStore = useContext(GuildStoreContext);

  const role = useMemo(
    () => guildStore.roles.find((r) => r.id == levelRole.role),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [guildStore.roles],
  );

  const showWarning = useMemo(() => {
    if (!role) return false;
    let highestRole = guildStore.botHighestRole;
    if (!highestRole) return true;

    return role.position > highestRole.position;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, guildStore.botHighestRole]);

  const displayText = (
    <span className={"text-regular"}>
      Adding <Kbd>{role?.name ?? "Deleted Role"}</Kbd> when reaching level <Kbd>{levelRole.level}</Kbd>.
    </span>
  );

  return (
    <div className="my-1 flex items-center justify-between rounded-md bg-mt-dark-6 p-2 pl-2.5">
      <div className={"flex items-center gap-2"}>
        <span>{displayText}</span>

        {showWarning && (
          <Tooltip withArrow label="The bot has no permission to assign this role.">
            <Badge className={"cursor-help select-none"} color="red" variant="filled">
              Missing Permission
            </Badge>
          </Tooltip>
        )}
      </div>

      <Tooltip withArrow label="Remove action">
        <ActionIcon color="red" onClick={() => onRemove(levelRole)} variant="light">
          <IconX size={18} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

export default LevelRoleItem;
