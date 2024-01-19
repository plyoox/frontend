import { useState } from "react";
import AddNotification from "@/components/dashboard/notifications/add-notification";
import EditNotificationModal from "@/components/dashboard/notifications/edit-notification-modal";
import TwitchNotificationContainer from "@/components/dashboard/notifications/twitch-notification-container";
import TwitchUser from "@/components/dashboard/notifications/twitch-user";
import type { TwitchNotification, TwitchNotificationResponse } from "@/types/notification";

function TwitchContainer({ twitch }: { twitch: TwitchNotificationResponse }) {
  const [editNotification, setEditNotification] = useState<TwitchNotification | null>(null);

  const { user, notifications } = twitch;

  return (
    <div className={"rounded-md bg-mt-dark-7 p-2"}>
      <h3 className={"mb-1 text-xl font-medium text-gray-50"}>Connected Account</h3>
      <span className={"text-sm leading-none text-mt-dark-0"}>
        This account is used for authentication when adding a new account or checking the live status. It can <b>not</b>{" "}
        do anything in your behalf.
      </span>

      <TwitchUser user={user} />

      <h3>Notifications</h3>
      {notifications.map((notification) => (
        <TwitchNotificationContainer
          key={notification.user.user_id}
          notification={notification}
          setEditNotification={setEditNotification}
        />
      ))}

      <AddNotification />

      <EditNotificationModal editNotification={editNotification} setEditNotification={setEditNotification} />
    </div>
  );
}

export default TwitchContainer;
