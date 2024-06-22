import AddTwitchNotification from "@/components/dashboard/notifications/add-twitch-notification";
import EditTwitchNotificationModal from "@/components/dashboard/notifications/edit-twitch-notification-modal";
import TwitchNotificationContainer from "@/components/dashboard/notifications/twitch-notification-container";
import type { TwitchNotification } from "@/types/notification";
import { useState } from "react";

function TwitchNotificationList({
  notifications,
  disabled,
}: {
  notifications: TwitchNotification[];
  disabled: boolean;
}) {
  const [editNotification, setEditNotification] = useState<TwitchNotification | null>(null);

  return (
    <div>
      {notifications.map((notification) => (
        <TwitchNotificationContainer
          key={notification.user.user_id}
          notification={notification}
          setEditNotification={setEditNotification}
        />
      ))}

      {notifications.length === 0 && (
        <div className={"flex h-14 items-center justify-center rounded-md bg-mt-dark-6 text-sm text-mt-dark-2"}>
          No notifications created
        </div>
      )}

      <AddTwitchNotification disabled={disabled} />

      <EditTwitchNotificationModal editNotification={editNotification} setEditNotification={setEditNotification} />
    </div>
  );
}

export default TwitchNotificationList;
