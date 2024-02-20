"use client";

import { useGuildData } from "@/lib/hooks";
import TwitchContainer from "@/components/dashboard/notifications/twitch-container";
import YoutubeContainer from "@/components/dashboard/notifications/youtube-container";

function NotificationsContainer() {
  useGuildData({ text: true, premium: true });

  return (
    <div>
      <TwitchContainer />
      <YoutubeContainer className={"mt-3"} />
    </div>
  );
}

export default NotificationsContainer;
