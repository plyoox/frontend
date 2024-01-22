import { AutoModerationTriggerType } from "@/discord/enums";
import { DISCORD_KEYWORD_RULE_LIMIT } from "@/lib/limits";
import { Radio, Tooltip } from "@mantine/core";
import { RuleStoreContext } from "@/stores/rule-store";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo } from "react";
import { useGuildId } from "@/lib/hooks";
import { useRouter } from "next/navigation";

function RuleTypeSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const id = useGuildId();
  const { push } = useRouter();

  const ruleStore = useContext(RuleStoreContext);

  const hasMentionRule = useMemo(
    () => ruleStore.discordRulesArray.some((r) => r.trigger_type === AutoModerationTriggerType.MentionSpam),
    [ruleStore.discordRulesArray],
  );

  useEffect(() => {
    const keywordLimit =
      ruleStore.discordRulesArray.filter((r) => r.trigger_type === AutoModerationTriggerType.Keyword).length ===
      DISCORD_KEYWORD_RULE_LIMIT;

    if (keywordLimit && hasMentionRule) {
      push(`/dashboard/${id}/moderation`);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMentionRule, ruleStore.discordRulesArray]);

  return (
    <Radio.Group
      withAsterisk
      description="The type of rule that should be created"
      label="Rule type"
      maw={900}
      mt={20}
      onChange={(v) => onChange(v)}
      value={value}
    >
      <Radio label="Keyword rule" my={5} value={AutoModerationTriggerType.Keyword.toString()} />
      <Tooltip label={hasMentionRule ? "Discord Limit reached" : ""}>
        <Radio
          disabled={hasMentionRule}
          label="Mention rule"
          my={5}
          value={AutoModerationTriggerType.MentionSpam.toString()}
        />
      </Tooltip>
    </Radio.Group>
  );
}

export default observer(RuleTypeSelect);
