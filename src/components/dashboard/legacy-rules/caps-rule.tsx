import CustomSwitch from "@/components/custom-switch";
import EditLegacyActions from "@/components/dashboard/actions/edit-legacy-actions";
import { MultiChannelSelect, MultiRoleSelect } from "@/components/selects";
import type { ModerationConfig } from "@/types/moderation";
import type { RoleItem, SelectItem } from "@/types/utils";
import { Alert, type ComboboxItemGroup, List, ThemeIcon } from "@mantine/core";
import { IconChevronRight, IconHash, IconInfoCircle } from "@tabler/icons-react";

interface Props {
  channels: ComboboxItemGroup<SelectItem>[];
  roles: RoleItem[];
  data: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function CapsRule({ channels, roles, data, handleChange }: Props) {
  return (
    <>
      <Alert className="my-2" icon={<IconInfoCircle />} title={"Info"}>
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
      </Alert>

      <CustomSwitch
        checked={data.caps_active}
        className={"mt-2"}
        color="teal"
        label="Enabled"
        labelPosition={"left"}
        onChange={(checked) => {
          handleChange({ caps_active: checked });
        }}
      />

      <MultiChannelSelect
        data={channels}
        description={"Messages in these channels are ignored and won't be punished."}
        label="Exempt Channels"
        leftSection={<IconHash size={16} />}
        maxValues={50}
        onChange={(val) => {
          handleChange({ caps_exempt_channels: val });
        }}
        placeholder="Select channels to exempt..."
        value={data.caps_exempt_channels}
      />

      <MultiRoleSelect
        data={roles}
        description={"Messages sent by these roles are ignored and won't be punished."}
        label="Exempt Roles"
        maxValues={50}
        onChange={(val) => {
          handleChange({ caps_exempt_roles: val });
        }}
        placeholder="Select roles to exempt..."
        value={data.caps_exempt_roles}
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
