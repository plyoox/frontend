import { API_URL } from "@/environment";
import { Button } from "@mantine/core";
import { IconBrandTwitch } from "@tabler/icons-react";
import { useGuildId } from "@/lib/hooks";
import { useState } from "react";
import AddNotification from "@/components/dashboard/notifications/add-notification";
import EditNotificationModal from "@/components/dashboard/notifications/edit-notification-modal";
import TwitchNotificationContainer from "@/components/dashboard/notifications/twitch-notification-container";
import TwitchUser from "@/components/dashboard/notifications/twitch-user";
import type { TwitchNotification, TwitchNotificationResponse } from "@/types/notification";

function TwitchContainer({ twitch }: { twitch: TwitchNotificationResponse }) {
  const guildId = useGuildId();

  const [editNotification, setEditNotification] = useState<TwitchNotification | null>(null);

  function openConnectModal() {
    window.open(`${API_URL}/twitch?guild_id=${guildId}`, "Create Twitch Connection | Plyoox", "height=900,width=500");

    const broadcastChannel = new BroadcastChannel("twitch-login");
    broadcastChannel.addEventListener("message", (event) => {
      console.log(event.data);
    });
  }

  const { user, notifications } = twitch;

  return (
    <div className={"rounded-md bg-mt-dark-7 p-2"}>
      <h3 className={"mb-1 text-xl font-medium text-gray-50"}>Connected Account</h3>
      <span className={"text-sm leading-none text-mt-dark-0"}>
        This account is used for authentication when adding a new account or checking the live status. It can <b>not</b>{" "}
        do anything in your behalf.
      </span>
      {user ? (
        <TwitchUser {...user} />
      ) : (
        <Button
          className={"my-1 block"}
          color={"grape"}
          leftSection={<IconBrandTwitch />}
          onClick={openConnectModal}
          variant={"light"}
        >
          Connect Twitch Account
        </Button>
      )}

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
