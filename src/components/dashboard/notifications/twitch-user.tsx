import { API_URL } from "@/environment";
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { IconAlertCircle, IconBrandTwitch, IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useGuildId, useRemoveTwitchUser, useUpdateConnectedTwitchAccount } from "@/lib/hooks";
import Image from "next/image";
import type { TwitchUser } from "@/types/notification";

function TwitchUser({ user }: { user: TwitchUser | null }) {
  const guildId = useGuildId();
  const removeUser = useRemoveTwitchUser();
  const updateUser = useUpdateConnectedTwitchAccount();

  const openConfirmModal = () =>
    modals.openConfirmModal({
      title: <span className={"text-xl font-semibold"}>Remove Account</span>,
      centered: true,
      children: (
        <div className={"text-sm"}>
          <p className={"mb-2"}>Are you sure you sure you want to remove the account?</p>
          <p>Notifications will no longer be working as long as there is no account connected.</p>
        </div>
      ),
      labels: { confirm: "Remove Account", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        removeUser
          .mutateAsync()
          .then(() => {
            notifications.show({
              title: "User removed",
              message: "User has been removed.",
              icon: <IconCheck />,
              color: "green",
            });
          })
          .catch((err) => {
            notifications.show({
              title: "Error",
              message: err.response.data.message,
              icon: <IconAlertCircle />,
              color: "red",
            });
          });
      },
    });

  function openConnectWindow() {
    window.open(`${API_URL}/twitch?guild_id=${guildId}`, "Create Twitch Connection | Plyoox", "height=900,width=500");

    const broadcastChannel = new BroadcastChannel("notifications-login");
    broadcastChannel.addEventListener("message", (event) => {
      if (typeof event.data != "string") return;

      // Handle OAuth errors
      if (event.data.startsWith("error:")) {
        const errorMessage = event.data.replace("error:", "");

        notifications.show({
          title: "Error while connecting notifications account",
          color: "red",
          icon: <IconBrandTwitch />,
          message: errorMessage,
        });

        broadcastChannel.close();
        return;
      }

      const data: TwitchUser = JSON.parse(event.data);

      updateUser.mutate(data);
    });
  }

  if (!user) {
    return (
      <Button
        className={"my-1 block"}
        color={"grape"}
        leftSection={<IconBrandTwitch />}
        onClick={openConnectWindow}
        variant={"light"}
      >
        Connect Twitch Account
      </Button>
    );
  }

  return (
    <div className={"my-2 flex items-center justify-between rounded-md bg-mt-dark-5 p-1.5 px-2.5"}>
      <div className={"flex items-center gap-3"}>
        <Image
          unoptimized
          alt={`${user.display_name} avatar`}
          className={"rounded-full"}
          height={40}
          src={`https://static-cdn.jtvnw.net/${user.profile_image_url}`}
          width={40}
        />

        <span className={"font-medium"}>{user.display_name}</span>
      </div>

      <Tooltip label={"Remove account"}>
        <ActionIcon
          aria-label={"Remove account"}
          color={"red"}
          onClick={openConfirmModal}
          size={"sm"}
          variant={"light"}
        >
          <IconX />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

export default TwitchUser;
