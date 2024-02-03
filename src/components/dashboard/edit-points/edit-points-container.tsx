"use client";

import { ModerationConfig } from "@/types/moderation";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveModerationData } from "@/lib/requests";
import { useEffect, useRef, useState } from "react";
import { useGuildData, useModerationData } from "@/lib/hooks";
import EditLegacyActions from "@/components/dashboard/actions/edit-legacy-actions";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";

type Config = ModerationConfig;

function EditPointsContainer() {
  function handleChange(data: Partial<Config>) {
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  const { data, isLoading, error } = useModerationData();
  useGuildData({ category: true, roles: true, text: true, premium: true });

  useEffect(() => {
    if (!data) return;

    oldConfig.current = data.config;

    setConfig(data.config);
  }, [data]);

  if (error) {
    return <RequestError error={error} />;
  }

  if (isLoading || typeof data === "undefined") {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <EditLegacyActions
        isFinal={true}
        onChange={(punishments) => handleChange({ point_actions: punishments })}
        punishments={data.config.point_actions}
      />

      <SaveNotification
        data={updatedConfig}
        fn={saveModerationData}
        onSave={() => {
          oldConfig.current = { ...config!, ...data };

          setUpdatedConfig(null);
        }}
      />
    </>
  );
}

export default EditPointsContainer;
