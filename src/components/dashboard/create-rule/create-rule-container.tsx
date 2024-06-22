"use client";

import BasicRule from "@/components/dashboard/create-rule/basic-rule";
import Configuration from "@/components/dashboard/create-rule/configuration";
import Exemptions from "@/components/dashboard/create-rule/exemptions";
import { INVITE_REGEX, LINK_REGEX } from "@/components/dashboard/create-rule/templates";
import { AutoModerationTriggerType } from "@/discord/enums";
import { useDiscordRules, useGuildData } from "@/lib/hooks";
import type { CreateAutoModerationRule, RuleMigration } from "@/types/moderation";
import { Stepper } from "@mantine/core";
import { IconAdjustmentsMinus, IconCircleCheck, IconSettings, IconTool } from "@tabler/icons-react";
import { useState } from "react";

function CreateRuleContainer() {
  const [step, setStep] = useState(0);
  const [rule, setRule] = useState<Partial<CreateAutoModerationRule>>(() => {
    if (typeof localStorage === "undefined") return {};
    const rule = localStorage.getItem("migrate-rule");

    if (!rule) return {};
    localStorage.removeItem("migrate-rule");

    try {
      const parsedRule: RuleMigration = JSON.parse(rule);

      return {
        legacy: parsedRule.type,
        name: "Faro Plague Protection",
        enabled: parsedRule.enabled,
        regex_patterns:
          parsedRule.type === "invite" ? [INVITE_REGEX] : parsedRule.type === "link-wl" ? [LINK_REGEX] : undefined,
        exempt_channels: parsedRule.exemptChannels.slice(0, 50),
        exempt_roles: parsedRule.exemptRoles.slice(0, 20),
        trigger_type: AutoModerationTriggerType.Keyword,
        allow_list: parsedRule.allowList,
        keyword_filter: parsedRule.type === "link-bl" ? parsedRule.allowList?.map((x) => `*${x}*`) : undefined,
      };
    } catch {
      return {};
    }
  });

  useDiscordRules();
  useGuildData({ roles: true, text: true, category: true, premium: true });

  return (
    <Stepper
      active={step}
      allowNextStepsSelect={false}
      color={"plyoox"}
      completedIcon={<IconCircleCheck className={"size-6"} />}
      onStepClick={setStep}
    >
      <Stepper.Step icon={<IconTool />} label="Basic">
        <BasicRule rule={rule} setRule={setRule} setStep={setStep} />
      </Stepper.Step>
      <Stepper.Step icon={<IconAdjustmentsMinus />} label="Exemptions">
        <Exemptions rule={rule} setRule={setRule} setStep={setStep} />
      </Stepper.Step>
      <Stepper.Step icon={<IconSettings />} label="Configurations">
        <Configuration rule={rule} setRule={setRule} setStep={setStep} />
      </Stepper.Step>
    </Stepper>
  );
}

export default CreateRuleContainer;
