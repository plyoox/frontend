"use client";

import { Button, Tooltip } from "@mantine/core";
import { IconCopyPlus } from "@tabler/icons-react";
import { useGuildData, useModerationPunishments } from "@/lib/hooks";
import { useState } from "react";
import EditPunishmentModal from "@/components/modals/edit-punishment-modal";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import PunishmentList from "@/components/dashboard/punishments/punishment-list";
import RequestError from "@/components/dashboard/request-error";
import type { UpsertPunishment } from "@/types/moderation";

function PunishmentContainer() {
  const [open, setOpen] = useState<Partial<UpsertPunishment> | null>(null);

  const punishments = useModerationPunishments();
  const guildData = useGuildData({ premium: true });

  if (punishments.error) {
    return <RequestError error={punishments.error} />;
  }

  if (punishments.isLoading || !punishments.data) {
    return <LoadingSkeleton />;
  }

  let button = (
    <Button color={"plyoox"} leftSection={<IconCopyPlus />} onClick={() => setOpen({})} variant={"light"}>
      Create new template
    </Button>
  );
  if (guildData.data?.premium && punishments.data.length >= 50) {
    button = (
      <Tooltip label={"Maximum amount of punishments reached."}>
        <Button disabled color={"plyoox"} leftSection={<IconCopyPlus />} onClick={() => setOpen({})} variant={"light"}>
          Create new template
        </Button>
      </Tooltip>
    );
  } else if (punishments.data.length >= 25) {
    button = (
      <Tooltip label={"Maximum amount of punishments reached."}>
        <Button disabled color={"plyoox"} leftSection={<IconCopyPlus />} onClick={() => setOpen({})} variant={"light"}>
          Create new template
        </Button>
      </Tooltip>
    );
  }

  return (
    <>
      <div className={"flex justify-end gap-2"}>{button}</div>

      <PunishmentList className={"my-2"} editPunishment={setOpen} punishments={punishments.data} />
      <EditPunishmentModal open={open} setOpen={setOpen} />
    </>
  );
}

export default PunishmentContainer;
