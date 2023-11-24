import { ActionCheckKind, ActionPunishmentKind } from "@/config/enums";
import { Button, Group, NumberInput, Select, Slider } from "@mantine/core";
import {
  DURATION_PUNISHMENTS,
  DiscordRulePunishmentItems,
  PointPunishmentItems,
  TIME_CHECKS,
  TIME_MARKS,
} from "@/config/select-values";
import { IconDatabasePlus } from "@tabler/icons-react";
import { Punishment } from "@/types/moderation";
import { UseState } from "@/types/react";
import React, { FC, useState } from "react";

interface Props {
  setPunishments: UseState<Punishment[]>;
  punishments: Punishment[];
  setOpen: UseState<boolean>;
  isFinal?: boolean;
}

interface FormValues {
  punishment?: ActionPunishmentKind | null;
  duration?: number;
  days?: number;
  check?: ActionCheckKind;
  points?: number;
  expires?: number | null;
}

function AddPunishmentForm({ setPunishments, setOpen, punishments, isFinal }: Props) {
  const [form, setForm] = useState<FormValues>({
    punishment: null,
  });

  const [actionError, setActionError] = useState<string | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  return (
    <>
      <Select
        data={isFinal ? PointPunishmentItems : DiscordRulePunishmentItems}
        description="What should happen when something is detected."
        error={actionError}
        label="Action"
        onChange={(value: any) => {
          setForm({
            ...form,
            punishment: value,
            duration: DURATION_PUNISHMENTS.includes(value) ? 10800 : undefined,
            points: value === ActionPunishmentKind.Point ? 1 : undefined,
            expires: value === ActionPunishmentKind.Point ? 1209600 : undefined,
          });
        }}
        onFocus={() => setActionError(null)}
        placeholder="Select action..."
        value={form.punishment ?? null}
      />

      {DURATION_PUNISHMENTS.includes(form.punishment!) && (
        <>
          <InfoHeading
            description={`How long should the user be ${
              form.punishment === ActionPunishmentKind.TempMute ? "muted" : "banned"
            }.`}
            label="Duration"
            mt={5}
          />
          <Slider
            label={null}
            marks={TIME_MARKS}
            max={11}
            mb={15}
            mx={10}
            onChangeEnd={(value) => {
              setForm({ ...form, duration: TIME_MARKS.find((m) => m.value === value)!.seconds });
            }}
            step={1}
            value={TIME_MARKS.find((m) => m.seconds === form.duration)?.value ?? 3}
          />
        </>
      )}

      {form.punishment === ActionPunishmentKind.Point && (
        <NumberInput
          description="How many points the user should get."
          label="Points"
          max={9}
          min={1}
          mt={5}
          onChange={(points) => {
            const value = parseNumberInput(points);
            if (isNaN(value)) return;

            setForm({ ...form, points: value });
          }}
          value={form.points}
        />
      )}

      {form.punishment === ActionPunishmentKind.Point && (
        <Select
          clearable
          searchable
          comboboxProps={{ withinPortal: true }}
          data={POINT_EXPIRATION}
          defaultValue={"1209600"}
          description="When the points should expire. You can add custom values by typing the seconds (>=300 | <=29030400)."
          label="Expires"
          mt={5}
          onChange={(val) => {
            if (!val) {
              setForm((form) => ({ ...form, expires: null }));
            } else {
              setForm((form) => ({ ...form, expires: parseInt(val) }));
            }
          }}
        />
      )}

      <Select
        data={AutomodChecksSelect}
        description="On which users the action should be executed."
        error={checkError}
        label="Check"
        mt={5}
        onChange={(value: any) => {
          setForm({
            ...form,
            check: value ?? undefined,
            days: [ActionCheckKind.AccountAge, ActionCheckKind.JoinDate].includes(value) ? 7 : undefined,
          });
        }}
        onFocus={() => setCheckError(null)}
        placeholder="Select check..."
        value={form.check?.toString()}
      />

      {TIME_CHECKS.includes(form.check!) && (
        <NumberInput
          description={
            form.check === ActionCheckKind.JoinDate
              ? "How long the user must be on the sever"
              : "How old the account must be."
          }
          label="Check time"
          max={1000}
          min={0}
          mt={5}
          onChange={(days) => {
            const value = parseNumberInput(days);
            if (isNaN(value)) return;

            setForm({ ...form, days: value });
          }}
          value={form.days}
        />
      )}

      <Group justify="right" mt="md">
        <Button
          color="green"
          leftSection={<IconDatabasePlus />}
          onClick={() => {
            if (!form.punishment) {
              setActionError("An action must be selected.");
              return;
            }

            if (punishments.some((a) => a.check == form.check)) {
              setCheckError("There cannot be duplicate checks.");
              return;
            }

            setPunishments([toAutomoderationAction(form), ...punishments]);

            setForm({ punishment: null });
            setCheckError(null);
            setActionError(null);
            setOpen(false);
          }}
          variant="outline"
        >
          Add action
        </Button>
      </Group>
    </>
  );
}

export default AddPunishmentForm;

function toAutomoderationAction(value: FormValues) {
  const action: Punishment = {} as any;

  if ([ActionPunishmentKind.TempMute, ActionPunishmentKind.TempBan].includes(value.punishment!)) {
    action.punishment = { [value.punishment!]: { duration: value.duration } };
  }

  if (value.punishment === ActionPunishmentKind.Point) {
    action.punishment = { [value.punishment!]: { points: value.points!, expires_in: value.expires! } };
  }

  if ([ActionPunishmentKind.Ban, ActionPunishmentKind.Kick, ActionPunishmentKind.Delete].includes(value.punishment!)) {
    action.punishment = value.punishment!;
  }

  if ([ActionCheckKind.NoRole, ActionCheckKind.NoAvatar].includes(value.check!)) {
    action.check = value.check;
  }

  if ([ActionCheckKind.AccountAge, ActionCheckKind.JoinDate].includes(value.check!)) {
    // @ts-ignore
    action.check = { [value.check!]: { time: value.days } };
  }

  return action;
}
