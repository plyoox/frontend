import { UseState } from "@/types/react";
import Punishment from "@/components/dashboard/actions/action";
import type { Action as PunishmentType } from "@/types/moderation";

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
          key={index}
          punishment={action}
          setPunishments={setPunishments}
        />
      ))}
    </div>
  );
}

export default ListActions;
