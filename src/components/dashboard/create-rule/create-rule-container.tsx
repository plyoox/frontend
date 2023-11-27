"use client";

import { AutoModerationTriggerType } from "@/discord/enums";
import { CreateAutoModerationRule, RuleMigration } from "@/types/moderation";
import { INVITE_REGEX, LINK_REGEX } from "@/components/dashboard/create-rule/templates";
import { Stepper } from "@mantine/core";
import { useDiscordRules, useGuildData } from "@/lib/hooks";
import { useState } from "react";
import BasicRule from "@/components/dashboard/create-rule/basic-rule";
import Configuration from "@/components/dashboard/create-rule/configuration";
import Exemptions from "@/components/dashboard/create-rule/exemptions";

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
        keyword_filter: parsedRule.type === "link-bl" ? parsedRule.allowList!.map((x) => `*${x}*`) : undefined,
      };
    } catch {
      return {};
    }
  });

  useDiscordRules();
  useGuildData({ roles: true, text: true, category: true, premium: true });

  return (
    <Stepper active={step} allowNextStepsSelect={false} onStepClick={setStep}>
      <Stepper.Step label="Basic">
        <BasicRule rule={rule} setRule={setRule} setStep={setStep} />
      </Stepper.Step>
      <Stepper.Step description="" label="Exemptions">
        <Exemptions rule={rule} setRule={setRule} setStep={setStep} />
      </Stepper.Step>
      <Stepper.Step label="Configurations">
        <Configuration rule={rule} setRule={setRule} setStep={setStep} />
      </Stepper.Step>
    </Stepper>
  );
}

export default CreateRuleContainer;
