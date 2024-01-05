import { Punishment } from "@/types/moderation";
import { useState } from "react";
import AddPunishment from "@/components/dashboard/actions/add-actions";
import ListActions from "@/components/dashboard/actions/list-actions";

interface Props {
  punishments: Punishment[];
  onChange: (actions: Punishment[]) => void;
  isFinal?: boolean;
}

function EditLegacyActions({ punishments, onChange, isFinal }: Props) {
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
      <ListActions punishments={actionState} setPunishments={customSetActions} />
      <AddPunishment className="mt-2.5" isFinal={isFinal} punishments={actionState} setPunishments={customSetActions} />
    </>
  );
}

export default EditLegacyActions;
