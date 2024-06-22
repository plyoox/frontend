import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import TwitchNotificationList from "@/components/dashboard/notifications/twitch-notification-list";
import TwitchUser from "@/components/dashboard/notifications/twitch-user";
import RequestError from "@/components/dashboard/request-error";
import { useTwitchNotifications } from "@/lib/hooks";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { amountToColor } from "@/lib/utils";
import { GuildStoreContext } from "@/stores/guild-store";
import type { TwitchNotificationResponse } from "@/types/notification";
import { Badge, ThemeIcon } from "@mantine/core";
import { IconBrandTwitch } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

function TwitchContainer() {
  const guildContext = useContext(GuildStoreContext);

  const notificationResponse = useTwitchNotifications();

  const [twitch, setTwitch] = useState<TwitchNotificationResponse | null>(null);

  useEffect(() => {
    if (notificationResponse.data) {
      setTwitch(notificationResponse.data);
    }
  }, [notificationResponse.data]);

  if (notificationResponse.error) {
    return <RequestError error={notificationResponse.error} />;
  }

  if (notificationResponse.isLoading || !twitch) {
    return <LoadingSkeleton />;
  }

  const { user, notifications } = twitch;

  const limit = guildContext.premium ? PREMIUM_LIMITS.TWITCH_MAX_STREAMERS : DEFAULT_LIMITS.TWITCH_MAX_STREAMERS;

  return (
    <div className={"rounded-md bg-mt-dark-7 p-2"}>
      <div className={"mb-2 flex items-center gap-2"}>
        <ThemeIcon color={"grape"} radius={"md"} variant={"light"}>
          <IconBrandTwitch size={24} />
        </ThemeIcon>

        <h1 className={"text-xl"}>Twitch</h1>
      </div>

      <h3 className={"mb-1 text-lg font-medium text-gray-50"}>Connected Account</h3>
      <span className={"text-sm leading-none text-mt-dark-0"}>
        This account is used for authentication when adding a new account or checking the live status. It can <b>not</b>{" "}
        do anything in your behalf.
      </span>

      <TwitchUser user={user} />

      <div className={"mt-3 flex justify-between"}>
        <h3 className={"font-semibold"}>Notifications</h3>

        <Badge gradient={amountToColor(notifications.length, limit)} variant={"gradient"}>
          {notifications.length}/{limit} Streams
        </Badge>
      </div>

      <TwitchNotificationList disabled={notifications.length >= limit || !user} notifications={notifications} />
    </div>
  );
}

export default observer(TwitchContainer);
