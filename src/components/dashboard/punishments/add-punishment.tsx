import { Badge, Collapse, ThemeIcon } from "@mantine/core";
import { DEFAULT_LIMITS } from "@/lib/limits";
import { FC, useState } from "react";
import { IconAlertTriangle, IconPlus } from "@tabler/icons-react";
import { Punishment } from "@/types/moderation";
import { UseState } from "@/types/react";
import { amountToColor } from "@/config/utils";
import { showNotification } from "@mantine/notifications";

interface Props {
  actions: Punishment[];
  setActions: UseState<Punishment[]>;
  isFinal?: boolean;
  className?: string;
}

const AddPunishment: FC<Props> = ({ actions, setActions, isFinal, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        className={`pl-2.5 w-full rounded-md h-[60px] pr-2 bg-mt-dark-6 flex justify-between items-center cursor-pointer hover:bg-mt-dark-5`}
        onClick={() => {
          if (actions.length >= DEFAULT_LIMITS.MAX_AUTOMOD_RULES) {
            showNotification({
              title: "Max rules reached",
              message: `You can only have ${DEFAULT_LIMITS.MAX_AUTOMOD_RULES} rules per automod rule.`,
              color: "yellow",
              icon: <IconAlertTriangle size={16} />,
            });

            return;
          }

          setOpen(!open);
        }}
      >
        <div className="font-semibold flex items-center gap-3">
          <ThemeIcon color="green" size="md" variant="light">
            <IconPlus size={20} />
          </ThemeIcon>
          <span className="mt-0.5">Add action</span>
        </div>
        <Badge gradient={amountToColor(actions.length, DEFAULT_LIMITS.MAX_AUTOMOD_RULES)} variant="gradient">
          {actions.length}/{DEFAULT_LIMITS.MAX_AUTOMOD_RULES} Rules
        </Badge>
      </button>

      <Collapse className="rounded-b" in={open}>
        <AddActionForm
          actions={actions}
          className="rounded-md bg-mt-dark-6 p-2 mt-1"
          isFinal={isFinal}
          setActions={setActions}
          setOpen={setOpen}
        />
      </Collapse>
    </div>
  );
};

export default AddActionButton;
