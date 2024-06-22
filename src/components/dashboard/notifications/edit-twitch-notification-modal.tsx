import { useEditTwitchNotification } from "@/lib/hooks";
import { GuildStoreContext } from "@/stores/guild-store";
import type { TwitchNotification } from "@/types/notification";
import type { UseState } from "@/types/react";
import { Button, Modal, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconBellCheck, IconCheck } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

function EditTwitchNotificationModal({
  editNotification,
  setEditNotification,
}: {
  editNotification: TwitchNotification | null;
  setEditNotification: UseState<TwitchNotification | null>;
}) {
  const guildStore = useContext(GuildStoreContext);
  const editNotificationReq = useEditTwitchNotification();

  const form = useForm<{ channel: string; message: string }>({
    initialValues: {
      channel: "",
      message: "",
    },
    validate: {
      channel: (value) => !value && "A notification channel is required.",
      message: (value) => value.length > 1900 && "A message can be at maximum 1900 characters.",
    },
  });

  const [loading, setLoading] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: 'form' never changes
  useEffect(() => {
    form.setValues({
      channel: editNotification?.channel,
      message: editNotification?.message ?? "",
    });
  }, [editNotification?.channel, editNotification?.message]);

  return (
    <Modal
      centered
      onClose={() => {
        setEditNotification(null);
        setLoading(false);
      }}
      opened={!!editNotification}
      title={<span className={"text-xl font-semibold"}>Edit Notification</span>}
    >
      <form
        onSubmit={form.onSubmit(({ channel, message }) => {
          setLoading(true);
          editNotificationReq
            // biome-ignore lint/style/noNonNullAssertion: editNotification is only null when the modal is closed
            .mutateAsync({ userId: editNotification!.user.user_id, channel, message })
            .then(() => {
              setLoading(false);
              setEditNotification(null);

              notifications.show({
                title: "Notification edited",
                message: "The notification has been successfully edited.",
                icon: <IconCheck />,
                color: "green",
              });
            })
            .catch((e) => {
              setLoading(false);

              notifications.show({
                title: "Error",
                message: e.response.data.message,
                color: "red",
                icon: <IconAlertCircle />,
              });
            });
        })}
      >
        <Select
          searchable
          data={guildStore.writeableAsSelectable}
          description={"The channel where the notification should be sent."}
          label={"Notification Channel"}
          placeholder={"Select a channel"}
          {...form.getInputProps("channel")}
        />

        <Textarea
          description={"The message that will be sent with the embed."}
          label={"Message"}
          placeholder={"@everyone"}
          {...form.getInputProps("message")}
        />

        <div className={"mt-2 flex justify-end gap-2"}>
          <Button
            color={"red"}
            onClick={() => {
              setLoading(false);
              setEditNotification(null);
            }}
            type={"button"}
            variant={"subtle"}
          >
            Cancel
          </Button>
          <Button leftSection={<IconBellCheck />} loading={loading} type={"submit"} variant={"light"}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default observer(EditTwitchNotificationModal);
