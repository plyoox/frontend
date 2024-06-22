import type { Action, ActionWithoutId } from "@/types/moderation";

export function addIdToActions(actions: ActionWithoutId[]): Action[] {
  return actions.map((action) => ({ ...action, id: crypto.randomUUID() }));
}
