import { GuildStoreContext } from "@/stores/guild-store";
import { IconAt, IconHash } from "@tabler/icons-react";
import { LevelingResponse } from "@/types/responses";
import { MultiSelect, Select } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

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
        description="Users with this role will not receive any xp"
        label="No xp role"
        leftSection={<IconAt size={16} />}
        onChange={(value) => handleChange({ no_xp_role: value })}
        placeholder="Select role..."
        value={config.no_xp_role}
      />

      <MultiSelect
        clearable
        multiple
        searchable
        data={guildStore.allAsSelectable}
        description="In this channels no one will receive any xp"
        label="No xp channels"
        leftSection={<IconHash size={16} />}
        onChange={(value) => handleChange({ no_xp_channels: value })}
        placeholder="Select channels..."
        value={config?.no_xp_channels}
      />
    </>
  );
}

export default observer(ExemptLevelObjects);
