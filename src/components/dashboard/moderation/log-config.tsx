import { API_URL } from "@/environment";
import { ComboboxData, Select, Switch } from "@mantine/core";
import { IconCheck, IconHash, IconX } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import { useGuildId } from "@/lib/hooks";
import { useState } from "react";

interface Props {
  data: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
  text: ComboboxData;
}

function LogConfig({ data, handleChange, text }: Props) {
  const id = useGuildId();
  const [notifyUser, setNotifyUser] = useState<boolean>(data.notify_user);

  const createWebhook = (channelId: string) => {
    window.open(
      `${API_URL}/guild/${id}/webhook/redirect?channel_id=${channelId}&webhook=whmod`,
      "Create Webhook | Plyoox",
      "height=900,width=500",
    );

    const bc = new BroadcastChannel("webhook-creation");
    bc.onmessage = (msg) => {
      if (typeof msg.data === "string") {
        const data = msg.data.split(":");
        if (data.at(0) !== "moderation") return;

        handleChange({ log_channel: data[1] });
        bc.close();
      }
    };
  };

  return (
    <>
      <Select
        clearable
        searchable
        data={text}
        defaultValue={data.log_channel}
        description="This channel will be used to log moderation actions. A webhook will be created."
        label="Logchannel"
        leftSection={<IconHash size={16} />}
        nothingFoundMessage="This guild has no channels."
        onChange={(val) => {
          if (val) createWebhook(val);
          else {
            handleChange({ log_channel: null });
          }
        }}
        placeholder="Select channel..."
      />

      <Switch
        checked={notifyUser}
        color="teal"
        label="Notify user on action"
        mt={15}
        onChange={(event) => {
          handleChange({ notify_user: event.currentTarget.checked });
          setNotifyUser(event.currentTarget.checked);
        }}
        size="md"
        thumbIcon={
          notifyUser ? (
            <IconCheck color="teal.5" size="0.8rem" stroke={3} />
          ) : (
            <IconX color="red.6" size="0.8rem" stroke={3} />
          )
        }
      />
    </>
  );
}

export default LogConfig;
