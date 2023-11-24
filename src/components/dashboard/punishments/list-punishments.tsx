import { UseState } from "@/types/react";
import Punishment from "@/components/dashboard/punishments/punishment";
import type { Punishment as PunishmentType } from "@/types/moderation";

interface Props {
  punishments: PunishmentType[];
  setPunishments: UseState<PunishmentType[]>;
}

function ListPunishments({ punishments, setPunishments }: Props) {
  return (
    <div className="mt-2.5">
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

export default ListPunishments;
