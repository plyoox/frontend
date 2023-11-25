import { Punishment } from "@/types/moderation";
import { useState } from "react";
import AddPunishment from "@/components/dashboard/punishments/add-punishment";
import ListPunishments from "@/components/dashboard/punishments/list-punishments";

interface Props {
  punishments: Punishment[];
  onChange: (actions: Punishment[]) => void;
}

function EditLegacyPunishments({ punishments, onChange }: Props) {
  const [actionState, setActionState] = useState<Punishment[]>([...punishments]);

  function customSetActions(actions: Punishment[] | ((actions: Punishment[]) => Punishment[])) {
    if (typeof actions === "function") {
      actions = actions(actionState);
    }

    setActionState(actions);
    onChange(actions);
  }

  return (
    <>
      <ListPunishments punishments={actionState} setPunishments={customSetActions} />
      <AddPunishment className="mt-2.5" isFinal={true} punishments={actionState} setPunishments={customSetActions} />
    </>
  );
}

export default EditLegacyPunishments;
