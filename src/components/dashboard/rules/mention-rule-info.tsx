import type { DiscordModerationRule } from "@/discord/types";

function MentionRuleInfo({ rule }: { rule: DiscordModerationRule }) {
  return (
    <div className="p-1.5">
      <div className={"text-center text-sm"}>{rule.trigger_metadata.mention_total_limit}</div>
      <div className={"text-center text-sm text-mt-dark-2"}>Mentions</div>
    </div>
  );
}

export default MentionRuleInfo;
