import { Button, Modal, Select, Textarea } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconAlertCircle, IconBellCheck, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useEditYoutubeNotification } from "@/lib/hooks";
import { useForm } from "@mantine/form";
import type { UseState } from "@/types/react";
import type { YoutubeNotification } from "@/types/notification";

function EditYoutubeNotificationModal({
  editNotification,
  setEditNotification,
}: {
  editNotification: YoutubeNotification | null;
  setEditNotification: UseState<YoutubeNotification | null>;
}) {
  const guildStore = useContext(GuildStoreContext);
  const editNotificationReq = useEditYoutubeNotification();

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

  useEffect(() => {
    form.setValues({
      channel: editNotification?.channel,
      message: editNotification?.message ?? "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            .mutateAsync({ channelId: editNotification!.youtube_channel, channel, message })
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

export default observer(EditYoutubeNotificationModal);
