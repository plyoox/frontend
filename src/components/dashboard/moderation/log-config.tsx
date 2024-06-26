import CustomSwitch from "@/components/custom-switch";
import { API_URL } from "@/environment";
import { useGuildId } from "@/lib/hooks";
import { GuildStoreContext } from "@/stores/guild-store";
import type { ModerationConfig } from "@/types/moderation";
import { type ComboboxItemGroup, Select } from "@mantine/core";
import { IconHash } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

interface Props {
  config: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function LogConfig({ config, handleChange }: Props) {
  const id = useGuildId();
  const guildStore = useContext(GuildStoreContext);

  const [textChannels, setTextChannels] = useState<ComboboxItemGroup[]>([]);

  const createWebhook = (channelId: string) => {
    window.open(
      `${API_URL}/guild/${id}/webhook/redirect?channel_id=${channelId}&webhook=moderation`,
      "Create Webhook | Plyoox",
      "height=900,width=500",
    );

    const bc = new BroadcastChannel("webhook-creation");
    bc.onmessage = (msg) => {
      if (typeof msg.data === "string") {
        const data = msg.data.split(":");
        if (data.at(0) !== "moderation") return;

        if (data.length === 3) {
          handleChange({ logging_channel: { id: data[2], webhook_channel: data[1], single_use: false, ref_count: 0 } });
        } else if (data.length === 2) {
          handleChange({ logging_channel: { id: data[1], webhook_channel: null, single_use: false, ref_count: 0 } });
        }

        bc.close();
      }
    };
  };

  useEffect(() => {
    if (config.logging_channel) {
      const channel = guildStore.textChannels.get(
        config.logging_channel.webhook_channel ? config.logging_channel.webhook_channel : config.logging_channel.id,
      );

      if (!channel) {
        setTextChannels(guildStore.textAsSelectable);
        return;
      }

      const webhook = {
        label: `${channel.name} (Webhook)`,
        value: config.logging_channel.id,
        disabled: true,
      };

      if (!webhook) {
        setTextChannels(guildStore.textAsSelectable);
        return;
      }

      setTextChannels((channels) => {
        const webhookGroup = channels.filter((group) => group.group !== "Webhooks");

        webhookGroup.push({
          group: "Webhooks",
          items: [webhook],
        });

        return webhookGroup;
      });
    } else {
      setTextChannels(guildStore.textAsSelectable);
    }
  }, [guildStore.textAsSelectable, guildStore.textChannels, config.logging_channel]);

  return (
    <>
      <Select
        clearable
        searchable
        data={textChannels}
        description="This channel will be used to log moderation actions. A webhook will be created."
        label="Logchannel"
        leftSection={<IconHash size={16} />}
        nothingFoundMessage="This guild has no channels."
        onChange={(val) => {
          if (val) createWebhook(val);
          else {
            handleChange({ logging_channel: null });
          }
        }}
        placeholder="Select channel..."
        value={config.logging_channel?.id ?? null}
      />

      <CustomSwitch
        checked={config.notify_user}
        className={"mt-4"}
        color="teal"
        label="Notify user on action"
        labelPosition="left"
        onChange={(checked) => {
          handleChange({ notify_user: checked });
        }}
      />
    </>
  );
}

export default observer(LogConfig);
