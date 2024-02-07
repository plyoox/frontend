import { GuildStoreContext } from "@/stores/guild-store";
import { IconBlockquote, IconHash } from "@tabler/icons-react";
import { NO_CHANNELS_AVAILABLE, WELCOME_TEMPLATES } from "@/lib/constants";
import { Select, Textarea } from "@mantine/core";
import { WelcomeResponse } from "@/types/responses";
import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import TextareaTemplate from "./textarea-template";

type Config = WelcomeResponse;

function LeaveConfig({ data, handleChange }: { data: Config; handleChange: (data: Partial<Config>) => void }) {
  const guildStore = useContext(GuildStoreContext);
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const channels = guildStore.writeableAsSelectable;

  return (
    <>
      <Select
        clearable
        searchable
        data={channels}
        description="The channel the bot will send the leave message"
        label="Leave message channel"
        leftSection={<IconHash size={16} />}
        mt={5}
        nothingFoundMessage={NO_CHANNELS_AVAILABLE}
        onChange={(value) => handleChange({ leave_channel: value ?? "" })}
        placeholder="Select channel..."
        value={data.leave_channel}
      />

      <Textarea
        autosize
        description="The message that will be sent when a user leaves the guild. Click on the icon on the right to use templates."
        label="Leave message"
        leftSection={<IconBlockquote size={16} />}
        maxLength={1900}
        minRows={2}
        mt={5}
        onChange={(e) => handleChange({ leave_message: e.target.value })}
        placeholder="{user.name} has left the server <:sadlinus:696328264888746024>"
        ref={textFieldRef}
        rightSection={
          <TextareaTemplate
            onChange={(value) => handleChange({ leave_message: value })}
            template={WELCOME_TEMPLATES}
            textarea={textFieldRef}
          />
        }
        value={data.leave_message}
      />
    </>
  );
}

export default observer(LeaveConfig);
