import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck, IconEdit, IconExternalLink, IconTrash } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDeleteYoutubeNotification } from "@/lib/hooks";
import { useState } from "react";
import Image from "next/image";
import type { UseState } from "@/types/react";
import type { YoutubeNotification } from "@/types/notification";

function YoutubeNotificationContainer({
  notification,
  setEditNotification,
}: {
  notification: YoutubeNotification;
  setEditNotification: UseState<YoutubeNotification | null>;
}) {
  const deleteNotification = useDeleteYoutubeNotification();

  const [deleting, setDeleting] = useState(false);

  return (
    <div className={"mb-1 flex items-center justify-between rounded-md bg-mt-dark-5 p-1.5 px-2.5"}>
      <div className={"flex items-center gap-2"}>
        <Image
          unoptimized
          alt={`${notification.name} avatar`}
          className={"rounded-full"}
          height={40}
          src={notification.profile_image_url}
          width={40}
        />

        <a
          className={"flex items-center gap-0.5 text-lg font-medium hover:underline"}
          href={`https://www.youtube.com/channel/${notification.youtube_channel}`}
          target={"_blank"}
        >
          {notification.name}
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
                .mutateAsync(notification.youtube_channel)
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

export default YoutubeNotificationContainer;
