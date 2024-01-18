import { Button, Modal, TextInput } from "@mantine/core";
import { IconBellPlus, IconBrandTwitch, IconCopyX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useCreateNotification } from "@/lib/hooks";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface AddUserForm {
  name: string;
}

const TWITCH_REGEX = new RegExp(/^(?:https?:\/\/(?:www\.)?twitch\.tv\/)?([a-zA-Z0-9_]{4,25})$/);

function AddNotification() {
  const [isOpen, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const createNotification = useCreateNotification();

  const form = useForm<AddUserForm>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => {
        const result = TWITCH_REGEX.test(value);

        return !result && "Name must be between 1 and 25 characters";
      },
    },
  });

  return (
    <>
      <div className={"flex justify-end"}>
        <Button className={"mt-2"} color={"violet"} leftSection={<IconBrandTwitch />} onClick={open} variant={"light"}>
          Add new twitch notification
        </Button>
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
              .mutateAsync(name)
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
          <TextInput {...form.getInputProps("name")} description={"Enter Channel url or name"} label={"Channel Url"} />

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
