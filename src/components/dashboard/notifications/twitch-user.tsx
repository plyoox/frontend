import { ActionIcon, Tooltip } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useRemoveUser } from "@/lib/hooks";
import Image from "next/image";
import type { TwitchUser } from "@/types/notification";

function TwitchUser(user: TwitchUser) {
  const removeUser = useRemoveUser();

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
