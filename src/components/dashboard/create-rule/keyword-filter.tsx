import { CreateAutoModerationRule } from "@/types/moderation";
import { TagsInput, Title } from "@mantine/core";
import { UseRef } from "@/types/react";
import { ensureUniqueness } from "@/lib/utils";
import { useState } from "react";

function KeywordFilter({ rule }: { rule: UseRef<Partial<CreateAutoModerationRule>> }) {
  const [keywordFilter, setKeywordFilter] = useState<string[]>(rule.current.keyword_filter ?? []);

  return (
    <>
      <Title mt={10} order={3}>
        Keyword filter
      </Title>

      <TagsInput
        clearable
        data={keywordFilter}
        description="Forbidden words and phrases. Not required if templates are used."
        maxTags={1000}
        onChange={setKeywordFilter}
        onOptionSubmit={(val) => {
          val = val.trim();
          if (val.length === 0 || val.length > 100) return;

          const unique = ensureUniqueness([...keywordFilter, val]);
          if (unique.length === keywordFilter.length) return;

          return val;
        }}
        placeholder="Type to add new keyword"
        value={keywordFilter}
      />
    </>
  );
}

export default KeywordFilter;
