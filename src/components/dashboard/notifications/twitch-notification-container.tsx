import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck, IconEdit, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDeleteTwitchNotification } from "@/lib/hooks";
import { useState } from "react";
import Image from "next/image";
import type { TwitchNotification } from "@/types/notification";
import type { UseState } from "@/types/react";

function TwitchNotificationContainer({
  notification,
  setEditNotification,
}: {
  notification: TwitchNotification;
  setEditNotification: UseState<TwitchNotification | null>;
}) {
  const deleteNotification = useDeleteTwitchNotification();

  const [deleting, setDeleting] = useState(false);

  const { user } = notification;

  return (
    <div className={"mb-1 flex items-center justify-between rounded-md bg-mt-dark-5 p-1.5 px-2.5"}>
      <div className={"flex items-center gap-2"}>
        <Image
          unoptimized
          alt={`${user.display_name} avatar`}
          className={"rounded-full"}
          height={40}
          src={`https://static-cdn.jtvnw.net/${user.profile_image_url}`}
          width={40}
        />

        <a
          className={"flex items-center gap-0.5 text-lg font-medium hover:underline"}
          href={`https://twitch.tv/${user.login}`}
          target={"_blank"}
        >
          {user.display_name}
          <IconExternalLink className={"size-5"} />
        </a>
      </div>

      <div className={"flex items-center"}>
        <Tooltip label={"Edit Notification"}>
          <ActionIcon
            aria-label={"Edit Notification"}
            className={"mr-3"}
            color={"blue"}
            onClick={() => setEditNotification(notification)}
            variant={"subtle"}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={"Delete Notification"}>
          <ActionIcon
            aria-label={"Delete Notification"}
            color={"red"}
            loading={deleting}
            onClick={() => {
              setDeleting(true);

              deleteNotification
                .mutateAsync(user.user_id)
                .then(() => {
                  notifications.show({
                    color: "green",
                    icon: <IconCheck />,
                    title: "Notification has been removed",
                    message: "The Notification has been successfully removed.",
                  });

                  setDeleting(false);
                })
                .catch((e) => {
                  notifications.show({
                    color: "red",
                    icon: <IconCheck />,
                    title: "Error",
                    message: e.response?.data?.message,
                  });

                  setDeleting(false);
                });
            }}
            variant={"light"}
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
}

export default TwitchNotificationContainer;
