import { ComboboxData, type ComboboxItemGroup, List, MultiSelect, Switch, ThemeIcon } from "@mantine/core";
import { IconAt, IconCheck, IconChevronRight, IconHash, IconX } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import ChannelMultiSelect from "@/components/dashboard/channel-select";
import EditLegacyActions from "@/components/dashboard/actions/edit-legacy-actions";
import type { SelectItem } from "@/types/utils";

interface Props {
  channels: ComboboxItemGroup<SelectItem>[];
  roles: ComboboxData;
  data: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function CapsRule({ channels, roles, data, handleChange }: Props) {
  return (
    <>
      <span className={"mt-2 font-medium"}>The Caps Moderation rule prevents users from using only CAPS.</span>
      <List
        icon={
          <ThemeIcon radius="lg" size={20} variant={"transparent"}>
            <IconChevronRight size={16} />
          </ThemeIcon>
        }
      >
        <List.Item className={"text-sm"}>Message longer than 15 characters</List.Item>
        <List.Item className={"text-sm"}>Message contains at least 70% upper case characters</List.Item>
      </List>

      <Switch
        color="teal"
        defaultChecked={data.caps_active}
        label="Enabled"
        my={10}
        offLabel={<IconX color={"red"} size="1rem" stroke={2.5} />}
        onChange={(el) => {
          handleChange({ caps_active: el.target.checked });
        }}
        onLabel={<IconCheck color={"green"} size="1rem" stroke={2.5} />}
        size="md"
      />

      <ChannelMultiSelect
        data={channels}
        label="Exempt Channels"
        leftSection={<IconHash size={16} />}
        maxValues={50}
        onChange={(val) => {
          handleChange({ caps_exempt_channels: val });
        }}
        placeholder="Select channels to exempt..."
        value={data.caps_exempt_channels}
      />

      <MultiSelect
        data={roles}
        defaultValue={data.caps_exempt_roles}
        label="Exempt Roles"
        leftSection={<IconAt size={16} />}
        maxValues={50}
        onChange={(val) => {
          handleChange({ caps_exempt_roles: val });
        }}
        placeholder="Select roles to exempt..."
      />

      <h3 className={"mt-3 text-xl font-medium"}>Configure Actions</h3>

      <EditLegacyActions
        isFinal={false}
        onChange={(actions) => {
          handleChange({ caps_actions: actions });
        }}
        punishments={data.caps_actions}
      />
    </>
  );
}

export default CapsRule;
