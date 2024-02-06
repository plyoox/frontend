import { Action } from "@/types/moderation";
import { ActionIcon, Badge, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react";
import { UseState } from "@/types/react";
import { actionToText } from "@/lib/utils";

interface Props {
  index: number;
  count: number;
  punishment: Action;
  setPunishments: UseState<Action[]>;
}

function ActionView({ punishment, index, setPunishments, count }: Props) {
  const showWarning = !punishment.check && index !== count - 1;

  const upDisabled = index === 0;
  const downDisabled = index === count - 1;

  return (
    <div className="my-1 flex items-center justify-between gap-2 rounded-md bg-mt-dark-6 p-2 pl-2.5">
      <div className={"flex items-center justify-between gap-2"}>
        <span>{actionToText(punishment)}</span>
        {showWarning && (
          <Tooltip withArrow label="This is a global action and should be last. Click to resolve">
            <Badge
              color="red"
              onClick={() => {
                setPunishments((actions) => {
                  actions = actions.filter((_, itemIndex) => itemIndex !== index);
                  actions.push(punishment);

                  return actions;
                });
              }}
              style={{ cursor: "pointer" }}
              variant="filled"
            >
              Blocking
            </Badge>
          </Tooltip>
        )}
      </div>

      <div className={"flex items-center gap-2"}>
        <Tooltip withArrow label="Remove action">
          <ActionIcon
            color="red"
            onClick={() =>
              setPunishments((actions) => {
                actions = actions.filter((_, itemIndex) => itemIndex !== index);

                return actions;
              })
            }
            variant="light"
          >
            <IconX size={18} />
          </ActionIcon>
        </Tooltip>

        <div className={"flex flex-col gap-1.5"}>
          <Tooltip withArrow disabled={upDisabled} label="Move action up">
            <ActionIcon
              color={"gray"}
              disabled={upDisabled}
              onClick={() => {
                setPunishments((actions) => {
                  actions[index] = actions.splice(index - 1, 1, actions[index])[0];

                  return [...actions];
                });
              }}
              size="sm"
              variant={"light"}
            >
              <IconChevronUp />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow disabled={downDisabled} label="Move action down">
            <ActionIcon
              color={"gray"}
              disabled={downDisabled}
              onClick={() => {
                setPunishments((actions) => {
                  actions[index] = actions.splice(index - 1, 1, actions[index])[0];

                  return [...actions];
                });
              }}
              size="sm"
              variant={"light"}
            >
              <IconChevronDown />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default ActionView;
