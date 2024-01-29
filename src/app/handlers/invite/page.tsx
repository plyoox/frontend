"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("error")) {
      const channel = new BroadcastChannel("bot-invite");
      channel.postMessage(`error:${searchParams.get("error")}`);
      channel.close();
    } else if (searchParams.has("data")) {
      const channel = new BroadcastChannel("bot-invite");
      channel.postMessage(searchParams.get("data"));
      channel.close();
    }
    window.close();
  }, [searchParams]);

  return "This window can now be closed";
}

export default Page;
