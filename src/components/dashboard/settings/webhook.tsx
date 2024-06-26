"use client";

import { API_URL } from "@/environment";
import { GuildStoreContext } from "@/stores/guild-store";
import type { UseState } from "@/types/react";
import type { MaybeWebhook } from "@/types/webhook";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";

interface Props extends MaybeWebhook {
  setWebhooks: UseState<MaybeWebhook[]>;
}

function Webhook({ id, webhook_channel, ref_count, single_use, setWebhooks }: Props) {
  const guildStore = useContext(GuildStoreContext);

  const [deleting, setDeleting] = useState(false);

  const isWebhook = !!webhook_channel;
  const channel = isWebhook ? guildStore.textChannels.get(webhook_channel) : guildStore.textChannels.get(id);

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
            if (guildStore.guild === null) {
              return;
            }

            setDeleting(true);

            deleteWebhook({ webhookId: id, guildId: guildStore.guild.id })
              .then(() => {
                setWebhooks((webhooks) => webhooks?.filter((w) => w.id !== id));
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

export default observer(Webhook);

function deleteWebhook({ webhookId, guildId }: { webhookId: string; guildId: string }) {
  return axios.delete(`${API_URL}/guild/${guildId}/webhook/${webhookId}`, {
    withCredentials: true,
  });
}
