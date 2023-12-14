import { GuildStoreContext } from "@/stores/guild-store";
import { IconCheck, IconX } from "@tabler/icons-react";
import { LoggingSetting } from "@/types/logging";
import { MultiSelect, Select, Switch } from "@mantine/core";
import { modals } from "@mantine/modals";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

function LoggingSetting({
  setting,
  onChange,
}: {
  setting: LoggingSetting;
  onChange: (config: LoggingSetting) => void;
}) {
  const guildStore = useContext(GuildStoreContext);

  const createWebhook = (channelId: string) => {
    modals.openContextModal({
      modal: "webhook",
      title: "Create Webhook",
      centered: true,
      innerProps: {
        text: "Create a new ",
        channel: channelId,
        webhookKind: setting.kind,
        forbidText: true,
        noSingleUse: false,
      },
    });

    const bc = new BroadcastChannel("new-webhook");
    bc.onmessage = (msg) => {
      if (typeof msg.data === "string") {
        const data = msg.data.split(":");
        if (data.at(2) !== setting.kind) return;

        onChange({
          ...setting,
          channel: data[1],
        });
        bc.close();
      }
    };
  };

  return (
    <div className={"my-3"}>
      <Select
        data={guildStore.textAsSelectable}
        description={"The channel, where the logs should be sent to."}
        label={"Log Channel"}
        onChange={(value) => {
          if (value) {
            createWebhook(value);
          } else {
            onChange({ ...setting, channel: null });
          }
        }}
      />

      <MultiSelect
        data={guildStore.rolesAsSelectable}
        description={"Actions by users with these roles will not be logged."}
        label={"Exempt Roles"}
        maxValues={50}
        onChange={(value) => onChange({ ...setting, exempt_roles: value })}
        value={setting.exempt_roles}
      />
      <MultiSelect
        data={guildStore.channelsAsSelectable}
        description={"Actions in these channels will not be logged."}
        label={"Exempt Channels"}
        maxValues={50}
        onChange={(value) => onChange({ ...setting, exempt_channels: value })}
        value={setting.exempt_channels}
      />
    </div>
  );
}

export default observer(LoggingSetting);
