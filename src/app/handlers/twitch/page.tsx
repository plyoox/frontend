"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const receivedData = searchParams.get("data");
    if (receivedData !== null) {
      try {
        const data = window.atob(receivedData);

        const channel = new BroadcastChannel("notifications-login");
        channel.postMessage(data);
        channel.close();
      } catch (e) {
        sendError("Failed to deserialize data");
      }
    } else if (searchParams.has("error")) {
      const channel = new BroadcastChannel("notifications-login");
      channel.postMessage(`error:${searchParams.get("error")}`);
      channel.close();
    }

    window.close();
  }, [searchParams]);

  return "This window can now be closed";
}

export default Page;

function sendError(error: string) {
  const channel = new BroadcastChannel("notifications-login");
  channel.postMessage(`error:${error}`);
  channel.close();
}
