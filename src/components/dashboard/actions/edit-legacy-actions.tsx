import { Action } from "@/types/moderation";
import { useState } from "react";
import AddPunishment from "@/components/dashboard/actions/add-actions";
import ListActions from "@/components/dashboard/actions/list-actions";

interface Props {
  punishments: Action[];
  onChange: (actions: Action[]) => void;
  isFinal?: boolean;
}

function EditLegacyActions({ punishments, onChange, isFinal }: Props) {
  const [actionState, setActionState] = useState<Action[]>([...punishments]);

  function customSetActions(actions: Action[] | ((actions: Action[]) => Action[])) {
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
