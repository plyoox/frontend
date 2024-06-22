"use client";

import AccordionLabel from "@/components/dashboard/accordion-label";
import ExemptLevelObjects from "@/components/dashboard/leveling/exempt-level-objects";
import LevelGainMultiplier from "@/components/dashboard/leveling/level-gain-multiplier";
import LevelRoleManager from "@/components/dashboard/leveling/level-role-manager";
import LevelUpMessage from "@/components/dashboard/leveling/level-up-message";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import ToggleActive from "@/components/dashboard/toggle-active";
import SaveNotification from "@/components/save-notification";
import { DiscordPermission } from "@/discord/enums";
import { handleChangeHelper } from "@/lib/handle-change";
import { useGuildData, useLevelingData } from "@/lib/hooks";
import { saveLevelingData } from "@/lib/requests";
import { GuildStoreContext } from "@/stores/guild-store";
import type { LevelingResponse } from "@/types/responses";
import { Accordion } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";

type Config = LevelingResponse;

function LevelContainer() {
  function handleChange(data: Partial<Config>) {
    // biome-ignore lint/style/noNonNullAssertion: 'config' is never null here
    const updatedKeys = handleChangeHelper(config!, data, oldConfig);

    // biome-ignore lint/style/noNonNullAssertion: 'config' is never null here
    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  const guildStore = useContext(GuildStoreContext);

  useGuildData({ category: true, roles: true, text: true, voice: true, premium: true });
  const levelingResponse = useLevelingData();

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  useEffect(() => {
    if (levelingResponse.data) {
      setConfig(levelingResponse.data);
      oldConfig.current = levelingResponse.data;
    }
  }, [levelingResponse.data]);

  if (levelingResponse.error) {
    return <RequestError error={levelingResponse.error} />;
  }

  if (levelingResponse.isLoading || !config) {
    return <LoadingSkeleton />;
  }

  const canManageRoles = guildStore.botHasPermission(DiscordPermission.ManageRoles);

  return (
    <>
      <ToggleActive active={config.active} onChange={(active) => handleChange({ active })} />

      <Accordion
        multiple
        chevronPosition="left"
        classNames={{
          item: "bg-mt-dark-7 mt-1",
        }}
        defaultValue={localStorage.getItem("lvl-acc-state")?.split(",") ?? []}
        onChange={(val) => localStorage.setItem("lvl-acc-state", val.join(","))}
        variant="filled"
      >
        <Accordion.Item value="level-message">
          <Accordion.Control>
            <AccordionLabel description="Configure the level message" label="Message" />
          </Accordion.Control>

          <Accordion.Panel>
            <LevelUpMessage config={config} handleChange={handleChange} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value={canManageRoles ? "level-roles" : "---"}>
          <Accordion.Control
            chevron={canManageRoles ? undefined : <IconAlertTriangle color="#F03E3E" size={20} />}
            disabled={!canManageRoles}
          >
            <AccordionLabel
              description="Configure roles users should receive when rise in levels."
              label="Level roles"
            />
          </Accordion.Control>

          <Accordion.Panel>
            <LevelRoleManager config={config} handleChange={handleChange} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="exempt-objects">
          <Accordion.Control>
            <AccordionLabel description="Restrict where and which users can receive xp." label="Exempt objects" />
          </Accordion.Control>

          <Accordion.Panel>
            <ExemptLevelObjects config={config} handleChange={handleChange} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="xp-gain">
          <Accordion.Control>
            <AccordionLabel description="Configure how much xp users should receive." label="XP gain" />
          </Accordion.Control>

          <Accordion.Panel>
            <LevelGainMultiplier config={config} handleChange={handleChange} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <SaveNotification
        data={updatedConfig}
        fn={saveLevelingData}
        onSave={() => {
          oldConfig.current = { ...config, ...updatedConfig };

          setUpdatedConfig(null);
        }}
      />
    </>
  );
}

export default observer(LevelContainer);
