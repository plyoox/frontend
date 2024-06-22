"use client";

import EditPointActions from "@/components/dashboard/edit-points/edit-point-actions";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import SaveNotification from "@/components/save-notification";
import { ActionPunishmentKind } from "@/lib/enums";
import { useGuildData, useModerationData } from "@/lib/hooks";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { saveModerationData } from "@/lib/requests";
import { GuildStoreContext } from "@/stores/guild-store";
import type { Action } from "@/types/moderation";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef, useState } from "react";

function EditPointsContainer() {
  function handleChange(actions: Action[]) {
    if (JSON.stringify(actions) !== oldConfig.current) {
      setUpdatedConfig(actions);
    }
  }

  const guildStore = useContext(GuildStoreContext);
  const oldConfig = useRef<string>("");
  const [updatedConfig, setUpdatedConfig] = useState<Action[] | null>(null);
  const [actions, setActions] = useState<Action[]>([]);

  const { data, isLoading, error } = useModerationData();
  useGuildData({ category: true, roles: true, text: true, premium: true });

  useEffect(() => {
    if (!data) return;

    oldConfig.current = JSON.stringify(data.config.point_actions);

    setActions(data.config.point_actions);
  }, [data]);

  function customSetActions(setActionState: Action[] | ((actions: Action[]) => Action[])) {
    let resolvedActions: Action[];
    if (typeof setActionState === "function") {
      resolvedActions = setActionState(actions);
    } else {
      resolvedActions = setActionState;
    }

    setActions(resolvedActions);
    handleChange(resolvedActions);
  }

  if (error) {
    return <RequestError error={error} />;
  }

  if (isLoading || typeof data === "undefined") {
    return <LoadingSkeleton />;
  }

  const hasGlobalPunishment = !!actions.find((a) => !a.check);
  const limit = guildStore.premium ? PREMIUM_LIMITS.MAX_RULE_PUNISHMENTS : DEFAULT_LIMITS.MAX_RULE_PUNISHMENTS;

  return (
    <>
      {!hasGlobalPunishment && (
        <Alert className={"my-2"} color={"orange"} icon={<IconInfoCircle />} title={"Missing Global Punishment"}>
          <div className={"p-1"}>
            It is required to have at least one Punishment that affects everyone.{" "}
            {actions.length < limit && (
              <button
                type={"button"}
                className={"mx-1 rounded-md bg-yellow-800 px-1 py-0.5 font-semibold text-orange-100 hover:underline"}
                onClick={() => {
                  customSetActions((actions) => [
                    ...actions,
                    {
                      id: crypto.randomUUID(),
                      check: null,
                      punishment: {
                        [ActionPunishmentKind.TempBan]: {
                          duration: 2419200,
                        },
                      },
                    },
                  ]);
                }}
              >
                Click here to add one.
              </button>
            )}
          </div>
        </Alert>
      )}

      <EditPointActions actions={actions} isFinal={true} setActions={customSetActions} />

      <SaveNotification
        data={updatedConfig ? { point_actions: updatedConfig } : null}
        disabled={!hasGlobalPunishment}
        fn={saveModerationData}
        onSave={() => {
          oldConfig.current = JSON.stringify(actions);

          setUpdatedConfig(null);
        }}
      />
    </>
  );
}

export default observer(EditPointsContainer);
