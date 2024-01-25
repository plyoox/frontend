import { ComboboxData, type ComboboxItemGroup, MultiSelect, Switch, TagsInput } from "@mantine/core";
import { IconAt, IconCheck, IconHash, IconLink, IconX } from "@tabler/icons-react";
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

function LinkRule({ channels, roles, config, handleChange }: Props) {
  return (
    <>
      <Switch
        checked={config.link_active}
        color="teal"
        label="Enabled"
        my={10}
        offLabel={<IconX color={"red"} size="1rem" stroke={2.5} />}
        onChange={(el) => handleChange({ link_active: el.target.checked })}
        onLabel={<IconCheck color={"green"} size="1rem" stroke={2.5} />}
        size="md"
      />

      <ChannelMultiSelect
        data={channels}
        description={"Messages sent in these channels are ignored and won't be punished."}
        label="Exempt Channels"
        leftSection={<IconHash size={16} />}
        maxValues={50}
        onChange={(val) => handleChange({ link_exempt_channels: val })}
        placeholder="Select channels to exempt..."
        value={config.link_exempt_channels}
      />

      <MultiSelect
        clearable
        searchable
        data={roles}
        description={"Messages sent by these roles are ignored and won't be punished."}
        label="Exempt Roles"
        leftSection={<IconAt size={16} />}
        maxValues={50}
        onChange={(val) => handleChange({ link_exempt_roles: val })}
        placeholder="Select roles to exempt..."
        value={config.link_exempt_roles}
      />

      <TagsInput
        clearable
        data={config.link_allow_list}
        label="Links"
        leftSection={<IconLink size={16} />}
        max={50}
        maxLength={100}
        maxTags={100}
        minLength={1}
        onChange={(val) => {
          if (val.length > config.link_allow_list.length) return;

          handleChange({ link_allow_list: val });
        }}
        onOptionSubmit={(val) => {
          if (val.trim().length === 0 || val.trim().length > 100) return;

          handleChange({ link_allow_list: [...config.link_allow_list, val] });
        }}
        value={config.link_allow_list}
      />

      <Switch
        checked={config.link_is_whitelist}
        label="Use as whitelist/Use as blacklist"
        mt={10}
        offLabel="BL"
        onChange={(el) => handleChange({ link_is_whitelist: el.target.checked })}
        onLabel="WL"
        size="md"
      />

      <h3 className={"mt-3 text-xl font-medium"}>Configure Actions</h3>

      <EditLegacyActions
        isFinal={false}
        onChange={(punishments) => handleChange({ link_actions: punishments })}
        punishments={config.link_actions}
      />
    </>
  );
}

export default LinkRule;
