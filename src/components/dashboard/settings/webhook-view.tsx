"use client";

import { API_URL } from "@/environment";
import { ActionIcon, Tooltip } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconX } from "@tabler/icons-react";
import { MaybeWebhook } from "@/types/webhook";
import { UseState } from "@/types/react";
import { useContext, useState } from "react";
import axios from "axios";

interface Props extends MaybeWebhook {
  setWebhooks: UseState<MaybeWebhook[] | null>;
}

function WebhookView({ id, channel_id, ref_count, single_use, setWebhooks }: Props) {
  const guildStore = useContext(GuildStoreContext);

  const [deleting, setDeleting] = useState(false);

  const isWebhook = !!channel_id;
  const channel = isWebhook ? guildStore.textChannels.get(channel_id!) : guildStore.textChannels.get(id!);

  return (
    <div className="flex items-center gap-2 rounded-md bg-mt-dark-5 px-4 py-2">
      <div className={"flex-grow"}>{channel?.name ?? "Unknown Channel"}</div>
      <div className={"mx-2 flex gap-4 text-sm"}>
        <div className={"flex flex-col"}>
          <span className={"text-mt-dark-1"}>Type</span>
          <span>{isWebhook ? "Webhook" : "Channel"}</span>
        </div>
        <div className={"flex flex-col"}>
          <span className={"text-mt-dark-1"}>Ref Count</span>
          <span>{ref_count}</span>
        </div>
        <div className={"flex flex-col"}>
          <span className={"text-mt-dark-1"}>Single Use</span>
          <span>{single_use ? "Yes" : "No"}</span>
        </div>
      </div>

      <Tooltip withArrow label={"Delete Webhook"} position={"left"}>
        <ActionIcon
          color={"red"}
          loading={deleting}
          onClick={() => {
            setDeleting(true);
            deleteWebhook({ webhookId: id!, guildId: guildStore.guild?.id! })
              .then(() => {
                setWebhooks((webhooks) => webhooks?.filter((w) => w.id !== id) ?? null);
                setDeleting(false);
              })
              .catch(() => {
                setDeleting(false);
              });
          }}
          variant={"light"}
        >
          <IconX />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

export default WebhookView;

function deleteWebhook({ webhookId, guildId }: { webhookId: string; guildId: string }) {
  return axios.delete(`${API_URL}/guild/${guildId}/webhook/${webhookId}`, {
    withCredentials: true,
  });
}
