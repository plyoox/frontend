"use client";

import AccordionLabel from "@/components/dashboard/accordion-label";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequirePointsHandlerLink from "@/components/dashboard/moderation/require-points-handler-link";
import RequirePointsLink from "@/components/dashboard/moderation/require-points-link";
import RequestError from "@/components/dashboard/request-error";
import DiscordRuleOverview from "@/components/dashboard/rules/discord-rule-view";
import ToggleActive from "@/components/dashboard/toggle-active";
import SaveNotification from "@/components/save-notification";
import { MultiRoleSelect } from "@/components/selects";
import { handleChangeHelper } from "@/lib/handle-change";
import { useGuildData, useModerationData } from "@/lib/hooks";
import { saveModerationData } from "@/lib/requests";
import { GuildStoreContext } from "@/stores/guild-store";
import type { ModerationConfig } from "@/types/moderation";
import { Accordion } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import LegacyRuleLink from "./legacy-rule-link";
import LogConfig from "./log-config";

type Config = ModerationConfig;

function ModerationSettings() {
  function handleChange(data: Partial<Config>) {
    // biome-ignore lint/style/noNonNullAssertion: 'config' must nut be null at this point
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    // biome-ignore lint/style/noNonNullAssertion: 'config' must nut be null at this point
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

      <MultiRoleSelect
        data={guildStore.rolesAsSelectable}
        description="These roles will be granted permission to use the moderation commands."
        label="Moderation roles"
        maxValues={10}
        onChange={(value) =>
          handleChange({
            moderation_roles: value,
            ignored_roles: config.ignored_roles.filter((r) => !value.includes(r)),
          })
        }
        placeholder="Select moderation roles..."
        value={config.moderation_roles}
      />

      <RequirePointsLink
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
