import { Button, ComboboxItem, Select } from "@mantine/core";
import { GuildStoreContext } from "@/stores/guild-store";
import { LevelingResponse } from "@/types/responses";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";

function AddLevelRoleForm({
  className,
  config,
  onSubmit,
}: {
  className?: string;
  config: LevelingResponse;
  onSubmit: ({ role, level }: { role: string; level: number }) => void;
}) {
  const guildStore = useContext(GuildStoreContext);

  const form = useForm<{ role: string | null; level: string | null }>({
    initialValues: {
      role: null,
      level: null,
    },
  });

  const [availableLevels, setAvailableLevels] = useState<string[]>([]);

  const [availableRoles, setAvailableRoles] = useState<ComboboxItem[]>([]);

  useEffect(() => {
    setAvailableLevels(() => {
      const levels = Array.from(Array(101).keys()).map((l) => l.toString());
      levels.shift();

      config.roles.forEach(({ level }) => {
        const index = levels.indexOf(level.toString());
        levels.splice(index, 1);
      });

      return levels;
    });

    setAvailableRoles(() => {
      const roles = guildStore.manageableRolesAsSelectable;

      config.roles.forEach(({ role }) => {
        const index = roles.findIndex(({ value }) => value === role);
        roles.splice(index, 1);
      });

      return roles;
    });
  }, [config.roles, guildStore.manageableRolesAsSelectable]);

  return (
    <form
      className={className}
      onSubmit={form.onSubmit(({ role, level }) => {
        onSubmit({ level: parseInt(level!), role: role! });

        form.reset();
      })}
    >
      <Select
        required
        searchable
        data={availableRoles}
        label="Select role"
        {...form.getInputProps("role")}
        placeholder={"Select role..."}
      />
      <Select
        required
        searchable
        data={availableLevels}
        label="Select role"
        {...form.getInputProps("level")}
        placeholder={"Select level..."}
      />

      <div className={"mt-2.5 flex justify-end"}>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

export default observer(AddLevelRoleForm);
