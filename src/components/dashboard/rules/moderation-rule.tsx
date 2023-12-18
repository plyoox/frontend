import { ActionIcon, Badge, Tooltip } from "@mantine/core";
import { AutoModerationTriggerType } from "@/discord/enums";
import { DiscordModerationRule } from "@/discord/types";
import { IconEdit } from "@tabler/icons-react";
import KeywordRuleInfo from "./keyword-rule-info";
import Link from "next/link";
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
    <div className="bg-dark-7 my-1 flex max-h-[60px] flex-nowrap justify-between rounded-md bg-mt-dark-6 p-1 pl-5">
      <div className={"flex items-center justify-between gap-2"}>
        <span>{rule.name}</span>
        <>
          {!rule.enabled && (
            <Tooltip label="This rule is disabled. It can be enabled in the Discord Server Settings">
              <Badge gradient={{ from: "yellow", to: "orange" }} variant="gradient">
                Disabled
              </Badge>
            </Tooltip>
          )}
          {!validTrigger && (
            <Tooltip label="Rules require Block Message">
              <Badge color="red" variant="filled">
                Invalid Trigger
              </Badge>
            </Tooltip>
          )}
        </>
      </div>
      <div className={"flex w-32 items-center justify-between gap-2"}>
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
