import { ComboboxData, List, MultiSelect, Switch, ThemeIcon } from "@mantine/core";
import { IconAt, IconCheck, IconChevronRight, IconHash, IconX } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import EditLegacyPunishments from "@/components/dashboard/punishments/edit-legacy-punishments";

interface Props {
  channels: ComboboxData;
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

      <MultiSelect
        searchable
        data={channels}
        defaultValue={data.caps_exempt_channels}
        label="Exempt Channels"
        leftSection={<IconHash size={16} />}
        maxValues={50}
        onChange={(val) => {
          handleChange({ caps_exempt_channels: val });
        }}
        placeholder="Select channels to exempt..."
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

      <EditLegacyPunishments
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
