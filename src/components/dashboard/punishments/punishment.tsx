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
    <div className={"mt-2 flex items-center gap-x-4 rounded-md bg-mt-dark-6 px-4 py-2"}>
      <div className={"flex flex-grow items-center gap-2"}>
        <Tooltip label={punishment.enabled ? "Enabled" : "Disabled"}>
          <span
            className={`size-4 min-w-4 cursor-help rounded-full ${punishment.enabled ? "bg-green-500" : "bg-red-500"}`}
            title={`Rule ${punishment.enabled ? "enabled" : "disabled"}`}
          />
        </Tooltip>

        <span className={"line-clamp-2 text-wrap break-all"}>{punishment.name}</span>
      </div>

      <div className={"mr-5 flex flex-col"}>
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
