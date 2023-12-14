"use client";

import { Accordion, LoadingOverlay } from "@mantine/core";
import { WelcomeResponse } from "@/types/responses";
import { handleChangeHelper } from "@/lib/handle-change";
import { saveWelcomeData } from "@/lib/requests";
import { useEffect, useRef, useState } from "react";
import { useGuildData, useWelcomeData } from "@/lib/hooks";
import AccordionLabel from "@/components/dashboard/accordion-label";
import AccordionSwitchControl from "@/components/accordion-switch-control";
import JoinConfig from "@/components/dashboard/welcome/join-config";
import LeaveConfig from "@/components/dashboard/welcome/leave-config";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";
import ToggleActive from "@/components/dashboard/toggle-active";

type Config = WelcomeResponse;

function WelcomeContainer() {
  function handleChange(data: Partial<Config>) {
    const newConfig = { ...config!, ...data };
    const updatedKeys = handleChangeHelper(data, newConfig, oldConfig);

    setConfig(newConfig);
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
    return <LoadingOverlay />;
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
