"use client";

import { LoadingOverlay } from "@mantine/core";
import { MaybeWebhook } from "@/types/webhook";
import { useEffect, useState } from "react";
import { useGuildData, useWebhooks } from "@/lib/hooks";
import RequestError from "@/components/dashboard/request-error";
import WebhookView from "@/components/dashboard/settings/webhook-view";

type Config = MaybeWebhook[];

function WebhookContainer({ className }: { className?: string }) {
  useGuildData({ text: true });
  const webhooks = useWebhooks();

  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    if (webhooks.data) {
      setConfig(webhooks.data);
    }
  }, [webhooks.data]);

  if (webhooks.error) {
    return <RequestError error={webhooks.error} />;
  }

  if (webhooks.isLoading || !config) {
    return <LoadingOverlay />;
  }

  return (
    <div className={className}>
      <h2 className={"text-xl font-semibold"}>Webhooks</h2>
      <div className={"flex flex-col gap-2"}>
        {config.map((webhook) => (
          <WebhookView key={webhook.id} {...webhook} setWebhooks={setConfig!} />
        ))}

        {config.length === 0 && (
          <div className={"flex h-14 items-center justify-center rounded-md bg-mt-dark-7 text-sm text-mt-dark-2"}>
            No webhooks created yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default WebhookContainer;
