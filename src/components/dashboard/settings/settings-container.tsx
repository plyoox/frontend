"use client";

import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";
import type { HelperPermission } from "@/lib/enums";
import { handleChangeHelper } from "@/lib/handle-change";
import { useGuildData, useSettingsData } from "@/lib/hooks";
import { saveSettingsData } from "@/lib/requests";
import { HELPER_PERMISSION_ITEMS } from "@/lib/select-values";
import type { SettingsResponse } from "@/types/responses";
import { Select, Skeleton } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

type Config = SettingsResponse;

function SettingsContainer() {
  function handleChange(data: Partial<Config>) {
    // biome-ignore lint/style/noNonNullAssertion: 'config' must nut be null at this point
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    // biome-ignore lint/style/noNonNullAssertion: 'config' must nut be null at this point
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
    return <Skeleton height={56} width="100%" />;
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

          handleChange({
            helper_permission: value as HelperPermission | null,
          });
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
