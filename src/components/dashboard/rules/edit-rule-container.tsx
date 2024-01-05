"use client";

import { useDiscordRules, useGuildData, useModerationData } from "@/lib/hooks";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import EditPunishments from "@/components/dashboard/actions/edit-actions";
import RequestError from "@/components/dashboard/request-error";

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
  if (rules.error || config.error) {
    // One of them is always defined
    return <RequestError error={(rules.error || config.error)!} />;
  }

  return <EditPunishments rule={rule} />;
}

export default EditRuleContainer;
