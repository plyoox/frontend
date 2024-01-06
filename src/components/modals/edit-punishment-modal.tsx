import { Button, Modal, Switch, TextInput } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconCopyCheck, IconX } from "@tabler/icons-react";
import { UseState } from "@/types/react";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useUpdatePunishment } from "@/lib/hooks";
import AddActions from "../dashboard/actions/add-actions";
import ListActions from "@/components/dashboard/actions/list-actions";
import type { UpsertPunishment } from "@/types/moderation";

interface Props {
  open: Partial<UpsertPunishment> | null;
  setOpen: UseState<Partial<UpsertPunishment> | null>;
}

function EditPunishmentModal({ open, setOpen }: Props) {
  const updatePunishment = useUpdatePunishment();

  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState(open?.actions ?? []);
  const [actionErrorMessages, setActionErrorMessages] = useState<string | null>(null);
  const form = useForm<UpsertPunishment>({
    validate: {
      name: (value) => {
        if (value.length < 1) {
          return "Name has to be at least 1 character long.";
        }
        if (value.length > 50) {
          return "Name has to be at most 50 characters long.";
        }

        return false;
      },
      reason: (value) => {
        if (!value) return "Reason is required.";

        if (value.length < 1) {
          return "Reason has to be at least 1 character long.";
        }
        if (value.length > 500) {
          return "Reason has to be at most 500 characters long.";
        }

        return false;
      },
    },
  });

  useEffect(() => {
    if (actions.some((action) => action.check === null)) {
      setActionErrorMessages(null);
      return;
    }
  }, [actions]);

  useEffect(() => {
    if (!open) return;

    setActions(open?.actions ?? []);
    form.setValues({
      enabled: open?.enabled ?? false,
      reason: open?.reason ?? "",
      name: open?.name ?? "",
      id: open?.id ?? undefined,
      guild_id: open?.guild_id ?? undefined,
      actions: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      centered
      onClose={() => {
        form.reset();
        setOpen(null);
      }}
      opened={!!open}
      size={"xl"}
      title="Edit Punishments"
    >
      <form>
        <Switch
          color={"teal"}
          label={"Enabled"}
          maxLength={50}
          mb={5}
          minLength={1}
          offLabel={<IconX color={"red"} size="1rem" stroke={3} />}
          onLabel={<IconCheck color={"lime"} size="1rem" stroke={3} />}
          {...form.getInputProps("enabled")}
          labelPosition={"left"}
        />

        <TextInput
          required
          description="The Name of the punishment. The name should be unique and is used for identification."
          label="Name"
          maxLength={50}
          placeholder="Spamming"
          {...form.getInputProps("name")}
        />

        <TextInput
          required
          description="The reason for the punishment, should be short and concise. It will be used for logging and information."
          label="Reason"
          maxLength={500}
          placeholder="Spamming in Text Channels"
          {...form.getInputProps("reason")}
        />
      </form>

      <div className={"mt-2"}>
        <AddActions isFinal={true} punishments={actions} setPunishments={setActions} />
        <ListActions punishments={actions} setPunishments={setActions} />
        <span className={"text-sm text-red-400"}>{actionErrorMessages}</span>
      </div>

      <div className={"mt-2 flex justify-end gap-2"}>
        <Button
          color={"teal"}
          leftSection={<IconCopyCheck />}
          loading={loading}
          onClick={() => {
            if (form.validate().hasErrors) {
              return;
            }

            if (!actions.some((action) => action.check === null)) {
              console.log(actions);
              setActionErrorMessages("There has to be at least one action, that affects everyone.");
              return;
            }

            setLoading(true);

            updatePunishment
              .mutateAsync({ punishmentId: open?.id ?? 0, payload: { ...form.values, actions } })
              .then(() => {
                setLoading(false);
                form.reset();
                setOpen(null);
              })
              .catch((e) => {
                setLoading(false);
                notifications.show({
                  color: "red",
                  icon: <IconAlertCircle />,
                  title: "Failed to create or update punishment",
                  message: e.response?.data?.message ?? e.message,
                });
              });
          }}
          variant={"filled"}
        >
          Save
        </Button>

        <Button
          color={"red"}
          onClick={() => {
            form.reset();
            setOpen(null);
          }}
          variant={"light"}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

export default EditPunishmentModal;
