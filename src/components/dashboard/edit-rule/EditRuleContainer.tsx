"use client";

import { useDiscordRules, useModerationData } from "@/lib/hooks";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import RequestError from "@/components/dashboard/request-error";

export function EditRuleContainer() {
  const { ruleId } = useParams();

  const config = useModerationData();
  const rules = useDiscordRules();

  const rule = useMemo(() => {
    if (!rules || !config) return;
    return rules.data?.find((r) => r.id === ruleId);
  }, [rules, config, ruleId]);

  if (config.isLoading || config.isLoading || !rule) {
    return <>Loading...</>;
  }
  if (rules.error || config.error) return <RequestError errors={[rules.error, config.error]} />;
}

export default EditRuleContainer;
