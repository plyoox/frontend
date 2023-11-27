import { AutoModerationTriggerType } from "@/discord/enums";
import { CreateAutoModerationRule } from "@/types/moderation";
import { DISCORD_KEYWORD_RULE_LIMIT } from "@/lib/limits";
import { Radio } from "@mantine/core";
import { RuleStoreContext } from "@/stores/rule-store";
import { UseRef } from "@/types/react";
import { useContext, useEffect, useMemo } from "react";
import { useGuildId } from "@/lib/hooks";
import { useRouter } from "next/navigation";

function RuleTypeSelect({ rule }: { rule: UseRef<Partial<CreateAutoModerationRule>> }) {
  const id = useGuildId();
  const { push } = useRouter();

  const ruleStore = useContext(RuleStoreContext);

  const hasMentionRule = useMemo(
    () => ruleStore.discordRulesArray.some((r) => r.trigger_type === AutoModerationTriggerType.MentionSpam),
    [ruleStore.discordRulesArray],
  );
  const keywordLimit = useMemo(
    () =>
      ruleStore.discordRulesArray.filter((r) => r.trigger_type === AutoModerationTriggerType.Keyword).length ===
      DISCORD_KEYWORD_RULE_LIMIT,
    [ruleStore.discordRulesArray],
  );

  useEffect(() => {
    if (keywordLimit && hasMentionRule) {
      push(`/dashboard/${id}/moderation`);
      return;
    }

    if (rule.current.trigger_type === undefined) rule.current.trigger_type = AutoModerationTriggerType.Keyword;
  }, [hasMentionRule, id, keywordLimit, push, rule]);

  return (
    <Radio.Group
      withAsterisk
      defaultValue={rule.current.trigger_type?.toString() ?? AutoModerationTriggerType.Keyword.toString()}
      description="The type of rule that should be created"
      label="Rule type"
      maw={900}
      mt={20}
      onChange={(v) => {
        rule.current.trigger_type = parseInt(v) as AutoModerationTriggerType;
      }}
    >
      <Radio label="Keyword rule" my={5} value={AutoModerationTriggerType.Keyword.toString()} />
      <Radio
        disabled={hasMentionRule}
        label="Mention rule"
        my={5}
        value={AutoModerationTriggerType.MentionSpam.toString()}
      />
    </Radio.Group>
  );
}

export default RuleTypeSelect;
