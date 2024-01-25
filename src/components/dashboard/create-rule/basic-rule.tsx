import { Button, Switch, TextInput } from "@mantine/core";
import { CreateAutoModerationRule } from "@/types/moderation";
import { IconCheck, IconChevronRight, IconX } from "@tabler/icons-react";
import { UseState } from "@/types/react";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import RuleTypeSelect from "@/components/dashboard/create-rule/select-rule-type";

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

  useEffect(() => {
    form.setValues({
      enabled: rule.enabled ?? false,
      name: rule.name ?? "",
      kind: rule.trigger_type?.toString() ?? "1",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rule]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setRule((r) => ({
          ...r,
          enabled: values.enabled,
          name: values.name,
          trigger_type: parseInt(values.kind),
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
