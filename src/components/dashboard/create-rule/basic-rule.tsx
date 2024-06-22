import RuleTypeSelect from "@/components/dashboard/create-rule/select-rule-type";
import type { CreateAutoModerationRule } from "@/types/moderation";
import type { UseState } from "@/types/react";
import { Button, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconChevronRight, IconX } from "@tabler/icons-react";
import { useEffect } from "react";

interface Props {
  setStep: UseState<number>;
  setRule: UseState<Partial<CreateAutoModerationRule>>;
  rule: Partial<CreateAutoModerationRule>;
}

interface PartialRule {
  name: string;
  enabled: boolean;
  kind: string;
}

function BasicRule({ setStep, setRule, rule }: Props) {
  const form = useForm<PartialRule>({
    initialValues: {
      enabled: false,
      name: "",
      kind: "1",
    },
    validate: {
      name: (value) => {
        return (
          (value.trim().length > 100 || value.trim().length === 0) &&
          "Rule name must be between 1 and 100 characters long"
        );
      },
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: Form never changes
  useEffect(() => {
    form.setValues({
      enabled: rule.enabled ?? false,
      name: rule.name ?? "",
      kind: rule.trigger_type?.toString() ?? "1",
    });
  }, [rule]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setRule((r) => ({
          ...r,
          enabled: values.enabled,
          name: values.name,
          trigger_type: Number.parseInt(values.kind),
        }));

        setStep(1);
      })}
    >
      <TextInput
        withAsterisk
        description="The rule name displayed in discord"
        label="Rule name"
        placeholder="Operation: Zero Dawn"
        {...form.getInputProps("name")}
      />

      <Switch
        checked={form.values.enabled}
        color="teal"
        label="Rule enabled"
        mt={20}
        size="md"
        thumbIcon={
          form.values.enabled ? (
            <IconCheck color={"green"} size="0.8rem" stroke={3} />
          ) : (
            <IconX color={"red"} size="0.8rem" stroke={3} />
          )
        }
        {...form.getInputProps("enabled")}
      />

      <RuleTypeSelect onChange={(val) => form.setFieldValue("kind", val)} value={form.values.kind} />

      <div className={"flex justify-end"}>
        <Button rightSection={<IconChevronRight />} type="submit" variant="light">
          Next
        </Button>
      </div>
    </form>
  );
}

export default BasicRule;
