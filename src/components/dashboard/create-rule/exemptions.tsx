import { GuildStoreContext } from "@/stores/guild-store";
import type { CreateAutoModerationRule } from "@/types/moderation";
import type { UseState } from "@/types/react";
import { Button, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useContext, useEffect, useRef } from "react";

interface Props {
  rule: Partial<CreateAutoModerationRule>;
  setRule: UseState<Partial<CreateAutoModerationRule>>;
  setStep: UseState<number>;
}

interface PartialRule {
  exemptRoles: string[];
  exemptChannels: string[];
}

function Exemptions({ rule, setRule, setStep }: Props) {
  const guildStore = useContext(GuildStoreContext);
  const nextPage = useRef(2);

  const form = useForm<PartialRule>({
    initialValues: {
      exemptChannels: [],
      exemptRoles: [],
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: Form never changes
  useEffect(() => {
    form.setValues({
      exemptRoles: rule.exempt_roles ?? [],
      exemptChannels: rule.exempt_channels ?? [],
    });
  }, [rule]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        setRule((r) => ({ ...r, exempt_roles: values.exemptRoles, exempt_channels: values.exemptChannels }));

        setStep(nextPage.current);
      })}
    >
      <MultiSelect
        clearable
        searchable
        data={guildStore.textAsSelectable}
        description="Channels that are not affected."
        label="Exempt channels"
        maxValues={50}
        placeholder="Select exemptions..."
        {...form.getInputProps("exemptChannels")}
      />

      <MultiSelect
        clearable
        searchable
        data={guildStore.rolesAsSelectable}
        description="Roles that are not affected by the rule. Roles that have administrator permission are automatically exempt."
        label="Exempt roles"
        maxValues={20}
        placeholder="Select exemptions..."
        {...form.getInputProps("exemptRoles")}
      />

      <div className={"mt-2.5 flex flex-row-reverse gap-2"}>
        <Button rightSection={<IconChevronRight />} type="submit" variant="subtle">
          Next
        </Button>

        <Button
          leftSection={<IconChevronLeft />}
          onClick={() => {
            nextPage.current = 0;
          }}
          type="submit"
          variant="subtle"
        >
          Back
        </Button>
      </div>
    </form>
  );
}

export default Exemptions;
