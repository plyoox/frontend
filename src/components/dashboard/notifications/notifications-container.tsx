"use client";

import { useEffect, useState } from "react";
import { useGuildData, useTwitchNotifications } from "@/lib/hooks";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import TwitchContainer from "@/components/dashboard/notifications/twitch-container";
import type { TwitchNotificationResponse } from "@/types/notification";

function NotificationsContainer() {
  useGuildData({ text: true, premium: true });
  const notificationResponse = useTwitchNotifications();

  const [twitch, setTwitch] = useState<TwitchNotificationResponse | null>(null);

  useEffect(() => {
    if (notificationResponse.data) {
      setTwitch(notificationResponse.data.twitch);
    }
  }, [notificationResponse.data]);

  if (notificationResponse.error) {
    return <RequestError error={notificationResponse.error} />;
  }

  if (notificationResponse.isLoading || !twitch) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <TwitchContainer twitch={twitch} />
    </>
  );
}

export default NotificationsContainer;
