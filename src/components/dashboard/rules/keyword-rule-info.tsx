import { DiscordModerationRule } from "@/discord/types";

function KeywordRuleInfo({ rule }: { rule: DiscordModerationRule }) {
  return (
    <div className="w-18 p-1.5">
      <div className={"text-sm text-center"}>
        {rule.trigger_metadata.keyword_filter?.length + rule.trigger_metadata.regex_patterns?.length}
      </div>
      <div className={"text-mt-dark-2 text-sm text-center"}>Mentions</div>
    </div>
  );
}

export default KeywordRuleInfo;
