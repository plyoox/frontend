import RequestError from "@/components/dashboard/request-error";
import ModerationRule from "@/components/dashboard/rules/moderation-rule";
import NoRulesAvailable from "@/components/dashboard/rules/no-rules";
import RulesLoading from "@/components/dashboard/rules/rules-loading";
import { AutoModerationTriggerType } from "@/discord/enums";
import { useDiscordRules } from "@/lib/hooks";
import { DISCORD_KEYWORD_RULE_LIMIT } from "@/lib/limits";
import { RuleStoreContext } from "@/stores/rule-store";
import { Button } from "@mantine/core";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useContext } from "react";

function DiscordRuleOverview() {
  const ruleStore = useContext(RuleStoreContext);

  const { isLoading, error } = useDiscordRules();

  if (isLoading) return <RulesLoading />;
  if (error) return <RequestError error={error} />;

  const rulesWithConfig = ruleStore.discordRulesArray.filter((r) => ruleStore.moderationRules.has(r.id));
  const rulesWithoutConfig = ruleStore.discordRulesArray.filter((r) => !ruleStore.moderationRules.has(r.id));

  const disabled =
    ruleStore.discordRulesArray.filter((r) => r.trigger_type === AutoModerationTriggerType.Keyword).length ===
      DISCORD_KEYWORD_RULE_LIMIT &&
    ruleStore.discordRulesArray.some((r) => r.trigger_type === AutoModerationTriggerType.MentionSpam);

  return (
    <>
      {rulesWithConfig.length !== 0 && (
        <>
          <h5>Configured Rules</h5>
          {rulesWithConfig.map((r) => (
            <ModerationRule key={r.id} rule={r} />
          ))}
        </>
      )}

      <div className={"mb-2.5"}>
        <h5>Unused Rules</h5>
        {rulesWithoutConfig.length ? (
          rulesWithoutConfig.map((r) => <ModerationRule key={r.id} rule={r} />)
        ) : (
          <NoRulesAvailable />
        )}
      </div>

      <div className="flex justify-end">
        <Button
          color="violet"
          // @ts-ignore
          component={disabled ? "button" : Link}
          disabled={disabled}
          href={"moderation/create-rule"}
          leftSection={<IconPlaylistAdd />}
          title={disabled ? "Maximum rules reached" : undefined}
          variant="light"
        >
          Create new rule
        </Button>
      </div>
    </>
  );
}

export default observer(DiscordRuleOverview);
