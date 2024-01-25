"use client";

import { Accordion, MultiSelect } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconAt } from "@tabler/icons-react";
import { ModerationConfig } from "@/types/moderation";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveModerationData } from "@/lib/requests";
import { useContext, useEffect, useRef, useState } from "react";
import { useGuildData, useModerationData } from "@/lib/hooks";
import AccordionLabel from "@/components/dashboard/accordion-label";
import DiscordRuleOverview from "@/components/dashboard/rules/discord-rule-view";
import LegacyRuleLink from "./legacy-rule-link";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import LogConfig from "./log-config";
import RequestError from "@/components/dashboard/request-error";
import RequirePointsHandlerLink from "@/components/dashboard/moderation/require-points-handler-link";
import SaveNotification from "@/components/save-notification";
import ToggleActive from "@/components/dashboard/toggle-active";

type Config = ModerationConfig;

function ModerationSettings() {
  function handleChange(data: Partial<Config>) {
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    setConfig({ ...config!, ...data });
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

  if (moderationResponse.error) {
    return <RequestError error={moderationResponse.error} />;
  }

  if (moderationResponse.isLoading || !config) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <ToggleActive active={config.active} onChange={(active) => handleChange({ active })} />

      <MultiSelect
        clearable
        searchable
        data={guildStore.rolesAsSelectable}
        description="These roles will be granted permission to use the moderation commands."
        label="Moderation roles"
        leftSection={<IconAt size={16} />}
        maxValues={10}
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
        data={guildStore.rolesAsSelectable}
        description="These roles will be ignored by the automod. Moderation roles are already ignored."
        label="Ignored roles"
        leftSection={<IconAt size={16} />}
        maxValues={25}
        mt={5}
        nothingFoundMessage="This guild has no available roles."
        onChange={(value) => handleChange({ ignored_roles: value })}
        placeholder="Select roles..."
        value={config.ignored_roles}
      />

      <RequirePointsHandlerLink
        config={config}
        description={"Define what happens when a user reaches 10 points."}
        label={"Point Actions"}
        link={"moderation/edit-points"}
      />
      <RequirePointsHandlerLink
        config={config}
        description={"Set predefined actions for specific violations."}
        label={"Punishment Templates"}
        link={"moderation/punishments"}
      />
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
        <Accordion.Item value="discord-rules">
          <Accordion.Control>
            <AccordionLabel description="Configure the discord auto moderation rules." label="Discord rules" />
          </Accordion.Control>

          <Accordion.Panel>
            <DiscordRuleOverview />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="logging">
          <Accordion.Control>
            <AccordionLabel description="Configure the logging on an action." label="Logging" />
          </Accordion.Control>

          <Accordion.Panel>
            <LogConfig config={config} handleChange={handleChange} />
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
    </>
  );
}

export default ModerationSettings;
