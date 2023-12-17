"use client";

import { Accordion, LoadingOverlay } from "@mantine/core";
import { DEFAULT_LOGGING_SETTING } from "@/config/defaults";
import { LoggingKind } from "@/config/enums";
import { LoggingResponse } from "@/types/responses";
import { capitalize } from "@/lib/utils";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveLoggingConfig } from "@/lib/requests";
import { useEffect, useRef, useState } from "react";
import { useGuildData, useGuildId, useLoggingData } from "@/lib/hooks";
import AccordionLabel from "@/components/dashboard/accordion-label";
import AccordionSwitchControl from "@/components/accordion-switch-control";
import LoggingSetting from "@/components/dashboard/logging/logging-setting";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";
import ToggleActive from "@/components/dashboard/toggle-active";

type Config = LoggingResponse;

function LoggingContainer() {
  function handleChange(data: Partial<Config>) {
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    console.log({ updatedKeys });

    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  const guildId = useGuildId();

  const loggingResponse = useLoggingData();
  useGuildData({ category: true, text: true, roles: true });

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  useEffect(() => {
    if (loggingResponse.data) {
      setConfig(loggingResponse.data);
      oldConfig.current = loggingResponse.data;
    }
  }, [loggingResponse.data]);

  if (loggingResponse.error) {
    return <RequestError error={loggingResponse.error} />;
  }

  if (loggingResponse.isLoading || !config) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ToggleActive active={config.config.active} onChange={(active) => handleChange({ config: { active } })} />

      <Accordion
        multiple
        chevronPosition="left"
        classNames={{
          item: "bg-mt-dark-7 mt-1",
        }}
        defaultValue={localStorage.getItem("mod-acc-state")?.split(",") ?? []}
        onChange={(val) => localStorage.setItem("mod-acc-state", val.join(","))}
        variant="filled"
      >
        {Object.entries(LoggingKind).map(([_, value]) => {
          const setting = config.settings.find((s) => s.kind === value) ?? {
            kind: value,
            guild_id: guildId,
            ...DEFAULT_LOGGING_SETTING,
          };

          return (
            <Accordion.Item key={value} value={value}>
              <AccordionSwitchControl
                onStateChange={(val) =>
                  handleChange({
                    settings: [...config.settings.filter((s) => s.kind !== value), { ...setting, active: val }],
                  })
                }
                state={setting.active}
              >
                <AccordionLabel
                  description={""}
                  label={value
                    .split("_")
                    .map((v) => capitalize(v))
                    .join(" ")}
                />
              </AccordionSwitchControl>

              <Accordion.Panel>
                <LoggingSetting
                  onChange={(setting) => {
                    handleChange({
                      settings: [...config.settings.filter((s) => s.kind !== value), setting],
                    });
                  }}
                  setting={
                    config.settings.find((s) => s.kind === value) ?? {
                      kind: value,
                      guild_id: guildId,
                      ...DEFAULT_LOGGING_SETTING,
                    }
                  }
                />
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <SaveNotification
        data={updatedConfig}
        fn={saveLoggingConfig}
        onSave={() => {
          oldConfig.current = { ...config, ...updatedConfig };

          setUpdatedConfig(null);
        }}
      />
    </>
  );
}

export default LoggingContainer;
