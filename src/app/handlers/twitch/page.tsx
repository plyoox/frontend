"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("data")) {
      const data = window.atob(searchParams.get("data")!);

      const channel = new BroadcastChannel("twitch-login");
      channel.postMessage(data);
      channel.close();
    }

    window.close();
  }, [searchParams]);

  return "This window can now be closed";
}

export default Page;
