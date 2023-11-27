import { Button, Switch, TextInput } from "@mantine/core";
import { CreateAutoModerationRule } from "@/types/moderation";
import { IconCheck, IconChevronRight, IconX } from "@tabler/icons-react";
import { UseState } from "@/types/react";
import { useRef, useState } from "react";
import RuleTypeSelect from "@/components/dashboard/create-rule/select-rule-type";

interface Props {
  setStep: UseState<number>;
  setRule: UseState<Partial<CreateAutoModerationRule>>;
  rule: Partial<CreateAutoModerationRule>;
}

function BasicRule({ setStep, setRule, rule }: Props) {
  const partialRule = useRef<Partial<CreateAutoModerationRule>>(rule);

  const [enabled, setEnabled] = useState<boolean>(rule.enabled ?? false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <TextInput
        withAsterisk
        defaultValue={rule.name ?? ""}
        description="The rule name displayed in discord"
        error={error}
        label="Rule name"
        maxLength={100}
        onChange={(el) => {
          if (el.target.value.trim().length > 100 || el.target.value.trim().length === 0) {
            setError("Rule name must be between 1 and 100 characters long");
            return;
          }

          error && setError(null);

          partialRule.current = { ...partialRule.current, name: el.target.value.trim() };
        }}
        placeholder="Operation: Zero Dawn"
      />

      <Switch
        color="teal"
        defaultChecked={enabled}
        label="Rule enabled"
        mt={20}
        onChange={(el) => {
          setEnabled(el.target.checked);
        }}
        size="md"
        thumbIcon={
          enabled ? (
            <IconCheck color={"green"} size="0.8rem" stroke={3} />
          ) : (
            <IconX color={"red"} size="0.8rem" stroke={3} />
          )
        }
      />

      <RuleTypeSelect rule={partialRule} />

      <div className={"flex justify-end"}>
        <Button
          onClick={() => {
            if (!partialRule.current.name) {
              setError("Rule name is required");
              return;
            }

            setRule((r) => ({
              ...r,
              enabled,
              name: partialRule.current.name,
              trigger_type: partialRule.current.trigger_type,
            }));

            setStep(1);
          }}
          rightSection={<IconChevronRight />}
          variant="subtle"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default BasicRule;
