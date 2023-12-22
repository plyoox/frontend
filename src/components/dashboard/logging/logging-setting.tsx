import { GuildStoreContext } from "@/stores/guild-store";
import { LoggingSetting } from "@/types/logging";
import { MultiSelect, Select } from "@mantine/core";
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
        forbidText: false,
        noSingleUse: false,
      },
    });

    const bc = new BroadcastChannel("webhook-creation");
    bc.onmessage = (msg) => {
      console.log(msg);
      if (typeof msg.data === "string") {
        const data = msg.data.split(":");
        if (data.at(0) !== setting.kind) return;

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
        placeholder={"Select a logging channel..."}
      />

      <MultiSelect
        data={guildStore.rolesAsSelectable}
        description={"Actions by users with these roles will not be logged."}
        label={"Exempt Roles"}
        maxValues={50}
        onChange={(value) => onChange({ ...setting, exempt_roles: value })}
        placeholder={"Select exempt roles..."}
        value={setting.exempt_roles}
      />
      <MultiSelect
        data={guildStore.channelsAsSelectable}
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

export default observer(LoggingSetting);
