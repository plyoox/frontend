import { GuildStoreContext } from "@/stores/guild-store";
import { IconAt, IconHash } from "@tabler/icons-react";
import { LevelingResponse } from "@/types/responses";
import { Select } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import MultiChannelSelect from "@/components/selects/multi-channel-select";

function ExemptLevelObjects({
  config,
  handleChange,
}: {
  config: LevelingResponse;
  handleChange: (config: Partial<LevelingResponse>) => void;
}) {
  const guildStore = useContext(GuildStoreContext);

  return (
    <>
      <Select
        clearable
        searchable
        data={guildStore.rolesAsSelectable}
        description="Users with this role will not receive any xp."
        label="No xp role"
        leftSection={<IconAt size={16} />}
        onChange={(value) => handleChange({ exempt_role: value })}
        placeholder="Select role to exempt"
        value={config.exempt_role}
      />

      <MultiChannelSelect
        data={guildStore.textWithCategories}
        description="Messages sent in these channels will not gain xp."
        label="No xp channels"
        leftSection={<IconHash size={16} />}
        onChange={(value) => handleChange({ exempt_channels: value })}
        placeholder="Select channels to exempt"
        value={config?.exempt_channels}
      />
    </>
  );
}

export default observer(ExemptLevelObjects);
