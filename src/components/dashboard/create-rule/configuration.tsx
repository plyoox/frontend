import { API_URL } from "@/environment";
import { AutoModerationTriggerType } from "@/discord/enums";
import { Button } from "@mantine/core";
import { CreateAutoModerationRule } from "@/types/moderation";
import { DiscordModerationRule } from "@/discord/types";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { RuleStoreContext } from "@/stores/rule-store";
import { UseState } from "@/types/react";
import { showNotification } from "@mantine/notifications";
import { useContext, useRef } from "react";
import { useGuildId } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import ConfigureMention from "@/components/dashboard/create-rule/configure-mention";
import KeywordConfig from "@/components/dashboard/create-rule/configure-keyword";
import axios from "axios";

interface Props {
  rule: Partial<CreateAutoModerationRule>;
  setStep: UseState<number>;
  setRule: UseState<Partial<CreateAutoModerationRule>>;
}

function Configuration({ rule, setRule, setStep }: Props) {
  const id = useGuildId();
  const { push } = useRouter();

  const partialRule = useRef<Partial<CreateAutoModerationRule>>(rule);
  const ruleStore = useContext(RuleStoreContext);

  return (
    <div>
      {rule.trigger_type === AutoModerationTriggerType.Keyword && <KeywordConfig rule={partialRule} />}
      {rule.trigger_type === AutoModerationTriggerType.MentionSpam && <ConfigureMention rule={partialRule} />}

      <div className={"mt-2.5 flex justify-end gap-2"}>
        <Button
          leftSection={<IconChevronLeft />}
          onClick={() => {
            setRule((r) => ({
              ...r,
              ...partialRule.current,
            }));

            setStep(1);
          }}
          variant="subtle"
        >
          Back
        </Button>
        <Button
          color="green"
          onClick={() => {
            if (rule.trigger_type === AutoModerationTriggerType.Keyword) {
              if (!partialRule.current.regex_patterns?.length && !partialRule.current.keyword_filter?.length) {
                showNotification({
                  title: "Incomplete configuration",
                  message: "You must add at least one regex pattern or keyword filter.",
                  color: "red",
                });

                return;
              }
            } else if (!partialRule.current.mention_total_limit) {
              partialRule.current.mention_total_limit = 5;
            } else {
              showNotification({
                title: "Incomplete configuration",
                message: "Invalid trigger type.",
                color: "red",
              });

              return;
            }

            const fullRule = { ...rule, ...partialRule.current };

            setRule(fullRule);
            setStep(3);

            createAutoModerationRule(id!, fullRule)
              .then((r) => {
                push(`/dashboard/${id}/moderation`);
                ruleStore.addDiscordRule(r);
              })
              .catch((e) => {
                showNotification({
                  title: "Error while creating rule",
                  message: e.message,
                  color: "red",
                });

                setStep(2);
              });
          }}
          rightSection={<IconChevronRight />}
          variant="filled"
        >
          Create rule
        </Button>
      </div>
    </div>
  );
}

export default Configuration;

async function createAutoModerationRule(
  guildId: string,
  rule: Partial<CreateAutoModerationRule>,
): Promise<DiscordModerationRule> {
  const response = await axios.post(`${API_URL}/guild/${guildId}/moderation/rules`, rule, {
    withCredentials: true,
  });

  return response.data;
}
