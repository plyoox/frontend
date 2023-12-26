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
      </div>
    </div>
  );
}

export default WebhookContainer;
