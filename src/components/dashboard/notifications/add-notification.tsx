import { Button, Modal, Select, TextInput, Tooltip } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconBellPlus, IconBrandTwitch, IconCopyX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useContext, useState } from "react";
import { useCreateNotification } from "@/lib/hooks";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface AddUserForm {
  name: string;
  channel: string;
}

const TWITCH_REGEX = new RegExp(/^(?:https?:\/\/(?:www\.)?twitch\.tv\/)?([a-zA-Z0-9_]{4,25})$/);

function AddNotification({ disabled }: { disabled: boolean }) {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const createNotification = useCreateNotification();
  const guildStore = useContext(GuildStoreContext);

  const form = useForm<AddUserForm>({
    initialValues: {
      name: "",
      channel: "",
    },
    validate: {
      name: (value) => {
        const result = TWITCH_REGEX.test(value);

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
            color={"violet"}
            disabled={disabled}
            leftSection={<IconBrandTwitch />}
            onClick={open}
            variant={"light"}
          >
            Add new twitch notification
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

            const regex = values.name.match(TWITCH_REGEX)!;
            const name = regex[1];

            createNotification
              .mutateAsync({ channel: values.channel, name })
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
            {...form.getInputProps("name")}
            description={"Enter Twitch Channel url or name"}
            label={"Twitch Channel"}
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

export default AddNotification;
