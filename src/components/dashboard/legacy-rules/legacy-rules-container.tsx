"use client";

import { ACTION_PERMISSIONS } from "@/lib/defaults";
import { ModerationConfig } from "@/types/moderation";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveModerationData } from "@/lib/requests";
import { useDiscordRules, useGuildData, useModerationData } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import LegacyRuleSettings from "@/components/dashboard/moderation/legacy-rule-settings";
import LegacyRuleView from "@/components/dashboard/legacy-rules/legacy-rules-view";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";
import SaveNotification from "@/components/save-notification";

type Config = ModerationConfig;

function LegacyRulesContainer() {
  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  function handleChange(data: Partial<Config>) {
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  const guildData = useGuildData({ category: true, roles: true, text: true, premium: true });
  const moderationResponse = useModerationData();
  useDiscordRules();

  // Handle moderation config changes
  useEffect(() => {
    if (moderationResponse.data) {
      setConfig(moderationResponse.data.config);
      oldConfig.current = moderationResponse.data.config;
    }
  }, [moderationResponse.data]);

  if (moderationResponse.error || guildData.error) {
    // One must be defined
    return <RequestError error={(moderationResponse.error || guildData.error)!} />;
  }

  if (!config || !guildData.data) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <RequiredPermissionAlert permissions={ACTION_PERMISSIONS} />

      <LegacyRuleSettings config={config} handleChange={handleChange} />

      <section className={"mt-3"}>
        <h2 className={"mb-1 text-lg"}>Configure Rules</h2>
        <LegacyRuleView data={config} handleChange={handleChange} />
      </section>

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

export default LegacyRulesContainer;
