"use client";

import { ModerationConfig } from "@/types/moderation";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveModerationData } from "@/lib/requests";
import { useDiscordRules, useGuildData, useModerationData } from "@/lib/hooks";
import { useEffect, useRef, useState } from "react";
import LegacyRuleView from "@/components/dashboard/legacy-rules/legacy-rules-view";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";

type Config = ModerationConfig;

function LegacyRulesContainer() {
  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  function handleChange(data: Partial<Config>) {
    const newConfig = { ...config!, ...data };
    const updatedKeys = handleChangeHelper(data, newConfig, oldConfig);

    setConfig(newConfig);
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
      <LegacyRuleView data={config} handleChange={handleChange} />

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
