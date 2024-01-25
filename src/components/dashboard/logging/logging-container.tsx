"use client";

import { Accordion, ComboboxItemGroup } from "@mantine/core";
import { DEFAULT_LOGGING_SETTING } from "@/config/defaults";
import { GuildStoreContext } from "@/stores/guild-store";
import { LoggingData, LoggingSetting, MassWebhookKind } from "@/types/logging";
import { LoggingKind } from "@/config/enums";
import { capitalize, setLoggingTextChannels } from "@/lib/utils";
import { handleChangeHelper } from "@/lib/handle-change";
import { modals } from "@mantine/modals";
import { observer } from "mobx-react-lite";
import { saveLoggingConfig } from "@/lib/requests";
import { useContext, useEffect, useRef, useState } from "react";
import { useGuildData, useGuildId, useLoggingData } from "@/lib/hooks";
import AccordionLabel from "@/components/dashboard/accordion-label";
import AccordionSwitchControl from "@/components/accordion-switch-control";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import LoggingSettingContainer from "@/components/dashboard/logging/logging-setting-container";
import MassLogChannelSelect from "@/components/dashboard/logging/mass-log-channel-select";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";
import ToggleActive from "@/components/dashboard/toggle-active";

type Config = LoggingData;

function LoggingContainer() {
  function handleChange(data: Partial<Config>) {
    const updatedKeys = handleChangeHelper<Config>(config!, data, oldConfig);

    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  const guildId = useGuildId();
  const guildStore = useContext(GuildStoreContext);

  const loggingResponse = useLoggingData();
  useGuildData({ category: true, text: true, roles: true });

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const [textChannels, setTextChannels] = useState<ComboboxItemGroup[]>([]);
  const webhookVariant = useRef<MassWebhookKind | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  useEffect(() => {
    if (loggingResponse.data) {
      const loggingData = {
        config: loggingResponse.data.config,
        settings: Object.fromEntries(loggingResponse.data.settings.map((setting) => [setting.kind as any, setting])),
      };

      setLoggingTextChannels({ settings: loggingData.settings, guildStore, setTextChannels });
      setConfig(loggingData);
      oldConfig.current = loggingData;
    }
  }, [guildStore, loggingResponse.data]);

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

  const openModal = (channelId: string) => {
    modals.openContextModal({
      modal: "webhookMassSelect",
      title: "Select Webhook Channels",
      centered: true,
      innerProps: {
        text: "Select webhooks for specific channels.",
        channel: channelId,
        onVariant: (kind: MassWebhookKind) => {
          webhookVariant.current = kind;
        },
      },
    });

    const broadcastChannel = new BroadcastChannel("webhook-creation");
    broadcastChannel.onmessage = (msg) => {
      if (typeof msg.data !== "string") return;
      const data = msg.data.split(":");

      if (data.at(0) !== "other") {
        webhookVariant.current = null;
        return;
      }

      const channelId = data.at(1);
      const webhookId = data.at(2);
      if (!channelId) return;

      const settings: Record<string, LoggingSetting> = {};

      let channel;
      if (webhookId) {
        channel = {
          id: webhookId,
          webhook_channel: channelId,
          ref_count: 1,
          single_use: false,
        };
      } else {
        channel = {
          id: channelId,
          webhook_channel: null,
          ref_count: 1,
          single_use: false,
        };
      }

      for (const value of Object.values(LoggingKind)) {
        const setting = config?.settings[value] ?? {
          kind: value,
          guild_id: guildId,
          ...DEFAULT_LOGGING_SETTING,
        };

        const configSettings = { ...setting, channel };

        if (webhookVariant.current === "all") {
          settings[value] = configSettings;
        } else if (webhookVariant.current === "empty") {
          if (!setting.channel) {
            settings[value] = configSettings;
          } else if (config?.settings[value]) {
            settings[value] = config.settings[value];
          }
        }
      }

      if (Object.keys(settings).length !== Object.keys(LoggingKind).length) {
        webhookVariant.current = null;
        return;
      }

      // Update text channels with the new webhook
      setLoggingTextChannels({
        settings,
        guildStore,
        setTextChannels,
      });

      handleChange({
        settings: settings,
      });

      // Close the broadcast channel
      broadcastChannel.close();
      webhookVariant.current = null;
    };
  };

  if (loggingResponse.error) {
    return <RequestError error={loggingResponse.error} />;
  }

  if (loggingResponse.isLoading || !config) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <ToggleActive active={config.config.active} onChange={(active) => handleChange({ config: { active } })} />

      <MassLogChannelSelect openModal={openModal} />

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
        {Object.values(LoggingKind).map((value) => {
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
                <LoggingSettingContainer
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
