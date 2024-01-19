import { Badge } from "@mantine/core";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { GuildStoreContext } from "@/stores/guild-store";
import { amountToColor } from "@/lib/utils";
import { useContext, useState } from "react";
import AddNotification from "@/components/dashboard/notifications/add-notification";
import EditNotificationModal from "@/components/dashboard/notifications/edit-notification-modal";
import TwitchNotificationContainer from "@/components/dashboard/notifications/twitch-notification-container";
import TwitchUser from "@/components/dashboard/notifications/twitch-user";
import type { TwitchNotification, TwitchNotificationResponse } from "@/types/notification";

function TwitchContainer({ twitch }: { twitch: TwitchNotificationResponse }) {
  const guildContext = useContext(GuildStoreContext);
  const [editNotification, setEditNotification] = useState<TwitchNotification | null>(null);

  const { user, notifications } = twitch;

  const limit = guildContext.premium ? PREMIUM_LIMITS.TWITCH_MAX_STREAMERS : DEFAULT_LIMITS.TWITCH_MAX_STREAMERS;

  return (
    <div className={"rounded-md bg-mt-dark-7 p-2"}>
      <h3 className={"mb-1 text-xl font-medium text-gray-50"}>Connected Account</h3>
      <span className={"text-sm leading-none text-mt-dark-0"}>
        This account is used for authentication when adding a new account or checking the live status. It can <b>not</b>{" "}
        do anything in your behalf.
      </span>

      <TwitchUser user={user} />

      <div className={"mt-3 flex justify-between"}>
        <h3>Notifications</h3>

        <Badge gradient={amountToColor(notifications.length, limit)} variant={"gradient"}>
          {notifications.length}/{limit} Streams
        </Badge>
      </div>
      {notifications.map((notification) => (
        <TwitchNotificationContainer
          key={notification.user.user_id}
          notification={notification}
          setEditNotification={setEditNotification}
        />
      ))}

      <AddNotification disabled={notifications.length >= limit} />

      <EditNotificationModal editNotification={editNotification} setEditNotification={setEditNotification} />
    </div>
  );
}

export default TwitchContainer;
