import { Alert, Chip } from "@mantine/core";
import { CreateAutoModerationRule } from "@/types/moderation";
import { IconInfoCircle } from "@tabler/icons-react";
import { UseRef, UseState } from "@/types/react";
import { ensureUniqueness } from "@/lib/utils";

interface Props {
  rule: UseRef<Partial<CreateAutoModerationRule>>;
  allowList: string[];
  setAllowList: UseState<string[]>;
  regexPatterns: string[];
  setRegexPatterns: UseState<string[]>;
}

function Templates({ rule, allowList, setAllowList, regexPatterns, setRegexPatterns }: Props) {
  const hasLink = regexPatterns.includes(LINK_REGEX);

  return (
    <>
      <h3 className={"text-lg font-medium"}>Templates</h3>

      <Alert className={"mb-2.5"} icon={<IconInfoCircle />}>
        Templates are pre-defined regex patterns that can be used to block specific links.
        <br />
        Specific exemption can be added in the allow list. It will also extend some of your input to be more viable.
      </Alert>

      <Chip.Group
        multiple
        defaultValue={regexPatterns}
        onChange={(val) => {
          if (val.includes(TWITCH_CHANNEL) && !val.includes(TWITCH_CLIPS)) {
            if (allowList.length < 100) setAllowList((list) => ensureUniqueness([...list, "*clips.twitch.tv/*"]));
          } else if (allowList.includes("*clips.twitch.tv/*")) {
            setAllowList((list) => {
              const words = list.filter((x) => x !== "*clips.twitch.tv/*");

              rule.current.allow_list = words;
              return words;
            });
          }

          if (val.includes(LINK_REGEX) && !regexPatterns.includes(LINK_REGEX))
            setAllowList((list) => {
              const words = ensureUniqueness([
                ...list,
                "*youtube.com/watch?v=*",
                "*youtu.be/*",
                "*twitch.tv/*",
                "*clips.twitch.tv/*",
                "*discord.gg/*",
                "*discord.com/invite/*",
              ]);

              rule.current.allow_list = words;
              return words;
            });
          else if (!val.includes(LINK_REGEX) && regexPatterns.includes(LINK_REGEX))
            setAllowList((list) => {
              const words = list.filter(
                (x) =>
                  x !== "*youtube.com/watch?v=*" &&
                  x !== "*youtu.be/*" &&
                  x !== "*twitch.tv/*" &&
                  x !== "*clips.twitch.tv/*" &&
                  x !== "*discord.gg/*" &&
                  x !== "*discord.com/invite/*",
              );

              rule.current.allow_list = words;
              return words;
            });

          setRegexPatterns(val);
          rule.current.regex_patterns = val;
        }}
      >
        <div className={"flex flex-wrap gap-2"}>
          <Chip color="indigo" disabled={hasLink} value={INVITE_REGEX} variant="light">
            Block Invites
          </Chip>
          <Chip color="grape" disabled={hasLink} value={TWITCH_CHANNEL} variant="light">
            Block Twitch Channels
          </Chip>
          <Chip color="grape" disabled={hasLink} value={TWITCH_CLIPS} variant="light">
            Block Twitch Clips
          </Chip>
          <Chip
            color="red"
            disabled={hasLink}
            value="\b(?:youtube\.com/watch\?v=|youtu\.be/)([a-zA-Z0-9_-]{11})\b"
            variant="light"
          >
            Block Youtube Videos
          </Chip>
          <Chip
            color="red"
            disabled={hasLink}
            value="\byoutube.com/?(?:channel/[A-Za-z0-9-]{20,24}|@[A-Za-z0-9._-]{3,30})\b"
            variant="light"
          >
            Block Youtube Channels
          </Chip>
          <Chip
            disabled={!(regexPatterns.length == 0 || hasLink)}
            value="\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\b"
            variant="light"
          >
            Links
          </Chip>
        </div>
      </Chip.Group>
    </>
  );
}

export default Templates;

export const INVITE_REGEX = String.raw`\bdiscord(?:(app)?\.com/invite?|\.gg)/([a-zA-Z0-9-]{2,32})\b`;
export const TWITCH_CHANNEL = String.raw`\btwitch\.tv/([a-zA-Z0-9_]{2,25})\b`;
export const TWITCH_CLIPS = String.raw`\b(?:clips\.twitch\.tv|twitch\.tv/(?:[a-zA-Z0-9_]{2,25})/clip)/([A-Za-z0-9-]*)\b`;
export const LINK_REGEX = String.raw`\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\b`;
