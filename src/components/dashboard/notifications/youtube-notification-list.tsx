import { useState } from "react";
import AddYoutubeNotification from "@/components/dashboard/notifications/add-youtube-notification";
import EditYoutubeNotificationModal from "@/components/dashboard/notifications/edit-youtube-notification-modal";
import YoutubeNotificationContainer from "@/components/dashboard/notifications/youtube-notification-container";
import type { YoutubeNotification } from "@/types/notification";

function YoutubeNotificationList({
  notifications,
  disabled,
}: {
  notifications: YoutubeNotification[];
  disabled: boolean;
}) {
  const [editNotification, setEditNotification] = useState<YoutubeNotification | null>(null);

  return (
    <div>
      {notifications.map((notification) => (
        <YoutubeNotificationContainer
          key={notification.youtube_channel}
          notification={notification}
          setEditNotification={setEditNotification}
        />
      ))}

      {notifications.length === 0 && (
        <div className={"flex h-14 items-center justify-center rounded-md bg-mt-dark-6 text-sm text-mt-dark-2"}>
          No notifications created
        </div>
      )}

      <AddYoutubeNotification disabled={disabled} />

      <EditYoutubeNotificationModal editNotification={editNotification} setEditNotification={setEditNotification} />
    </div>
  );
}

export default YoutubeNotificationList;
