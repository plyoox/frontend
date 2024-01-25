import { GuildStoreContext } from "@/stores/guild-store";
import { IconAt } from "@tabler/icons-react";
import { MultiSelect } from "@mantine/core";
import { useContext } from "react";
import type { ModerationConfig } from "@/types/moderation";

function LegacyRuleSettings({
  config,
  handleChange,
}: {
  config: ModerationConfig;
  handleChange: (value: Partial<ModerationConfig>) => void;
}) {
  const guildStore = useContext(GuildStoreContext);

  return (
    <MultiSelect
      clearable
      searchable
      data={guildStore.rolesAsSelectable}
      description="These roles will be ignored by the automod. Moderation roles are already ignored."
      label="Ignored roles"
      leftSection={<IconAt size={16} />}
      maxValues={25}
      mt={5}
      nothingFoundMessage="This guild has no available roles."
      onChange={(value) => handleChange({ ignored_roles: value })}
      placeholder="Select roles..."
      value={config.ignored_roles}
    />
  );
}

export default LegacyRuleSettings;
