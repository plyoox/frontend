import { Button, MultiSelect, TagsInput, TextInput } from "@mantine/core";
import { CreateAutoModerationRule } from "@/types/moderation";
import { IconPlaylistAdd } from "@tabler/icons-react";
import { UseRef, UseState } from "@/types/react";
import { ensureUniqueness } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface Props {
  rule: UseRef<Partial<CreateAutoModerationRule>>;
  allowList: string[];
  setAllowList: UseState<string[]>;
}

function AllowList({ rule, allowList, setAllowList }: Props) {
  useEffect(() => {
    rule.current.allow_list = allowList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowList]);

  return (
    <>
      <h3 className={"font-medium text-lg"}>Allow list</h3>

      <TagsInput
        clearable
        data={allowList}
        description="Add allowed words and phrases"
        onChange={(val) => {
          if (val.length < allowList.length) setAllowList(val);
        }}
        onOptionSubmit={(val) => {
          val = val.trim().toLowerCase();
          if (val.length === 0 || val.length > 60) return;

          if (val.startsWith("-")) {
            const word = val.slice(1);
            setAllowList((list) => list.filter((x) => x !== word));
            return;
          }

          const discordMatch = val.match(/\b(?:discord\.gg|discord\.com\/invite)\/([a-zA-Z0-9-]{2,30})\b/);
          if (discordMatch) {
            const code = discordMatch[1];

            setAllowList((list) => ensureUniqueness([...list, `*discord.gg/${code}*`, `*discord.com/invite/${code}*`]));
            return;
          }

          const twitchMatch = val.match(/\btwitch\.tv\/([a-zA-Z0-9-]{2,25})\b/);
          if (twitchMatch) {
            const name = twitchMatch[1];

            setAllowList((list) => ensureUniqueness([...list, `*twitch.tv/${name}*`]));
            return;
          }

          const youtubeMatch = val.match(/youtube\.com\/(?:c\/)?(@[a-zA-Z0-9.]{4,31})/);
          if (youtubeMatch) {
            const name = youtubeMatch[1];

            setAllowList((list) => ensureUniqueness([...list, `*youtube.com/${name}*`, `youtube.com/c/${name}`]));
            return;
          }

          const linkMatch = val.match(/([a-zA-Z0-9-]{2,30}\.[a-zA-Z0-9-]{2,30})\b/);
          if (linkMatch) {
            const name = linkMatch[1];

            setAllowList((list) => ensureUniqueness([...list, `*${name}*`]));
            return;
          }

          const unique = ensureUniqueness([...allowList, val]);
          if (unique.length !== allowList.length) {
            setAllowList(unique);
          }
        }}
        placeholder="discord.gg/5qPPvQe"
        value={allowList}
      />
    </>
  );
}

export default AllowList;
