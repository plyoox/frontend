import { ensureUniqueness } from "@/lib/utils";
import type { CreateAutoModerationRule } from "@/types/moderation";
import type { UseRef } from "@/types/react";
import { TagsInput, Title } from "@mantine/core";
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
          const trimmedValue = val.trim();
          if (trimmedValue.length === 0 || trimmedValue.length > 100) return;

          const unique = ensureUniqueness([...keywordFilter, trimmedValue]);
          if (unique.length === keywordFilter.length) return;

          return trimmedValue;
        }}
        placeholder="Type to add new keyword"
        value={keywordFilter}
      />
    </>
  );
}

export default KeywordFilter;
