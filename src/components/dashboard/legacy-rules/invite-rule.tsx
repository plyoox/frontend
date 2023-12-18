import { Button, ComboboxData, MultiSelect, Switch, TagsInput, Tooltip } from "@mantine/core";
import { IconAt, IconCheck, IconFolderPlus, IconHash, IconPlaylistAdd, IconX } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import { RuleStoreContext } from "@/stores/rule-store";
import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import EditLegacyPunishments from "@/components/dashboard/punishments/edit-legacy-punishments";
import Link from "next/link";

interface Props {
  channels: ComboboxData;
  roles: ComboboxData;
  config: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function InviteRule({ channels, roles, config, handleChange }: Props) {
  const ruleStore = useContext(RuleStoreContext);

  const canCreateRule = useMemo(() => ruleStore.canCreateKeywordRule(), [ruleStore]);

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

      <MultiSelect
        clearable
        searchable
        data={channels}
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

      <EditLegacyPunishments
        isFinal={false}
        onChange={(actions) => {
          handleChange({ invite_actions: actions });
        }}
        punishments={config.invite_actions}
      />

      <div className={"mt-2.5 flex justify-end"}>
        <Tooltip label={canCreateRule ? "Use the Discord built in rules" : "Discord's rule limit reached"}>
          <Button
            color="violet"
            // @ts-ignore
            component={canCreateRule ? Link : "button"}
            disabled={!canCreateRule}
            href="create-rule"
            leftSection={<IconPlaylistAdd />}
            onClick={() => {
              if (!canCreateRule) {
                return;
              }

              localStorage.setItem(
                "migrate-rule",
                JSON.stringify({
                  type: "invite",
                  enabled: config.invite_active,
                  actions: config.invite_actions,
                  exemptChannels: config.invite_exempt_channels,
                  exemptRoles: config.invite_exempt_roles,
                }),
              );
            }}
            variant="light"
          >
            Migrate to discord
          </Button>
        </Tooltip>
      </div>
    </>
  );
}

export default observer(InviteRule);
