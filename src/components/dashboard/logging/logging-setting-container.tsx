import { ComboboxItemGroup, MultiSelect, Select } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { LoggingSetting } from "@/types/logging";
import { UseState } from "@/types/react";
import { modals } from "@mantine/modals";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

function LoggingSettingContainer({
  setting,
  onChange,
  textChannels,
  setTextChannels,
}: {
  setting: LoggingSetting;
  textChannels: ComboboxItemGroup[];
  setTextChannels: UseState<ComboboxItemGroup[]>;
  onChange: (config: LoggingSetting) => void;
}) {
  const guildStore = useContext(GuildStoreContext);

  const createWebhook = (channelId: string) => {
    modals.openContextModal({
      modal: "webhook",
      title: "Create Webhook",
      centered: true,
      innerProps: {
        text: "Create a new webhook",
        channel: channelId,
        webhookKind: setting.kind,
        forbidText: false,
        noSingleUse: false,
      },
    });

    const bc = new BroadcastChannel("webhook-creation");
    bc.onmessage = (msg) => {
      if (typeof msg.data === "string") {
        const data = msg.data.split(":");
        if (data.at(0) !== `log_${setting.kind}`) return;

        const webhookId = data.at(2);

        // Add webhook to the list of channels
        if (webhookId)
          setTextChannels((channels) => {
            const channel = guildStore.textChannels.get(data[1]);
            const webhookGroup = channels.find((group) => group.group === "Webhooks");

            if (webhookGroup) {
              // check if webhook already exists
              if (!webhookGroup.items.some((item: any) => item.value === webhookId)) {
                webhookGroup.items.push({
                  label: (channel?.name ?? "Unknown Channel") + " (Webhook)",
                  value: webhookId,
                  disabled: true,
                });
              }
            } else {
              channels.push({
                group: "Webhooks",
                items: [
                  {
                    label: (channel?.name ?? "Unknown Channel") + " (Webhook)",
                    value: webhookId,
                    disabled: true,
                  },
                ],
              });
            }

            return [...channels];
          });

        onChange({
          ...setting,
          channel: {
            id: data[1]!,
            webhook_channel: data[2],
            single_use: false,
            ref_count: 1,
          },
        });
        bc.close();
      }
    };
  };

  return (
    <div className={"my-3"}>
      <Select
        clearable
        searchable
        data={textChannels}
        description={"The channel, where the logs should be sent to."}
        label={"Log Channel"}
        onChange={(value) => {
          if (value) {
            createWebhook(value);
          } else {
            onChange({ ...setting, channel: null });
          }
        }}
        placeholder={"Select a logging channel..."}
        value={setting.channel?.id ?? null}
      />

      <MultiSelect
        data={textChannels}
        description={"Actions by users with these roles will not be logged."}
        label={"Exempt Roles"}
        maxValues={50}
        onChange={(value) => onChange({ ...setting, exempt_roles: value })}
        placeholder={"Select exempt roles..."}
        value={setting.exempt_roles}
      />
      <MultiSelect
        data={textChannels}
        description={"Actions in these channels will not be logged."}
        label={"Exempt Channels"}
        maxValues={50}
        onChange={(value) => onChange({ ...setting, exempt_channels: value })}
        placeholder={"Select exempt channels..."}
        value={setting.exempt_channels}
      />
    </div>
  );
}

export default observer(LoggingSettingContainer);
