import { ActionCheckKind, ActionPunishmentKind } from "@/config/enums";
import { Button, NumberInput, Select, Slider } from "@mantine/core";
import {
  DURATION_PUNISHMENTS,
  DiscordRulePunishmentItems,
  PointPunishmentItems,
  PunishmentCheckItems,
  TIME_CHECKS,
  TIME_MARKS,
} from "@/config/select-values";
import { IconDatabasePlus } from "@tabler/icons-react";
import { Punishment } from "@/types/moderation";
import { UseState } from "@/types/react";
import { useForm } from "@mantine/form";
import DurationPicker from "@/components/duration-picker";
import InfoHeading from "@/components/dashboard/info-heading";

interface Props {
  className?: string;
  setPunishments: UseState<Punishment[]>;
  punishments: Punishment[];
  setOpen: UseState<boolean>;
  isFinal?: boolean;
}

function AddActionForm({ setPunishments, setOpen, punishments, isFinal, className }: Props) {
  const form = useForm<PunishmentValues>({
    initialValues: {
      check: null,
      checkTime: 86400, // 3 days
      punishment: ActionPunishmentKind.Kick,
      points: 3,
      pointExpiration: 1209600, // 14 days
      punishmentDuration: 5, // 6 hours
    },
  });

  return (
    <form
      className={className}
      onSubmit={form.onSubmit((values) => {
        const pointExpiration = TIME_MARKS.find((t) => t.value === values.punishmentDuration)!.seconds;

        setPunishments([...punishments, toAutomoderationAction({ ...values, pointExpiration })]);

        setOpen(false);
        form.reset();
      })}
    >
      <Select
        data={isFinal ? PointPunishmentItems : DiscordRulePunishmentItems}
        description="What should happen when something is detected."
        label="Action"
        {...form.getInputProps("punishment")}
      />

      {DURATION_PUNISHMENTS.includes(form.values.punishment) && (
        <div className={"mt-2.5"}>
          <InfoHeading
            description={`How long should the user be ${
              form.values.punishment === ActionPunishmentKind.TempMute ? "muted" : "banned"
            }.`}
            label="Duration"
          />
          <Slider
            label={null}
            marks={TIME_MARKS}
            max={11}
            mb={15}
            mx={10}
            step={1}
            {...form.getInputProps("punishmentDuration")}
          />
        </div>
      )}

      {form.values.punishment === ActionPunishmentKind.Point && (
        <NumberInput
          allowDecimal={false}
          description="How many points the user should get."
          label="Points"
          max={9}
          min={1}
          mt={5}
          {...form.getInputProps("points")}
        />
      )}

      {form.values.punishment === ActionPunishmentKind.Point && (
        <DurationPicker
          allowDecimal={false}
          defaultUnit={"Days"}
          description={"When the points should expire. Limit is 1 year."}
          hideControls={true}
          label={"Expiration"}
          max={31449600}
          min={300}
          {...form.getInputProps("pointExpiration")}
        />
      )}

      <Select
        data={PunishmentCheckItems}
        description="On which users the action should be executed."
        label="Check"
        mt={5}
        placeholder="Select check..."
        {...form.getInputProps("check")}
      />

      {TIME_CHECKS.includes(form.values.check!) && (
        <DurationPicker
          allowDecimal={false}
          defaultUnit={"Days"}
          description={
            form.values.check === ActionCheckKind.JoinDate
              ? "How long the user must be on the sever"
              : "How old the account must be."
          }
          hideControls={true}
          label={"Check time"}
          max={31449600}
          min={300}
          {...form.getInputProps("checkTime")}
        />
      )}

      <div className={"mt-4 flex justify-end"}>
        <Button color="green" leftSection={<IconDatabasePlus />} type={"submit"} variant="outline">
          Add action
        </Button>
      </div>
    </form>
  );
}

export default AddActionForm;

function toAutomoderationAction(value: PunishmentValues) {
  const punishment: Punishment = {} as any;

  const duration = TIME_MARKS.find((t) => t.value === value.punishmentDuration)!.seconds;

  switch (value.punishment) {
    case ActionPunishmentKind.TempMute:
      punishment.punishment = { [value.punishment]: { duration } };
      break;
    case ActionPunishmentKind.TempBan:
      punishment.punishment = { [value.punishment]: { duration } };
      break;
    case ActionPunishmentKind.Point:
      punishment.punishment = { [value.punishment]: { points: value.points, expires_in: value.pointExpiration } };
      break;
    case ActionPunishmentKind.Ban:
    case ActionPunishmentKind.Kick:
    case ActionPunishmentKind.Delete:
      punishment.punishment = value.punishment;
      break;
  }

  switch (value.check) {
    case ActionCheckKind.NoRole:
      punishment.check = value.check;
      break;
    case ActionCheckKind.NoAvatar:
      punishment.check = value.check;
      break;
    case ActionCheckKind.AccountAge:
      punishment.check = { [value.check]: { time: value.checkTime } };
      break;
    case ActionCheckKind.JoinDate:
      punishment.check = { [value.check]: { time: value.checkTime } };
      break;
    case null:
      punishment.check = null;
      break;
  }

  return punishment;
}

interface PunishmentValues {
  punishment: ActionPunishmentKind;
  punishmentDuration: number;
  check: ActionCheckKind | null;
  checkTime: number;
  points: number;
  pointExpiration: number;
}
