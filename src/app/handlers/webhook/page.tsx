"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const channel = new BroadcastChannel("webhook-creation");

    if (searchParams.has("channel_id") && searchParams.has("type") && searchParams.has("webhook_id")) {
      const webhookType = searchParams.get("type")!;
      const channelId = searchParams.get("channel_id")!;
      const webhookId = searchParams.get("webhook_id")!;

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
