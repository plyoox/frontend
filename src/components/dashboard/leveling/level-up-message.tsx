import { GuildStoreContext } from "@/stores/guild-store";
import { IconBlockquote, IconHash } from "@tabler/icons-react";
import { LEVEL_TEMPLATES } from "@/config/constants";
import { LevelingResponse } from "@/types/responses";
import { Select, Textarea } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import TextareaTemplate from "@/components/dashboard/welcome/textarea-template";

function LevelUpMessage({
  config,
  handleChange,
}: {
  config: LevelingResponse;
  handleChange: (config: Partial<LevelingResponse>) => void;
}) {
  const guildStore = useContext(GuildStoreContext);
  const levelRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <Select
        clearable
        searchable
        data={guildStore.writeableAsSelectable}
        description="The bot will sent the message in this channel. If no channel is set, the bot will sent the message in the current channel."
        label="Message channel"
        leftSection={<IconHash size={16} />}
        onChange={(value) => handleChange({ channel: value })}
        placeholder="Select channel to sent message to..."
        value={config.channel}
      />

      <Textarea
        autosize
        description="The message that will be sent when a user levels up."
        label="Level message"
        leftSection={<IconBlockquote />}
        maxLength={1900}
        minRows={1}
        onChange={(e) => handleChange({ message: e.target.value })}
        placeholder="🎉 {user.mention} has reached level {level}!"
        ref={levelRef}
        rightSection={<TextareaTemplate template={LEVEL_TEMPLATES} textarea={levelRef} />}
        value={config?.message}
      />
    </>
  );
}

export default observer(LevelUpMessage);
