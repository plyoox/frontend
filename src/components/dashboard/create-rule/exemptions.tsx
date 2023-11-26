import { Button, MultiSelect } from "@mantine/core";
import { CreateAutoModerationRule } from "@/types/moderation";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { UseState } from "@/types/react";
import { useContext, useMemo, useState } from "react";

interface Props {
  rule: Partial<CreateAutoModerationRule>;
  setRule: UseState<Partial<CreateAutoModerationRule>>;
  setStep: UseState<number>;
}

function Exemptions({ rule, setRule, setStep }: Props) {
  const guildStore = useContext(GuildStoreContext);

  const channels = useMemo(() => guildStore.textAsSelectable, [guildStore.textAsSelectable]);
  const roles = useMemo(() => guildStore.rolesAsSelectable, [guildStore.rolesAsSelectable]);

  const [exemptChannels, setExemptChannels] = useState<string[]>(rule.exempt_channels ?? []);
  const [exemptRoles, setExemptRoles] = useState<string[]>(rule.exempt_roles ?? []);

  return (
    <div>
      <MultiSelect
        clearable
        searchable
        data={channels}
        description="Channels that are not affected."
        label="Exempt channels"
        max={50}
        onChange={setExemptChannels}
        placeholder="Select exemptions..."
        value={exemptChannels}
      />
      <MultiSelect
        clearable
        searchable
        data={roles}
        description="Roles that are not affected by the rule. Roles that have administrator permission are automatically exempt."
        label="Exempt roles"
        max={20}
        onChange={setExemptRoles}
        placeholder="Select exemptions..."
        value={exemptRoles}
      />

      <div className={"mt-2.5 flex justify-end gap-2"}>
        <Button
          color="teal"
          onClick={() => {
            setRule((r) => ({
              ...r,
              exempt_roles: exemptRoles,
              exempt_channels: exemptChannels,
            }));

            setStep(0);
          }}
          rightSection={<IconChevronLeft />}
          variant="outline"
        >
          Back
        </Button>
        <Button
          color="teal"
          onClick={() => {
            setRule((r) => ({
              ...r,
              exempt_roles: exemptRoles,
              exempt_channels: exemptChannels,
            }));

            setStep(2);
          }}
          rightSection={<IconChevronRight />}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Exemptions;
