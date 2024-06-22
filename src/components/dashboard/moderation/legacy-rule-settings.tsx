import { MultiRoleSelect } from "@/components/selects";
import { GuildStoreContext } from "@/stores/guild-store";
import type { ModerationConfig } from "@/types/moderation";
import { useContext } from "react";

function LegacyRuleSettings({
  config,
  handleChange,
}: {
  config: ModerationConfig;
  handleChange: (value: Partial<ModerationConfig>) => void;
}) {
  const guildStore = useContext(GuildStoreContext);

  return (
    <MultiRoleSelect
      data={guildStore.rolesAsSelectable}
      description="These roles will be ignored by the automod. Moderation roles are already ignored."
      label="Ignored roles"
      maxValues={25}
      onChange={(value) => handleChange({ ignored_roles: value })}
      placeholder="Select ignored roles..."
      value={config.ignored_roles}
    />
  );
}

export default LegacyRuleSettings;
