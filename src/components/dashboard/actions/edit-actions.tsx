import AddPunishment from "@/components/dashboard/actions/add-actions";
import ListActions from "@/components/dashboard/actions/list-actions";
import type { DiscordModerationRule } from "@/discord/types";
import { API_URL } from "@/environment";
import { useDeleteDiscordRule } from "@/lib/hooks";
import { removeModerationRule } from "@/lib/requests";
import { RuleStoreContext } from "@/stores/rule-store";
import type { Action, ModerationRule } from "@/types/moderation";
import { Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconPlaylistAdd, IconPlaylistX } from "@tabler/icons-react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";

function EditActions({ rule: discordRule }: { rule: DiscordModerationRule }) {
  const { push } = useRouter();
  const guildStore = useContext(RuleStoreContext);
  const deleteDiscordRule = useDeleteDiscordRule();

  const currentRule: ModerationRule = useMemo(() => {
    const hasConfig = guildStore.moderationRules.has(discordRule.id);

    return hasConfig
      ? JSON.parse(JSON.stringify(guildStore.moderationRules.get(discordRule.id)))
      : {
          rule_id: discordRule.id,
          guild_id: discordRule.guild_id,
          actions: [],
          reason: "",
        };
  }, [discordRule.id, discordRule.guild_id, guildStore.moderationRules]);

  const [punishments, setPunishments] = useState<Action[]>([...currentRule.actions]);
  const [loading, setLoading] = useState<boolean>(false);

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete Discord rule",
      centered: true,
      children: <p>Are you sure you want to delete this rule? This will delete the rule from your server.</p>,
      labels: { confirm: "Delete rule", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteDiscordRule
          .mutateAsync(currentRule.rule_id)
          .then(() => {
            sessionStorage.setItem(currentRule.rule_id, "deleted");

            push(`/dashboard/${currentRule.guild_id}/moderation`);
          })
          .catch((e) => {
            console.error(e.response.data);
          });
      },
    });

  return (
    <>
      <ListActions punishments={punishments} setPunishments={setPunishments} />
      <AddPunishment className="mt-2.5" punishments={punishments} setPunishments={setPunishments} />

      <div className={"mt-2.5 flex justify-end gap-2.5"}>
        <Tooltip withArrow label="This will delete the rule from the server">
          <Button color="red" leftSection={<IconPlaylistX />} onClick={openDeleteModal} variant="subtle">
            Delete
          </Button>
        </Tooltip>

        <Button
          leftSection={<IconPlaylistAdd />}
          loading={loading}
          onClick={() => {
            if (punishments.length === 0) {
              setLoading(true);
              removeModerationRule(currentRule.guild_id, currentRule.rule_id)
                .then(() => {
                  guildStore.removeModerationRule(currentRule.rule_id);
                  push(`/dashboard/${currentRule.guild_id}/moderation`);

                  setLoading(false);
                })
                .catch((e) => {
                  notifications.show({
                    icon: <IconAlertCircle />,
                    title: "Failed to delete rule",
                    message: e.message,
                  });

                  setLoading(false);
                });
            } else if (JSON.stringify(currentRule.actions) !== JSON.stringify(punishments)) {
              setLoading(true);
              saveModerationRule(currentRule.guild_id, currentRule.rule_id, {
                actions: punishments,
                reason: currentRule.reason,
              })
                .then(() => {
                  setLoading(false);
                  currentRule.actions = punishments;
                  guildStore.addModerationRule(currentRule);

                  push(`/dashboard/${currentRule.guild_id}/moderation`);
                })
                .catch((e) => {
                  notifications.show({
                    icon: <IconAlertCircle />,
                    color: "red",
                    title: "Failed to save rule",
                    message: e.message,
                  });

                  setLoading(false);
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

interface SetModerationRuleDto {
  actions: Action[] | null;
  reason: string | null;
}
