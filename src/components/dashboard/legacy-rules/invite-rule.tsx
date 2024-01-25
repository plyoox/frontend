import { type ComboboxData, type ComboboxItemGroup, MultiSelect, Switch, TagsInput } from "@mantine/core";
import { IconAt, IconCheck, IconFolderPlus, IconHash, IconX } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import ChannelMultiSelect from "@/components/dashboard/channel-select";
import EditLegacyActions from "@/components/dashboard/actions/edit-legacy-actions";
import type { SelectItem } from "@/types/utils";

interface Props {
  channels: ComboboxItemGroup<SelectItem>[];
  roles: ComboboxData;
  config: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function InviteRule({ channels, roles, config, handleChange }: Props) {
  return (
    <>
      <Switch
        checked={config.invite_active}
        color="teal"
        label="Enabled"
        my={10}
        offLabel={<IconX color={"red"} size="1rem" stroke={2.5} />}
        onChange={(el) => handleChange({ invite_active: el.target.checked })}
        onLabel={<IconCheck color={"green"} size="1rem" stroke={2.5} />}
        size="md"
      />

      <ChannelMultiSelect
        data={channels}
        description={"Messages in these channels are ignored and won't be punished."}
        label="Exempt Channels"
        leftSection={<IconHash size={16} />}
        maxValues={50}
        onChange={(val) => handleChange({ invite_exempt_channels: val })}
        placeholder="Select channels to exempt..."
        value={config.invite_exempt_channels}
      />

      <MultiSelect
        clearable
        searchable
        data={roles}
        description={"Messages sent by these roles are ignored and won't be punished."}
        label="Exempt Roles"
        leftSection={<IconAt size={16} />}
        maxValues={50}
        onChange={(val) => handleChange({ invite_exempt_roles: val })}
        placeholder="Select roles to exempt..."
        value={config.invite_exempt_roles}
      />

      <TagsInput
        clearable
        data={config.invite_exempt_guilds}
        label="Allowed guilds"
        leftSection={<IconFolderPlus size={16} />}
        maxTags={50}
        onChange={(val) => {
          if (val.length > config.invite_exempt_guilds.length) return;
          handleChange({ invite_exempt_guilds: val });
        }}
        onOptionSubmit={(val) => {
          const int = BigInt(val);
          if (int < Number.MAX_SAFE_INTEGER) return;
        }}
        placeholder="Add guild ids..."
        value={config.invite_exempt_guilds}
      />

      <h3 className={"mt-3 text-xl font-medium"}>Configure Actions</h3>

      <EditLegacyActions
        isFinal={false}
        onChange={(actions) => {
          handleChange({ invite_actions: actions });
        }}
        punishments={config.invite_actions}
      />
    </>
  );
}

export default InviteRule;
