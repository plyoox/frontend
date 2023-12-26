"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("channel_id") && searchParams.has("type") && searchParams.has("webhook_id")) {
      const channelId = searchParams.get("channel_id")!;
      const webhookId = searchParams.get("webhook_id")!;
      const type = searchParams.get("type")!.split("-").splice(1).join("_");

      const channel = new BroadcastChannel("webhook-creation");
      channel.postMessage(`${type}:${channelId}:${webhookId}`);
      channel.close();
    }

    window.close();
  }, [searchParams]);

  return "This window can now be closed";
}

export default Page;
