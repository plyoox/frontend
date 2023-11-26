import { CreateAutoModerationRule } from "@/types/moderation";
import { UseRef } from "@/types/react";
import { useState } from "react";
import AllowList from "./allow-list";
import KeywordFilter from "./keyword-filter";
import Templates from "./templates";

function KeywordConfig({ rule }: { rule: UseRef<Partial<CreateAutoModerationRule>> }) {
  const [allowList, setAllowList] = useState<string[]>(rule.current.allow_list ?? []);
  const [regexPatterns, setRegexPatterns] = useState<string[]>(rule.current.regex_patterns ?? []);

  return (
    <>
      <Templates
        allowList={allowList}
        regexPatterns={regexPatterns}
        rule={rule}
        setAllowList={setAllowList}
        setRegexPatterns={setRegexPatterns}
      />
      <AllowList allowList={allowList} rule={rule} setAllowList={setAllowList} />
      <KeywordFilter rule={rule} />
    </>
  );
}

export default KeywordConfig;
