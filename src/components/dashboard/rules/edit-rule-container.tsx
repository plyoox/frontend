"use client";

import EditPunishments from "@/components/dashboard/actions/edit-actions";
import RequestError from "@/components/dashboard/request-error";
import { AutoModerationTriggerType } from "@/discord/enums";
import { useDiscordRules, useGuildData, useModerationData } from "@/lib/hooks";
import { Kbd, Tooltip } from "@mantine/core";
import { clsx } from "clsx";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export function EditRuleContainer() {
  const { ruleId } = useParams();

  const config = useModerationData();
  const rules = useDiscordRules();
  useGuildData({ category: true, roles: true, text: true, premium: true });

  const rule = useMemo(() => {
    if (!rules || !config) return;
    return rules.data?.find((r) => r.id === ruleId);
  }, [rules, config, ruleId]);

  if (config.isLoading || config.isLoading || !rule) {
    return <>Loading...</>;
  }

  const error = rules.error || config.error;
  if (error) {
    // One of them is always defined
    return <RequestError error={error} />;
  }

  return (
    <>
      <div className={"flex items-center justify-between gap-2"}>
        <div className={"flex items-center gap-2"}>
          <Tooltip label={rule.enabled ? "Enabled" : "Disabled"}>
            <div className={clsx("size-5 cursor-help rounded-full", rule.enabled ? "bg-green-500" : "bg-red-500")} />
          </Tooltip>
          <Kbd className={"text-base"}>{rule.name}</Kbd>
        </div>

        <div className={"text-sm text-mt-dark-0"}>
          {rule.trigger_type === AutoModerationTriggerType.Keyword ? (
            <span>
              Triggers: {rule.trigger_metadata.keyword_filter.length + rule.trigger_metadata.regex_patterns.length}
            </span>
          ) : (
            <span>Mentions: {rule.trigger_metadata.mention_total_limit}</span>
          )}
        </div>
      </div>

      <EditPunishments rule={rule} />
    </>
  );
}

export default EditRuleContainer;
