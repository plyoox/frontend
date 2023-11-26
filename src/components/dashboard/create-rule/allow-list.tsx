import { Button, MultiSelect, TextInput } from "@mantine/core";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    rule.current.allow_list = allowList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowList]);

  return (
    <>
      <h3 className={"font-medium text-lg"}>Allow list</h3>

      <MultiSelect
        clearable
        data={allowList}
        description="Allowed words and phrases."
        onChange={setAllowList}
        value={allowList}
      />

      <TextInput
        description="Special treatment when adding YouTube/Twitch Channels, Discord Invites and URLs. Prefix with - to prevent modification."
        label="Add allowed words"
        maxLength={100}
        placeholder="discord.gg/5qPPvQe"
        ref={inputRef}
      />
      <div className={"flex justify-end"}>
        <Button
          color="grape"
          disabled={allowList.length > 98}
          leftSection={<IconPlaylistAdd />}
          mt={5}
          onClick={() => {
            const val = inputRef.current!.value.trim();
            if (val.length === 0 || val.length > 60) return;

            const discordMatch = val.match(/\b(?:discord\.gg|discord\.com\/invite)\/([a-zA-Z0-9-]{2,30})\b/);
            if (discordMatch) {
              const code = discordMatch[1];

              setAllowList((list) =>
                ensureUniqueness([...list, `*discord.gg/${code}*`, `*discord.com/invite/${code}*`]),
              );
              inputRef.current!.value = "";
              return;
            }

            const twitchMatch = val.match(/\btwitch\.tv\/([a-zA-Z0-9-]{2,25})\b/);
            if (twitchMatch) {
              const name = twitchMatch[1];

              setAllowList((list) => ensureUniqueness([...list, `*twitch.tv/${name}*`]));
              inputRef.current!.value = "";
              return;
            }

            const youtubeMatch = val.match(/\byoutube\.com\/(?:c\/([a-zA-Z0-9.-@]{4,31})|[a-zA-Z0-9.-@]{4,31})/);
            if (youtubeMatch) {
              const name = youtubeMatch[1] ?? youtubeMatch[0];

              setAllowList((list) => ensureUniqueness([...list, `*youtube.com/${name}*`, `youtube.com/c/${name}`]));
              inputRef.current!.value = "";
              return;
            }

            const linkMatch = val.match(/([a-zA-Z0-9-]{2,30}\.[a-zA-Z0-9-]{2,30})\b/);
            if (linkMatch) {
              const name = linkMatch[1];

              setAllowList((list) => ensureUniqueness([...list, `*${name}*`]));
              inputRef.current!.value = "";
              return;
            }

            const unique = ensureUniqueness([...allowList, val]);
            if (unique.length !== allowList.length) {
              setAllowList(unique);
              inputRef.current!.value = "";
            }
          }}
          variant="outline"
        >
          Add phrase
        </Button>
      </div>
    </>
  );
}

export default AllowList;
