import ListActions from "@/components/dashboard/actions/list-actions";
import { useUpdatePunishment } from "@/lib/hooks";
import type { UpsertPunishment } from "@/types/moderation";
import type { UseState } from "@/types/react";
import { Button, Modal, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck, IconCopyCheck, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AddActions from "../dashboard/actions/add-actions";

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
    // Those are essentially useless, but react cries because the values will be changed to undefined
    // when the modal is closed.
    initialValues: {
      id: 0,
      guild_id: undefined,
      actions: [],
      reason: "",
      name: "",
      enabled: false,
    },
    validate: {
      name: (value) => {
        if (!value) return "Name is required.";

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Form never changes
  useEffect(() => {
    if (!open) return;

    setActions(open?.actions ?? []);
    form.setValues({
      enabled: open?.enabled ?? false,
      reason: open?.reason ?? "",
      name: open?.name ?? "",
      id: open?.id ?? 0,
      guild_id: open?.guild_id ?? undefined,
      actions: [],
    });

    // Infinity loop when adding form as dependency
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
      <form onSubmit={() => {}}>
        <Switch
          checked={form.values.enabled}
          color={"teal"}
          label={"Enabled"}
          labelPosition={"left"}
          mb={5}
          offLabel={<IconX color={"red"} size="1rem" stroke={3} />}
          onChange={(event) => form.setFieldValue("enabled", event.currentTarget.checked)}
          onLabel={<IconCheck color={"lime"} size="1rem" stroke={3} />}
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
        <ListActions punishments={actions} setPunishments={setActions} />
        <AddActions punishments={actions} setPunishments={setActions} />
        <span className={"text-sm text-red-400"}>{actionErrorMessages}</span>
      </div>

      <div className={"mt-2 flex justify-end gap-2"}>
        <Button
          onClick={() => {
            form.reset();
            setOpen(null);
          }}
          variant={"default"}
        >
          Cancel
        </Button>

        <Button
          color={"cyan"}
          leftSection={<IconCopyCheck />}
          loading={loading}
          onClick={() => {
            if (form.validate().hasErrors) {
              return;
            }

            if (!actions.some((action) => action.check === null || action.check === undefined)) {
              setActionErrorMessages("There has to be at least one action, that affects everyone.");
              return;
            }

            setLoading(true);

            updatePunishment
              .mutateAsync({ punishmentId: form.values.id ?? 0, payload: { ...form.values, actions } })
              .then(() => {
                setLoading(false);
                setOpen(null);
                form.reset();
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
          Save punishment
        </Button>
      </div>
    </Modal>
  );
}

export default EditPunishmentModal;
