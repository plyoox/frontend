import AddPunishment from "@/components/dashboard/actions/add-actions";
import ListActions from "@/components/dashboard/actions/list-actions";
import type { Action } from "@/types/moderation";
import { useState } from "react";

interface Props {
  punishments: Action[];
  onChange: (actions: Action[]) => void;
  isFinal?: boolean;
}

function EditLegacyActions({ punishments, onChange, isFinal }: Props) {
  const [actionState, setActionState] = useState<Action[]>([...punishments]);

  function customSetActions(actions: Action[] | ((actions: Action[]) => Action[])) {
    let actionsValue: Action[];
    if (typeof actions === "function") {
      actionsValue = actions(actionState);
    } else {
      actionsValue = actions;
    }

    setActionState(actionsValue);
    onChange(actionsValue);
  }

  return (
    <>
      <ListActions punishments={actionState} setPunishments={customSetActions} />
      <AddPunishment className="mt-2.5" isFinal={isFinal} punishments={actionState} setPunishments={customSetActions} />
    </>
  );
}

export default EditLegacyActions;
