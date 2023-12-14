import { DiscordPermission } from "@/discord/enums";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconAt, IconBlockquote, IconHash } from "@tabler/icons-react";
import { MultiSelect, Select, Textarea } from "@mantine/core";
import { WELCOME_TEMPLATES } from "@/config/constants";
import { WelcomeResponse } from "@/types/responses";
import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import TextareaTemplate from "./textarea-template";

type Config = WelcomeResponse;

function JoinConfig({ data, handleChange }: { data: Config; handleChange: (data: Partial<Config>) => void }) {
  const guildStore = useContext(GuildStoreContext);
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const manageRolePermission = guildStore.botHasPermission(DiscordPermission.ManageRoles);
  const roles = guildStore.rolesAsSelectable;
  const channels = guildStore.writeableAsSelectable;

  return (
    <>
      <MultiSelect
        clearable
        searchable
        data={roles}
        description="The role the user will receive when joining the server"
        disabled={!manageRolePermission}
        label="Join role"
        leftSection={<IconAt size={16} />}
        max={20}
        mt={5}
        nothingFoundMessage={'No roles available. Make sure the bot has the "Manage Roles" permission.'}
        onChange={(value) => handleChange({ join_roles: value })}
        placeholder={"Select role..."}
        value={data.join_roles}
      />

      <Select
        clearable
        searchable
        data={channels}
        description="The channel the bot will send the join message"
        label="Join message channel"
        leftSection={<IconHash size={16} />}
        mt={5}
        nothingFoundMessage={'No channels available. Make sure the bot has the "Send Messages" permission.'}
        onChange={(value) => handleChange({ join_channel: value ?? "" })}
        placeholder="Select channel..."
        value={data.join_channel}
      />

      <Textarea
        autosize
        description="The message that will be sent when a user joins the guild"
        label="Join message"
        leftSection={<IconBlockquote size={16} />}
        maxLength={1900}
        minRows={3}
        mt={5}
        onChange={(e) => handleChange({ join_message: e.target.value })}
        placeholder="Write join message..."
        ref={textFieldRef}
        rightSection={<TextareaTemplate template={WELCOME_TEMPLATES} textarea={textFieldRef} />}
        value={data.join_message}
      />
    </>
  );
}

export default observer(JoinConfig);
