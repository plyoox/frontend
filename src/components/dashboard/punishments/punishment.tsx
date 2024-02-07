import { ActionIcon, Tooltip } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";
import type { Punishment } from "@/types/moderation";

function Punishment({
  punishment,
  onDelete,
  onEdit,
}: {
  punishment: Punishment;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className={"flex items-center rounded-md bg-mt-dark-6 px-4 py-2"}>
      <div className={"flex items-center gap-2"}>
        <Tooltip label={punishment.enabled ? "Enabled" : "Disabled"}>
          <span
            className={`size-4 cursor-help rounded-full ${punishment.enabled ? "bg-green-500" : "bg-red-500"}`}
            title={`Rule ${punishment.enabled ? "enabled" : "disabled"}`}
          />
        </Tooltip>

        <span>{punishment.name}</span>
      </div>

      <div className={"ml-10 flex flex-col"}>
        <span className={"text-sm text-mt-dark-1"}>Actions</span>
        <span>{punishment.actions.length}</span>
      </div>

      <div className={"ml-auto"}>
        <Tooltip withArrow label="Edit action">
          <ActionIcon color="blue" onClick={onEdit} variant="light">
            <IconEdit size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip withArrow className={"ml-2"} label="Remove action">
          <ActionIcon color="red" onClick={onDelete} variant="light">
            <IconX size={18} />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
}

export default Punishment;
