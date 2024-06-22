import { AutoModerationTriggerType } from "@/discord/enums";
import type { DiscordModerationRule } from "@/discord/types";
import { ActionIcon, Badge, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";
import KeywordRuleInfo from "./keyword-rule-info";
import MentionRuleInfo from "./mention-rule-info";

interface Props {
  rule: DiscordModerationRule;
}

function ModerationRule({ rule }: Props) {
  const validTrigger = rule.actions.some((a) => a.type === 1);

  const ruleInfo =
    rule.trigger_type === AutoModerationTriggerType.MentionSpam ? (
      <MentionRuleInfo rule={rule} />
    ) : (
      <KeywordRuleInfo rule={rule} />
    );

  return (
    <div className="my-1 flex min-h-[60px] flex-nowrap justify-between gap-2 rounded-md bg-mt-dark-6 p-1 pl-5">
      <div className={"flex items-center justify-between gap-2 p-2"}>
        <span className={"line-clamp-1 flex-shrink"}>{rule.name}</span>
        <div className={"flex flex-wrap items-center gap-2"}>
          {!rule.enabled && (
            <Tooltip label="This rule is disabled. It can be enabled in the Discord Server Settings">
              <Badge
                className={"cursor-help select-none"}
                gradient={{ from: "yellow", to: "orange" }}
                variant="gradient"
              >
                Disabled
              </Badge>
            </Tooltip>
          )}
          {!validTrigger && (
            <Tooltip label="Rules require Block Message">
              <Badge className={"cursor-help select-none"} color="red" variant="filled">
                Invalid Trigger
              </Badge>
            </Tooltip>
          )}
        </div>
      </div>
      <div className={"flex w-28 flex-shrink-0 items-center justify-between"}>
        <Tooltip withArrow label="Configure rule">
          <Link href={`moderation/edit-rule/${rule.id}`}>
            <ActionIcon color="green" variant="light">
              <IconEdit size={20} />
            </ActionIcon>
          </Link>
        </Tooltip>

        {ruleInfo}
      </div>
    </div>
  );
}

export default ModerationRule;
