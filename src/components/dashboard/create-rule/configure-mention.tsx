import type { CreateAutoModerationRule } from "@/types/moderation";
import type { UseRef } from "@/types/react";
import { NumberInput } from "@mantine/core";

function ConfigureMention({ rule }: { rule: UseRef<Partial<CreateAutoModerationRule>> }) {
  return (
    <NumberInput
      allowDecimal={false}
      allowNegative={false}
      defaultValue={rule.current.mention_total_limit || 5}
      description="The maximum amount of mentions allowed in a single message."
      label="Mention limit"
      max={50}
      min={1}
      onChange={(v) => {
        if (typeof v === "string") {
          return;
        }

        rule.current.mention_total_limit = v;
      }}
      placeholder="5"
    />
  );
}

export default ConfigureMention;
