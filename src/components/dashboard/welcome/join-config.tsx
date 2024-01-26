import { DiscordPermission } from "@/discord/enums";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconBlockquote, IconHash } from "@tabler/icons-react";
import { MultiRoleSelect } from "@/components/selects";
import { NO_CHANNELS_AVAILABLE, WELCOME_TEMPLATES } from "@/config/constants";
import { Select, Textarea } from "@mantine/core";
import { WelcomeResponse } from "@/types/responses";
import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import TextareaTemplate from "./textarea-template";

type Config = WelcomeResponse;

function JoinConfig({ data, handleChange }: { data: Config; handleChange: (data: Partial<Config>) => void }) {
  const guildStore = useContext(GuildStoreContext);
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const manageRolePermission = guildStore.botHasPermission(DiscordPermission.ManageRoles);

  return (
    <>
      <MultiRoleSelect
        data={guildStore.manageableRolesAsSelectable}
        description={"A list of roles that the user will receive after joining."}
        label={"Join roles"}
        maxValues={10}
        missingPermission={!manageRolePermission}
        onChange={(value) => handleChange({ join_roles: value })}
        placeholder={"Select roles..."}
        value={data.join_roles}
      />

      <Select
        clearable
        searchable
        data={guildStore.writeableAsSelectable}
        description="The channel the bot will send the join message"
        label="Join message channel"
        leftSection={<IconHash size={16} />}
        mt={5}
        nothingFoundMessage={NO_CHANNELS_AVAILABLE}
        onChange={(value) => handleChange({ join_channel: value ?? "" })}
        placeholder="Select channel..."
        value={data.join_channel}
      />

      <Textarea
        autosize
        description="The message that will be sent when a user joins the guild. Click on the icon on the right to use templates."
        label="Join message"
        leftSection={<IconBlockquote size={16} />}
        maxLength={1900}
        minRows={2}
        mt={5}
        onChange={(e) => handleChange({ join_message: e.target.value })}
        placeholder="{user.mention} has joined the guild as #{guild.member_count} member! 🎉"
        ref={textFieldRef}
        rightSection={<TextareaTemplate template={WELCOME_TEMPLATES} textarea={textFieldRef} />}
        value={data.join_message}
      />
    </>
  );
}

export default observer(JoinConfig);
