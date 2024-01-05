import { Button, ComboboxData, MultiSelect, Switch, TagsInput, Tooltip } from "@mantine/core";
import { IconAt, IconCheck, IconHash, IconLink, IconPlaylistAdd, IconX } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import { RuleStoreContext } from "@/stores/rule-store";
import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import EditLegacyActions from "@/components/dashboard/actions/edit-legacy-actions";
import Link from "next/link";

interface Props {
  channels: ComboboxData;
  roles: ComboboxData;
  config: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function LinkRule({ channels, roles, config, handleChange }: Props) {
  const ruleStore = useContext(RuleStoreContext);

  const canCreateRule = useMemo(() => ruleStore.canCreateKeywordRule(), [ruleStore]);

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

      <MultiSelect
        clearable
        searchable
        data={channels}
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

      <div className={"mt-2.5 flex justify-end"}>
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

              const value = config.link_is_whitelist
                ? {
                    type: "link-wl",
                    exemptChannels: config.link_exempt_channels,
                    exemptRoles: config.link_exempt_roles,
                    enabled: config.link_active,
                    actions: config.link_actions,
                    allowList: config.link_allow_list,
                  }
                : {
                    type: "link-bl",
                    exemptChannels: config.link_exempt_channels,
                    exemptRoles: config.link_exempt_roles,
                    enabled: config.link_active,
                    actions: config.link_actions,
                    keywordFilter: config.link_allow_list.map((l) => `*${l}*`),
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
