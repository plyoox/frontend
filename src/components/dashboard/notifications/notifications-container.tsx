"use client";

import { useGuildData } from "@/lib/hooks";
import TwitchContainer from "@/components/dashboard/notifications/twitch-container";

function NotificationsContainer() {
  useGuildData({ text: true, premium: true });

  return (
    <div>
      <TwitchContainer />
    </div>
  );
}

export default NotificationsContainer;
