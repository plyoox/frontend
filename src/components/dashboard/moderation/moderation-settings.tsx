"use client";

import { Accordion, LoadingOverlay, MultiSelect } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconAt } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import { computed } from "mobx";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveModerationData } from "@/lib/requests";
import { useContext, useEffect, useRef, useState } from "react";
import { useGuildData, useModerationData } from "@/lib/hooks";
import AccordionLabel from "@/components/dashboard/accordion-label";
import ConfigurePointsLink from "./configure-points-link";
import DiscordRuleOverview from "@/components/dashboard/rules/discord-rule-view";
import LegacyRuleLink from "./legacy-rule-link";
import LogConfig from "./log-config";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";

type Config = ModerationConfig;

function ModerationSettings() {
  function handleChange(data: Partial<Config>) {
    const newConfig = { ...config!, ...data };
    const updatedKeys = handleChangeHelper(data, newConfig, oldConfig);

    setConfig(newConfig);
    setUpdatedConfig(updatedKeys);
  }

  const guildStore = useContext(GuildStoreContext);

  // Fetch configs from backend
  useGuildData({ category: true, roles: true, text: true, premium: true });
  const moderationResponse = useModerationData();

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  // Handle moderation config changes
  useEffect(() => {
    if (moderationResponse.data) {
      setConfig(moderationResponse.data.config);
      oldConfig.current = moderationResponse.data.config;
    }
  }, [moderationResponse.data]);

  const roles = computed(() => guildStore.rolesAsSelectable).get();
  const text = computed(() => guildStore.textAsSelectable).get();

  if (moderationResponse.error) {
    return <RequestError error={moderationResponse.error} />;
  }

  if (moderationResponse.isLoading || !config) {
    return <LoadingOverlay />;
  }

  return (
    <div>
      <MultiSelect
        clearable
        searchable
        data={roles}
        description="These roles will be granted permission to use the moderation commands."
        label="Moderation roles"
        leftSection={<IconAt size={16} />}
        mt={5}
        nothingFoundMessage="This guild has no available roles."
        onChange={(value) =>
          handleChange({
            moderation_roles: value,
            ignored_roles: config.ignored_roles.filter((r) => !value.includes(r)),
          })
        }
        placeholder="Select roles..."
        value={config.moderation_roles}
      />

      <MultiSelect
        clearable
        searchable
        data={roles}
        description="These roles will be ignored by the automod. Moderation roles are already ignored."
        label="Ignored roles"
        leftSection={<IconAt size={16} />}
        mt={5}
        nothingFoundMessage="This guild has no available roles."
        onChange={(value) => handleChange({ ignored_roles: value })}
        placeholder="Select roles..."
        value={config.ignored_roles}
      />

      <ConfigurePointsLink config={config} />
      <LegacyRuleLink />

      <Accordion
        multiple
        chevronPosition="left"
        classNames={{
          control: "mt-1",
          item: "bg-mt-dark-7",
        }}
        defaultValue={localStorage.getItem("mod-acc-state")?.split(",") ?? ["logging", "discord-rules"]}
        mt={10}
        onChange={(val) => localStorage.setItem("mod-acc-state", val.join(","))}
        variant="filled"
      >
        <Accordion.Item value="logging">
          <Accordion.Control>
            <AccordionLabel description="Configure the logging on an action." label="Logging" />
          </Accordion.Control>

          <Accordion.Panel>
            <LogConfig data={config} handleChange={handleChange} text={text} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="discord-rules">
          <Accordion.Control>
            <AccordionLabel description="Configure the discord auto moderation rules." label="Discord rules" />
          </Accordion.Control>

          <Accordion.Panel>
            <DiscordRuleOverview />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <SaveNotification
        data={updatedConfig}
        fn={saveModerationData}
        onSave={() => {
          oldConfig.current = { ...config, ...updatedConfig };

          setUpdatedConfig(null);
        }}
      />
    </div>
  );
}

export default ModerationSettings;
