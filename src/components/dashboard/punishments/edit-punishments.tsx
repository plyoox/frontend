import { API_URL } from "@/environment";
import { Button, Tooltip } from "@mantine/core";
import { DiscordModerationRule } from "@/discord/types";
import { FC, useContext, useMemo, useState } from "react";
import { IconPlaylistAdd, IconPlaylistX } from "@tabler/icons-react";
import { Punishment } from "@/types/moderation";
import { RuleStoreContext } from "@/stores/rule-store";
import { notifications } from "@mantine/notifications";
import { observer } from "mobx-react-lite";
import { removeModerationRule } from "@/lib/requests";
import AddPunishment from "@/components/dashboard/punishments/add-punishment";
import Link from "next/link";
import ListPunishments from "@/components/dashboard/punishments/list-punishments";
import axios from "axios";

interface Props {
  rule: DiscordModerationRule;
}

const EditActions: FC<Props> = observer(({ rule: discordRule }) => {
  const guildStore = useContext(RuleStoreContext);

  const currentRule = useMemo(() => {
    const hasConfig = guildStore.moderationRules.has(discordRule.id);

    return hasConfig
      ? structuredClone(guildStore.moderationRules.get(discordRule.id)!)
      : {
          rule_id: discordRule.id,
          guild_id: discordRule.guild_id,
          actions: [],
          reason: "",
        };
  }, [discordRule.id, discordRule.guild_id, guildStore.moderationRules]);

  const [punishments, setPunishments] = useState<Punishment[]>([...currentRule.actions]);

  return (
    <>
      <ListPunishments punishments={punishments} setPunishments={setPunishments} />
      <AddPunishment actions={punishments} className="mt-2.5" setActions={setPunishments} />

      <div className={"flex justify-end mt-2.5"}>
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
              variant="light"
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
              removeModerationRule(currentRule.guild_id, currentRule.rule_id).then(() => {
                guildStore.removeModerationRule(currentRule.rule_id);
              });
            } else if (JSON.stringify(currentRule.actions) !== JSON.stringify(punishments)) {
              saveModerationRule(currentRule.guild_id, currentRule.rule_id, {
                actions: punishments,
                reason: currentRule.reason,
              }).then(() => {
                currentRule.actions = punishments;
                guildStore.addModerationRule(currentRule);
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
});

export default EditActions;

async function saveModerationRule(guildId: string, ruleId: string, rule: SetModerationRuleDto) {
  const res = await axios.patch(`${API_URL}/guild/${guildId}/moderation/rules/${ruleId}`, rule, {
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
  actions: Punishment[] | null;
  reason: string | null;
}
