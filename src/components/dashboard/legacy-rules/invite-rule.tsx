import { Button, ComboboxData, MultiSelect, Switch, Tooltip } from "@mantine/core";
import { IconAt, IconCheck, IconFolderPlus, IconHash, IconPlaylistAdd, IconX } from "@tabler/icons-react";
import { ModerationConfig, Punishment } from "@/types/moderation";
import { RuleStoreContext } from "@/stores/rule-store";
import { observer } from "mobx-react-lite";
import { useContext, useMemo, useState } from "react";
import EditLegacyPunishments from "@/components/dashboard/punishments/edit-legacy-punishments";
import Link from "next/link";

interface Props {
  channels: ComboboxData;
  roles: ComboboxData;
  data: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function InviteRule({ channels, roles, data, handleChange }: Props) {
  const ruleStore = useContext(RuleStoreContext);

  const canCreateRule = useMemo(() => ruleStore.canCreateKeywordRule(), [ruleStore]);

  const [enabled, setEnabled] = useState<boolean>(data.invite_active);
  const [punishments, setPunishments] = useState<Punishment[]>(data.invite_actions);
  const [exemptChannels, setExemptChannels] = useState<string[]>(data.invite_whitelisted_channels);
  const [exemptRoles, setExemptRoles] = useState<string[]>(data.invite_whitelisted_roles);
  const [exemptGuilds, setExemptGuilds] = useState<string[]>(data.invite_allowed_guilds);

  return (
    <>
      <Switch
        checked={enabled}
        color="teal"
        label="Enabled"
        my={10}
        offLabel={<IconX color={"red"} size="1rem" stroke={2.5} />}
        onChange={(el) => {
          handleChange({ invite_active: el.target.checked });
          setEnabled(el.target.checked);
        }}
        onLabel={<IconCheck color={"green"} size="1rem" stroke={2.5} />}
        size="md"
      />

      <MultiSelect
        clearable
        searchable
        data={channels}
        label="Exempt Channels"
        leftSection={<IconHash size={16} />}
        onChange={(val) => {
          handleChange({ invite_whitelisted_channels: val });
          setExemptChannels(val);
        }}
        placeholder="Select channels to exempt..."
        value={exemptChannels}
      />

      <MultiSelect
        clearable
        searchable
        data={roles}
        label="Exempt Roles"
        leftSection={<IconAt size={16} />}
        onChange={(val) => {
          handleChange({ invite_whitelisted_roles: val });
          setExemptRoles(val);
        }}
        placeholder="Select roles to exempt..."
        value={exemptRoles}
      />

      <MultiSelect
        clearable
        searchable
        data={data.invite_allowed_guilds!}
        label="Allowed guilds"
        leftSection={<IconFolderPlus size={16} />}
        onChange={(val) => {
          handleChange({ invite_allowed_guilds: val });
          setExemptGuilds(val);
        }}
        placeholder="Add guild ids..."
        value={exemptGuilds}
      />

      <h3 className={"mt-3 font-medium text-xl"}>Configure Actions</h3>

      <EditLegacyPunishments
        isFinal={false}
        onChange={(actions) => {
          handleChange({ invite_actions: actions });
          setPunishments(actions);
        }}
        punishments={punishments}
      />

      <div className={"flex justify-end mt-2.5"}>
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
                  enabled,
                  actions: punishments,
                  exemptChannels,
                  exemptRoles,
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
