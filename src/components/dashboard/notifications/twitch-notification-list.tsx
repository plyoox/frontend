import { useState } from "react";
import AddNotification from "@/components/dashboard/notifications/add-notification";
import EditNotificationModal from "@/components/dashboard/notifications/edit-notification-modal";
import TwitchNotificationContainer from "@/components/dashboard/notifications/twitch-notification-container";
import type { TwitchNotification } from "@/types/notification";

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

      <AddNotification disabled={disabled} />

      <EditNotificationModal editNotification={editNotification} setEditNotification={setEditNotification} />
    </div>
  );
}

export default TwitchNotificationList;
