import { API_URL } from "@/environment";
import { Action, ModerationRule } from "@/types/moderation";
import { Button, Tooltip } from "@mantine/core";
import { DiscordModerationRule } from "@/discord/types";
import { IconAlertCircle, IconPlaylistAdd, IconPlaylistX } from "@tabler/icons-react";
import { RuleStoreContext } from "@/stores/rule-store";
import { notifications } from "@mantine/notifications";
import { observer } from "mobx-react-lite";
import { removeModerationRule } from "@/lib/requests";
import { useContext, useMemo, useState } from "react";
import AddPunishment from "@/components/dashboard/actions/add-actions";
import Link from "next/link";
import ListActions from "@/components/dashboard/actions/list-actions";
import axios from "axios";

function EditActions({ rule: discordRule }: { rule: DiscordModerationRule }) {
  const guildStore = useContext(RuleStoreContext);

  const currentRule: ModerationRule = useMemo(() => {
    const hasConfig = guildStore.moderationRules.has(discordRule.id);

    return hasConfig
      ? structuredClone(JSON.parse(JSON.stringify(guildStore.moderationRules.get(discordRule.id)!)))
      : {
          rule_id: discordRule.id,
          guild_id: discordRule.guild_id,
          actions: [],
          reason: "",
        };
  }, [discordRule.id, discordRule.guild_id, guildStore.moderationRules]);

  const [punishments, setPunishments] = useState<Action[]>([...currentRule.actions]);

  return (
    <>
      <ListActions punishments={punishments} setPunishments={setPunishments} />
      <AddPunishment className="mt-2.5" punishments={punishments} setPunishments={setPunishments} />

      <div className={"mt-2.5 flex justify-end gap-2.5"}>
        {
          <Tooltip withArrow label="This will delete the rule from the server">
            <Button
              color="red"
              component={Link}
              href={`/dashboard/${currentRule.guild_id}/moderation`}
              leftSection={<IconPlaylistX />}
              onClick={() =>
                deleteModerationRule(currentRule.guild_id, currentRule.rule_id)
                  .then(() => {
                    guildStore.removeDiscordRule(currentRule.rule_id);
                    guildStore.removeModerationRule(currentRule.rule_id);
                  })
                  .catch((e) => {
                    notifications.show({
                      title: "Failed to delete rule",
                      message: e.message,
                    });
                  })
              }
              variant="subtle"
            >
              Delete
            </Button>
          </Tooltip>
        }

        <Button
          component={Link}
          href={`/dashboard/${currentRule.guild_id}/moderation`}
          leftSection={<IconPlaylistAdd />}
          onClick={() => {
            if (punishments.length === 0) {
              removeModerationRule(currentRule.guild_id, currentRule.rule_id)
                .then(() => {
                  guildStore.removeModerationRule(currentRule.rule_id);
                })
                .catch((e) => {
                  notifications.show({
                    icon: <IconAlertCircle />,
                    title: "Failed to delete rule",
                    message: e.message,
                  });
                });
            } else if (JSON.stringify(currentRule.actions) !== JSON.stringify(punishments)) {
              saveModerationRule(currentRule.guild_id, currentRule.rule_id, {
                actions: punishments,
                reason: currentRule.reason,
              })
                .then(() => {
                  currentRule.actions = punishments;
                  guildStore.addModerationRule(currentRule);
                })
                .catch((e) => {
                  notifications.show({
                    icon: <IconAlertCircle />,
                    color: "red",
                    title: "Failed to save rule",
                    message: e.message,
                  });
                });
            }
          }}
          variant="light"
        >
          Save
        </Button>
      </div>
    </>
  );
}

export default observer(EditActions);

async function saveModerationRule(guildId: string, ruleId: string, rule: SetModerationRuleDto) {
  const res = await axios.put(`${API_URL}/guild/${guildId}/moderation/rules/${ruleId}`, rule, {
    withCredentials: true,
  });

  return res.data;
}

async function deleteModerationRule(guildId: string, ruleId: string) {
  await axios.delete(`${API_URL}/guild/${guildId}/moderation/rules/${ruleId}/purge`, {
    withCredentials: true,
  });
}

interface SetModerationRuleDto {
  actions: Action[] | null;
  reason: string | null;
}
