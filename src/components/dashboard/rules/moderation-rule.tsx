import { ActionIcon, Badge, Group, Text, Tooltip } from "@mantine/core";
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
    <div className="flex bg-dark-7 rounded-md max-h-[60px] pl-5 my-1 p-1 justify-between flex-nowrap bg-mt-dark-6">
      <div className={"flex justify-between items-center"}>
        <span>{rule.name}</span>
        <>
          {!rule.enabled && (
            <Tooltip label="This rule is disabled">
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
      <div className={"flex w-32 items-center"}>
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
