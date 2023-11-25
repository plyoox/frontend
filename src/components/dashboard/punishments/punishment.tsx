import { ActionIcon, Badge, Tooltip } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react";
import { Punishment } from "@/types/moderation";
import { UseState } from "@/types/react";
import { actionToText } from "@/config/utils";

interface Props {
  index: number;
  count: number;
  punishment: Punishment;
  setPunishments: UseState<Punishment[]>;
}

function ActionView({ punishment, index, setPunishments, count }: Props) {
  const showWarning = !punishment.check && index !== count - 1;

  const upDisabled = index === 0;
  const downDisabled = index === count - 1;

  return (
    <div className="flex items-center justify-between rounded-md h-[60px] bg-mt-dark-7 p-2 pl-2.5 my-1">
      <div className={"flex justify-between items-center gap-2"}>
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
              variant="transparent"
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
              variant="transparent"
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
