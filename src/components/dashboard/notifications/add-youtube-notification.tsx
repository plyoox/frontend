import { Button, Modal, Select, TextInput, Tooltip } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconBellPlus, IconBrandYoutube, IconCopyX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useContext, useState } from "react";
import { useCreateYoutubeNotification } from "@/lib/hooks";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface AddUserForm {
  youtubeUrl: string;
  channel: string;
}

const YOUTUBE_REGEX = new RegExp(/youtube\.com\/(channel\/|user\/|c\/)?(@?[a-zA-Z0-9_-]+)/);

function AddYoutubeNotification({ disabled }: { disabled: boolean }) {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const createNotification = useCreateYoutubeNotification();
  const guildStore = useContext(GuildStoreContext);

  const form = useForm<AddUserForm>({
    initialValues: {
      youtubeUrl: "",
      channel: "",
    },
    validate: {
      youtubeUrl: (value) => {
        const result = YOUTUBE_REGEX.test(value);

        return !result && "Name must be between 1 and 25 characters";
      },
      channel: (value) => !value?.length && "A notification channel is required.",
    },
  });

  return (
    <>
      <div className={"flex justify-end"}>
        <Tooltip
          id={"button-description"}
          label={disabled ? "Your notification limit has been reached" : "Add a new notification"}
        >
          <Button
            aria-describedby={"button-description"}
            className={"mt-2"}
            color={"red"}
            disabled={disabled}
            leftSection={<IconBrandYoutube />}
            onClick={open}
            variant={"light"}
          >
            Add new youtube notification
          </Button>
        </Tooltip>
      </div>

      <Modal
        centered
        onClose={close}
        opened={isOpen}
        title={<span className={"text-lg font-semibold"}>Add Notification</span>}
      >
        <p className={"mb-1 text-sm"}>Add a new notification to your guild!</p>

        <form
          onSubmit={form.onSubmit((values) => {
            setLoading(true);

            createNotification
              .mutateAsync({ channel: values.channel, youtube_url: values.youtubeUrl })
              .then(() => {
                setLoading(false);
                close();
                form.reset();
              })
              .catch((e) => {
                notifications.show({
                  title: "Failed to create notifications",
                  message: e.response?.data?.message ?? e.message,
                  color: "red",
                  icon: <IconCopyX size={14} />,
                });

                setLoading(false);
              });
          })}
        >
          <TextInput
            {...form.getInputProps("youtubeUrl")}
            description={"Enter Youtube Channel url"}
            label={"Youtube Channel"}
          />

          <Select
            searchable
            data={guildStore.writeableAsSelectable}
            description={"The channel where the notification should be sent to."}
            label={"Channel"}
            placeholder={"Select a notification channel..."}
            {...form.getInputProps("channel")}
          />

          <div className={"mt-4 flex justify-end gap-2"}>
            <Button color={"red"} onClick={close} variant={"subtle"}>
              Cancel
            </Button>
            <Button color={"plyoox"} leftSection={<IconBellPlus />} loading={loading} type={"submit"} variant={"light"}>
              Add Notification
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddYoutubeNotification;
