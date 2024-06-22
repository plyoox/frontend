"use client";

import AccordionSwitchControl from "@/components/accordion-switch-control";
import AccordionLabel from "@/components/dashboard/accordion-label";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import ToggleActive from "@/components/dashboard/toggle-active";
import JoinConfig from "@/components/dashboard/welcome/join-config";
import LeaveConfig from "@/components/dashboard/welcome/leave-config";
import SaveNotification from "@/components/save-notification";
import { handleChangeHelper } from "@/lib/handle-change";
import { useGuildData, useWelcomeData } from "@/lib/hooks";
import { saveWelcomeData } from "@/lib/requests";
import type { WelcomeResponse } from "@/types/responses";
import { Accordion } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

type Config = WelcomeResponse;

function WelcomeContainer() {
  function handleChange(data: Partial<Config>) {
    // biome-ignore lint/style/noNonNullAssertion: Config is never null here
    const updatedKeys = handleChangeHelper(config!, data, oldConfig);

    // biome-ignore lint/style/noNonNullAssertion: Config is never null here
    setConfig({ ...config!, ...data });
    setUpdatedConfig(updatedKeys);
  }

  useGuildData({ category: true, roles: true, text: true });
  const welcomeResponse = useWelcomeData();

  const [config, setConfig] = useState<Config | null>(null);
  const [updatedConfig, setUpdatedConfig] = useState<Partial<Config> | null>(null);
  const oldConfig = useRef<Config>({} as Config);

  useEffect(() => {
    if (welcomeResponse.data) {
      setConfig(welcomeResponse.data);
      oldConfig.current = welcomeResponse.data;
    }
  }, [welcomeResponse.data]);

  if (welcomeResponse.error) {
    return <RequestError error={welcomeResponse.error} />;
  }

  if (welcomeResponse.isLoading || !config) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <ToggleActive active={config.active} onChange={(active) => handleChange({ active })} />

      <Accordion
        multiple
        chevronPosition="left"
        classNames={{
          item: "bg-mt-dark-7 mt-1",
        }}
        defaultValue={localStorage.getItem("mod-acc-state")?.split(",") ?? ["user-join", "user-leave"]}
        onChange={(val) => localStorage.setItem("mod-acc-state", val.join(","))}
        variant="filled"
      >
        <Accordion.Item value="user-join">
          <AccordionSwitchControl
            onStateChange={(val) => handleChange({ join_active: val })}
            state={config.join_active}
          >
            <AccordionLabel description="Configure what happens when a user joins your server." label="User join" />
          </AccordionSwitchControl>
          <Accordion.Panel>
            <JoinConfig data={config} handleChange={handleChange} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="user-leave">
          <AccordionSwitchControl
            onStateChange={(val) => handleChange({ leave_active: val })}
            state={config.leave_active}
          >
            <AccordionLabel description="Configure what happens when a user leaves your server." label="User leave" />
          </AccordionSwitchControl>
          <Accordion.Panel>
            <LeaveConfig data={config} handleChange={handleChange} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <SaveNotification
        data={updatedConfig}
        fn={saveWelcomeData}
        onSave={() => {
          oldConfig.current = { ...config, ...updatedConfig };

          setUpdatedConfig(null);
        }}
      />
    </>
  );
}

export default WelcomeContainer;
