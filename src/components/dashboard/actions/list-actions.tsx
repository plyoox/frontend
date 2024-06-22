import Punishment from "@/components/dashboard/actions/action";
import type { Action as PunishmentType } from "@/types/moderation";
import type { UseState } from "@/types/react";

interface Props {
  punishments: PunishmentType[];
  setPunishments: UseState<PunishmentType[]>;
}

function ListActions({ punishments, setPunishments }: Props) {
  return (
    <div>
      {punishments.map((action, index) => (
        <Punishment
          count={punishments.length}
          index={index}
          key={action.id}
          punishment={action}
          setPunishments={setPunishments}
        />
      ))}
    </div>
  );
}

export default ListActions;
