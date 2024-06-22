import InfoHeading from "@/components/dashboard/info-heading";
import DurationPicker from "@/components/duration-picker";
import { ActionCheckKind, ActionPunishmentKind } from "@/lib/enums";
import {
  DURATION_PUNISHMENTS,
  DiscordRulePunishmentItems,
  PointPunishmentItems,
  PunishmentCheckItems,
  TIME_CHECKS,
  TIME_MARKS,
} from "@/lib/select-values";
import { toAutomoderationAction } from "@/lib/utils";
import type { Action, PunishmentValues } from "@/types/moderation";
import { Button, NumberInput, Select, Slider } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ContextModalProps } from "@mantine/modals";
import { IconDatabasePlus } from "@tabler/icons-react";

function AddActionModal({
  innerProps,
  context,
  id,
}: ContextModalProps<{
  isFinal: boolean;
  onSubmit: (action: Action) => void;
}>) {
  const form = useForm<PunishmentValues>({
    initialValues: {
      check: null,
      checkTime: 86400, // 3 days
      punishment: ActionPunishmentKind.Kick,
      points: 3,
      pointExpiration: null, // 14 days
      punishmentDuration: 5, // 6 hours
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        innerProps.onSubmit(toAutomoderationAction(values));

        form.reset();

        context.closeModal(id);
      })}
    >
      <Select
        data={innerProps.isFinal ? PointPunishmentItems : DiscordRulePunishmentItems}
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

      {/* biome-ignore lint/style/noNonNullAssertion: Must always be entry from 'TIME_CHECKS' */}
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

      <div className={"mt-4 flex justify-end gap-2"}>
        <Button
          onClick={() => {
            context.closeModal(id);
          }}
          type={"button"}
          variant={"default"}
        >
          Cancel
        </Button>

        <Button color="plyoox" leftSection={<IconDatabasePlus />} type={"submit"} variant={"filled"}>
          Add Action
        </Button>
      </div>
    </form>
  );
}

export default AddActionModal;
