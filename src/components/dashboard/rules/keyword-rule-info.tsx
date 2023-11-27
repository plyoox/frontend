import { DiscordModerationRule } from "@/discord/types";

function KeywordRuleInfo({ rule }: { rule: DiscordModerationRule }) {
  const length = rule.trigger_metadata.keyword_filter?.length + rule.trigger_metadata.regex_patterns?.length;

  return (
    <div className="w-18 p-1.5">
      <div className={"text-sm text-center"}>{length}</div>
      <div className={"text-mt-dark-2 text-sm text-center"}>{length > 1 ? "Keywords" : "Keyword"}</div>
    </div>
  );
}

export default KeywordRuleInfo;
