import { ActionIcon, Tooltip } from "@mantine/core";
import { ActionPunishmentKind } from "@/config/enums";
import { IconAlertTriangle, IconChevronRight } from "@tabler/icons-react";
import { RuleStoreContext } from "@/stores/rule-store";
import { getPunishmentKind } from "@/lib/utils";
import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import Link from "next/link";
import type { ModerationConfig } from "@/types/moderation";

function RequirePointsHandlerLink({ link, label, config }: { link: string; label: string; config: ModerationConfig }) {
  const ruleStore = useContext(RuleStoreContext);

  const showPointsWarning = useMemo(() => {
    if (!config.point_actions.length) {
      for (const rule of ruleStore.moderationRules.values()) {
        const hasPointActions = rule.actions.some((action) => {
          return getPunishmentKind(action) === ActionPunishmentKind.Point;
        });

        if (hasPointActions) {
          return true;
        }
      }
    }

    return false;
  }, [config.point_actions.length, ruleStore.moderationRules]);

  return (
    <Link
      className="my-2.5 flex h-16 w-full items-center justify-between rounded-md bg-mt-dark-6 p-4 duration-300 hover:bg-mt-dark-5"
      href={link}
    >
      <span className={"text-xl font-semibold text-pl-text"}>{label}</span>

      <div className={"flex"}>
        {showPointsWarning && (
          <Tooltip label="There are no points handlers. ">
            <ActionIcon color={"yellow"} variant={"light"}>
              <IconAlertTriangle />
            </ActionIcon>
          </Tooltip>
        )}

        <IconChevronRight />
      </div>
    </Link>
  );
}

export default observer(RequirePointsHandlerLink);
