import { type ComboboxItemGroup, TagsInput } from "@mantine/core";
import { IconFolderPlus, IconHash } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import { MultiRoleSelect } from "@/components/selects";
import CustomSwitch from "@/components/custom-switch";
import EditLegacyActions from "@/components/dashboard/actions/edit-legacy-actions";
import MultiChannelSelect from "@/components/selects/multi-channel-select";
import type { RoleItem, SelectItem } from "@/types/utils";

interface Props {
  channels: ComboboxItemGroup<SelectItem>[];
  roles: RoleItem[];
  config: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function InviteRule({ channels, roles, config, handleChange }: Props) {
  return (
    <>
      <CustomSwitch
        checked={config.invite_active}
        className={"mt-2"}
        color="teal"
        label="Enabled"
        labelPosition={"left"}
        onChange={(checked) => handleChange({ invite_active: checked })}
      />

      <MultiChannelSelect
        data={channels}
        description={"Messages in these channels are ignored and won't be punished."}
        label="Exempt Channels"
        leftSection={<IconHash size={16} />}
        maxValues={50}
        onChange={(val) => handleChange({ invite_exempt_channels: val })}
        placeholder="Select channels to exempt..."
        value={config.invite_exempt_channels}
      />

      <MultiRoleSelect
        data={roles}
        description={"Messages sent by these roles are ignored and won't be punished."}
        label="Exempt Roles"
        maxValues={50}
        onChange={(val) => handleChange({ invite_exempt_roles: val })}
        placeholder="Select roles to exempt..."
        value={config.invite_exempt_roles}
      />

      <TagsInput
        clearable
        description={"Invites from these guilds are ignored."}
        label="Exempt guilds"
        leftSection={<IconFolderPlus size={16} />}
        maxTags={50}
        onChange={(val) => {
          if (val.length < config.invite_exempt_guilds.length) handleChange({ invite_exempt_guilds: val });
          else if (val.length === config.invite_exempt_guilds.length + 1) {
            const last = val.at(-1)!;

            try {
              const int = BigInt(last);

              if (int < Number.MAX_SAFE_INTEGER) return;

              handleChange({ invite_exempt_guilds: val });
            } catch {
              return;
            }
          }
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
