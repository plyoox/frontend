import { Action } from "@/types/moderation";
import { Badge, ThemeIcon } from "@mantine/core";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconPlus } from "@tabler/icons-react";
import { UseState } from "@/types/react";
import { amountToColor } from "@/lib/utils";
import { modals } from "@mantine/modals";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

interface Props {
  punishments: Action[];
  setPunishments: UseState<Action[]>;
  isFinal?: boolean;
  className?: string;
}

function AddActions({ punishments, setPunishments, isFinal, className }: Props) {
  function openAddActionModal() {
    modals.openContextModal({
      modal: "addAction",
      title: "Add new action",
      size: "xl",
      centered: true,
      innerProps: {
        isFinal,
        onSubmit: (action: Action) => {
          setPunishments((actions) => [...actions, action]);
        },
      },
    });
  }

  const guildStore = useContext(GuildStoreContext);

  const limit = guildStore.premium ? PREMIUM_LIMITS.MAX_RULE_PUNISHMENTS : DEFAULT_LIMITS.MAX_RULE_PUNISHMENTS;

  return (
    <div className={className}>
      <button
        className={`flex h-[60px] w-full cursor-pointer items-center justify-between rounded-md bg-mt-dark-6 pl-2.5 pr-2 hover:bg-mt-dark-5
        disabled:cursor-not-allowed disabled:bg-mt-dark-7 disabled:hover:bg-mt-dark-7`}
        disabled={punishments.length >= limit}
        onClick={() => {
          openAddActionModal();
        }}
      >
        <div className="flex items-center gap-3 font-semibold">
          <ThemeIcon color="green" size="md" variant="light">
            <IconPlus size={20} />
          </ThemeIcon>
          <span className="mt-0.5">Add action</span>
        </div>
        <Badge gradient={amountToColor(punishments.length, limit)} variant="gradient">
          {punishments.length}/{limit} Rules
        </Badge>
      </button>
    </div>
  );
}

export default observer(AddActions);
