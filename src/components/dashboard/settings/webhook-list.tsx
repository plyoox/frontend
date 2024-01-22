import { MaybeWebhook } from "@/types/webhook";
import Webhook from "@/components/dashboard/settings/webhook";
import type { UseState } from "@/types/react";

function WebhookList({ webhooks, setWebhooks }: { webhooks: MaybeWebhook[]; setWebhooks: UseState<MaybeWebhook[]> }) {
  if (webhooks.length === 0) {
    return (
      <div className={"flex h-14 items-center justify-center rounded-md bg-mt-dark-7 text-sm text-mt-dark-2"}>
        No webhooks created yet.
      </div>
    );
  }

  return webhooks.map((webhook) => <Webhook key={webhook.id} {...webhook} setWebhooks={setWebhooks} />);
}

export default WebhookList;
