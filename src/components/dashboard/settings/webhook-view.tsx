"use client";

import RequestError from "@/components/dashboard/request-error";
import WebhookList from "@/components/dashboard/settings/webhook-list";
import { useGuildData, useWebhooks } from "@/lib/hooks";
import type { MaybeWebhook } from "@/types/webhook";
import { Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";

export function WebhookView() {
  useGuildData({ text: true });
  const webhookResponse = useWebhooks();

  const [webhooks, setWebhooks] = useState<MaybeWebhook[]>([]);

  useEffect(() => {
    if (webhookResponse.data) {
      setWebhooks(webhookResponse.data);
    }
  }, [webhookResponse.data]);

  if (webhookResponse.error) {
    return <RequestError error={webhookResponse.error} />;
  }

  if (webhookResponse.isLoading) {
    return <Skeleton height={56} width="100%" />;
  }

  return <WebhookList setWebhooks={setWebhooks} webhooks={webhooks} />;
}

export default WebhookView;
