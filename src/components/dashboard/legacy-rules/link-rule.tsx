import { Button, ComboboxData, MultiSelect, Switch, Tooltip } from "@mantine/core";
import { IconAt, IconCheck, IconHash, IconLink, IconPlaylistAdd, IconX } from "@tabler/icons-react";
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

function LinkRule({ channels, roles, data, handleChange }: Props) {
  const ruleStore = useContext(RuleStoreContext);

  const canCreateRule = useMemo(() => ruleStore.canCreateKeywordRule(), [ruleStore]);

  const [enabled, setEnabled] = useState<boolean>(data.link_active);
  const [isWhitelist, setIsWhitelist] = useState<boolean>(data.link_is_whitelist);
  const [punishments, setPunishments] = useState<Punishment[]>(data.link_actions!);
  const [exemptChannels, setExemptChannels] = useState<string[]>(data.link_whitelisted_channels!);
  const [exemptRoles, setExemptRoles] = useState<string[]>(data.link_whitelisted_roles!);
  const [exemptLinks, setExemptLinks] = useState<string[]>(data.link_allow_list!);

  return (
    <>
      <Switch
        checked={enabled}
        color="teal"
        label="Enabled"
        my={10}
        offLabel={<IconX color={"red"} size="1rem" stroke={2.5} />}
        onChange={(el) => {
          handleChange({ link_active: el.target.checked });
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
          handleChange({ link_whitelisted_channels: val });
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
          handleChange({ link_whitelisted_roles: val });
          setExemptRoles(val);
        }}
        placeholder="Select roles to exempt..."
        value={exemptRoles}
      />

      <MultiSelect
        clearable
        searchable
        data={data.link_allow_list!}
        label="Links"
        leftSection={<IconLink size={16} />}
        max={50}
        onChange={(val) => {
          handleChange({ link_allow_list: val });
          setExemptLinks(val);
        }}
        value={exemptLinks}
      />

      <Switch
        checked={isWhitelist}
        label="Use as whitelist/Use as blacklist"
        mt={10}
        offLabel="BL"
        onChange={(el) => {
          handleChange({ link_is_whitelist: el.target.checked });
          setIsWhitelist(el.target.checked);
        }}
        onLabel="WL"
        size="md"
      />

      <h3 className={"mt-3 font-medium text-xl"}>Configure Actions</h3>

      <EditLegacyPunishments
        isFinal={false}
        onChange={(actions) => {
          handleChange({ link_actions: actions });
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
            href={`create-rule`}
            leftSection={<IconPlaylistAdd />}
            onClick={() => {
              if (!canCreateRule) {
                return;
              }

              const value = isWhitelist
                ? {
                    type: "link-wl",
                    exemptChannels,
                    exemptRoles,
                    enabled,
                    actions: punishments,
                    allowList: exemptLinks,
                  }
                : {
                    type: "link-bl",
                    exemptChannels,
                    exemptRoles,
                    enabled,
                    actions: punishments,
                    keywordFilter: exemptLinks.map((l) => `*${l}*`),
                  };

              localStorage.setItem("migrate-rule", JSON.stringify(value));
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

export default observer(LinkRule);
