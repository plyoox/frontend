"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const channel = new BroadcastChannel("webhook-creation");

    const webhookType = searchParams.get("type");
    const channelId = searchParams.get("channel_id");
    const webhookId = searchParams.get("webhook_id");
    if (channelId && webhookType && webhookId) {
      channel.postMessage(`${webhookType}:${channelId}:${webhookId}`);
      channel.close();
    } else {
      channel.postMessage(`error:missing params: ${JSON.stringify(searchParams)}`);
      channel.close();
    }

    window.close();
  }, [searchParams]);

  return "This window can now be closed";
}

export default Page;
