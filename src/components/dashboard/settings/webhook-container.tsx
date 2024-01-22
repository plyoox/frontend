import WebhookView from "@/components/dashboard/settings/webhook-view";

function WebhookContainer({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className={"text-xl font-semibold"}>Webhooks</h2>
      <div className={"flex flex-col gap-2"}>
        <WebhookView />
      </div>
    </div>
  );
}

export default WebhookContainer;
