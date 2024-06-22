import AddPunishment from "@/components/dashboard/actions/add-actions";
import ListActions from "@/components/dashboard/actions/list-actions";
import type { Action } from "@/types/moderation";
import type { UseState } from "@/types/react";

interface Props {
  isFinal?: boolean;
  actions: Action[];
  setActions: UseState<Action[]>;
}

function EditPointActions({ isFinal, actions, setActions }: Props) {
  return (
    <>
      <ListActions punishments={actions} setPunishments={setActions} />
      <AddPunishment className="mt-2.5" isFinal={isFinal} punishments={actions} setPunishments={setActions} />
    </>
  );
}

export default EditPointActions;
