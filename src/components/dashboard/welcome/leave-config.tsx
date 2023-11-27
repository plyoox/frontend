import { GuildStoreContext } from "@/stores/guild-store";
import { IconBlockquote, IconHash } from "@tabler/icons-react";
import { Select, Textarea } from "@mantine/core";
import { WELCOME_TEMPLATES } from "@/config/constants";
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
        nothingFoundMessage={'No channels available. Make sure the bot has the "Send Messages" permission.'}
        onChange={(value) => handleChange({ leave_channel: value ?? "" })}
        placeholder="Select channel..."
        value={data.leave_channel}
      />

      <Textarea
        autosize
        description="The message that will be sent when a user leaves the guild"
        label="Leave message"
        leftSection={<IconBlockquote size={16} />}
        maxLength={1900}
        minRows={3}
        mt={5}
        onChange={(e) => handleChange({ leave_message: e.target.value })}
        placeholder="Write leave message..."
        ref={textFieldRef}
        rightSection={<TextareaTemplate template={WELCOME_TEMPLATES} textarea={textFieldRef} />}
        value={data.leave_message}
      />
    </>
  );
}

export default observer(LeaveConfig);
