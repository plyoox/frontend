"use client";

import { HELPER_PERMISSION_ITEMS } from "@/config/select-values";
import { HelperPermission } from "@/config/enums";
import { Select } from "@mantine/core";
import { SettingsResponse } from "@/types/responses";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveSettingsData } from "@/lib/requests";
import { useEffect, useRef, useState } from "react";
import { useGuildData, useSettingsData } from "@/lib/hooks";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";

type Config = SettingsResponse;

function SettingsContainer() {
  function handleChange(data: Partial<Config>) {
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  const settingsData = useSettingsData();
  useGuildData({});

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  useEffect(() => {
    if (settingsData.data) {
      setConfig(settingsData.data);
      oldConfig.current = settingsData.data;
    }
  }, [settingsData.data]);

  if (settingsData.error) {
    return <RequestError error={settingsData.error} />;
  }

  if (settingsData.isLoading || !config) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <Select
        data={HELPER_PERMISSION_ITEMS}
        description={
          <span>
            What helper can do to configure your guild settings. Do <b>not</b> set to Full unless explicitly asked.
          </span>
        }
        label={"Helper permission"}
        onChange={(value) => {
          if (value === "")
            return handleChange({
              helper_permission: null,
            });
          else {
            handleChange({
              helper_permission: value as HelperPermission | null,
            });
          }
        }}
        value={config.helper_permission ?? ""}
      />

      <SaveNotification
        data={updatedConfig}
        fn={saveSettingsData}
        onSave={() => {
          oldConfig.current = { ...config, ...updatedConfig };

          setUpdatedConfig(null);
        }}
      />
    </>
  );
}

export default SettingsContainer;
