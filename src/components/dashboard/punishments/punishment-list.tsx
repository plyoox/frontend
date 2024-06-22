import { useDeletePunishment } from "@/lib/hooks";
import type { PunishmentType } from "@/types/moderation";
import { notifications } from "@mantine/notifications";
import { IconCopyCheck, IconCopyX } from "@tabler/icons-react";
import { clsx } from "clsx";
import Punishment from "./punishment";

function PunishmentList({
  punishments,
  className,
  editPunishment,
}: {
  punishments: PunishmentType[];
  className?: string;
  editPunishment: (punishment: Punishment) => void;
}) {
  const deletePunishment = useDeletePunishment();

  if (!punishments.length) {
    return (
      <div className={clsx("flex h-full flex-col items-center justify-center", className)}>
        <span className="text-sm text-mt-dark-2">No punishments</span>
      </div>
    );
  }

  return (
    <div className={className}>
      {punishments.map((punishment) => (
        <Punishment
          key={punishment.id}
          onDelete={() => {
            deletePunishment
              .mutateAsync(punishment.id)
              .then(() => {
                notifications.show({
                  title: "Punishment deleted",
                  message: `Punishment ${punishment.name} has been deleted.`,
                  color: "green",
                  icon: <IconCopyCheck size={14} />,
                });
              })
              .catch((e) => {
                notifications.show({
                  title: "Failed to delete punishment",
                  message: e.response?.data?.message ?? e.message,
                  color: "red",
                  icon: <IconCopyX size={14} />,
                });
              });
          }}
          onEdit={() => editPunishment(punishment)}
          punishment={punishment}
        />
      ))}
    </div>
  );
}

export default PunishmentList;
