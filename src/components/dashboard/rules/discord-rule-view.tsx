import { AutoModerationTriggerType } from "@/discord/enums";
import { Button } from "@mantine/core";
import { DISCORD_KEYWORD_RULE_LIMIT } from "@/lib/limits";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { RuleStoreContext } from "@/stores/rule-store";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useDiscordRules } from "@/lib/hooks";
import Link from "next/link";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import ModerationRule from "@/components/dashboard/rules/moderation-rule";
import NoRulesAvailable from "@/components/dashboard/rules/no-rules";
import RequestError from "@/components/dashboard/request-error";

function DiscordRuleOverview() {
  const ruleStore = useContext(RuleStoreContext);

  const { isLoading, error } = useDiscordRules();

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <RequestError error={error} />;

  const rulesWithConfig = ruleStore.discordRulesArray.filter((r) => ruleStore.moderationRules.has(r.id));
  const rulesWithoutConfig = ruleStore.discordRulesArray.filter((r) => !ruleStore.moderationRules.has(r.id));

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
          component={Link}
          disabled={
            ruleStore.discordRulesArray.filter((r) => r.trigger_type === AutoModerationTriggerType.Keyword).length ===
              DISCORD_KEYWORD_RULE_LIMIT &&
            ruleStore.discordRulesArray.some((r) => r.trigger_type === AutoModerationTriggerType.MentionSpam)
          }
          href={`moderation/create-rule`}
          leftSection={<IconPlaylistAdd />}
          variant="light"
        >
          Create new rule
        </Button>
      </div>
    </>
  );
}

export default observer(DiscordRuleOverview);
