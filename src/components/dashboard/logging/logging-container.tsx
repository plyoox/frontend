"use client";

import { Accordion, ComboboxItem, ComboboxItemGroup, LoadingOverlay, Select } from "@mantine/core";
import { DEFAULT_LOGGING_SETTING } from "@/config/defaults";
import { GuildStoreContext } from "@/stores/guild-store";
import { LoggingKind } from "@/config/enums";
import { ModifiedLoggingData } from "@/types/logging";
import { capitalize } from "@/lib/utils";
import { handleChangeHelper } from "@/lib/handle-change";
import { observer } from "mobx-react-lite";
import { saveLoggingConfig } from "@/lib/requests";
import { useContext, useEffect, useRef, useState } from "react";
import { useGuildData, useGuildId, useLoggingData } from "@/lib/hooks";
import AccordionLabel from "@/components/dashboard/accordion-label";
import AccordionSwitchControl from "@/components/accordion-switch-control";
import LoggingSetting from "@/components/dashboard/logging/logging-setting";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";
import ToggleActive from "@/components/dashboard/toggle-active";

type Config = ModifiedLoggingData;

function LoggingContainer() {
  function handleChange(data: Partial<Config>) {
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  // function openModal() {}

  const guildId = useGuildId();
  const guildStore = useContext(GuildStoreContext);

  const loggingResponse = useLoggingData();
  useGuildData({ category: true, text: true, roles: true });

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const [textChannels, setTextChannels] = useState<ComboboxItemGroup[]>([]);
  const oldConfig = useRef<Config>({} as Config);

  useEffect(() => {
    if (loggingResponse.data) {
      const webhookMap = new Map<string, ComboboxItem>();

      Object.values(loggingResponse.data.settings)
        .filter((setting) => setting.channel?.webhook_channel)
        .forEach((setting) => {
          const channel = guildStore.textChannels.get(setting.channel!.webhook_channel! /* filtered above */);

          webhookMap.set(setting.channel!.id, {
            label: (channel?.name ?? "Unknown Channel") + " (Webhook)",
            value: setting.channel!.id ?? "unknown",
            disabled: true,
          });
        });

      if (webhookMap.size > 0) {
        setTextChannels((channels) => {
          const webhookGroup = channels.find((group) => group.group === "Webhooks");

          if (webhookGroup) {
            webhookGroup.items.forEach((item) => {
              const forcedTypeItem = item as ComboboxItem;

              webhookMap.set(forcedTypeItem.value, forcedTypeItem);
            });

            webhookGroup.items = Array.from(webhookMap.values());
          } else {
            channels.push({
              group: "Webhooks",
              items: Array.from(webhookMap.values()),
            });
          }

          return [...channels];
        });
      }

      const loggingData: ModifiedLoggingData = {
        config: loggingResponse.data.config,
        settings: Object.fromEntries(
          loggingResponse.data.settings.map((e) => [
            e.kind,
            {
              ...e,
              channel: e.channel?.id ?? null,
            },
          ]),
        ) as any,
      };

      setConfig(loggingData);
      oldConfig.current = loggingData;
    }
  }, [guildStore.textChannels, loggingResponse.data]);

  // Keep a list of text channels with the webhooks that are being used
  useEffect(() => {
    if (guildStore.textAsSelectable) {
      const currentWebhooks = textChannels.find((channel) => channel.group === "Webhooks");
      const newChannels = [...guildStore.textAsSelectable];

      if (currentWebhooks) newChannels.push(currentWebhooks);

      setTextChannels(newChannels);
    }
    // It is not relevant if textChannels changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildStore.textAsSelectable]);

  if (loggingResponse.error) {
    return <RequestError error={loggingResponse.error} />;
  }

  if (loggingResponse.isLoading || !config) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ToggleActive active={config.config.active} onChange={(active) => handleChange({ config: { active } })} />

      <Select
        data={guildStore.textAsSelectable}
        description={"Set a channel for specific log variants."}
        label={"Set channel"}
        mb={10}
      />

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
          const setting = config.settings[value] ?? {
            kind: value,
            guild_id: guildId,
            ...DEFAULT_LOGGING_SETTING,
          };

          return (
            <Accordion.Item key={value} value={value}>
              <AccordionSwitchControl
                onStateChange={(val) =>
                  handleChange({
                    settings: { ...config.settings, [value]: { ...setting, active: val } },
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
                      settings: { ...config.settings, [value]: setting },
                    });
                  }}
                  setTextChannels={setTextChannels}
                  setting={
                    config.settings[value] ?? {
                      kind: value,
                      guild_id: guildId,
                      ...DEFAULT_LOGGING_SETTING,
                    }
                  }
                  textChannels={textChannels}
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
          oldConfig.current = {
            config: { ...config?.config, ...updatedConfig?.config },
            settings: { ...config?.settings, ...updatedConfig?.settings },
          };

          setUpdatedConfig(null);
        }}
      />
    </>
  );
}

export default observer(LoggingContainer);
