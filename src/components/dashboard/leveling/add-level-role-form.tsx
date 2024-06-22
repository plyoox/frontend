import { GuildStoreContext } from "@/stores/guild-store";
import type { LevelingResponse } from "@/types/responses";
import { Button, type ComboboxItem, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

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

      for (const { level } of config.roles) {
        const index = levels.indexOf(level.toString());
        levels.splice(index, 1);
      }

      return levels;
    });

    setAvailableRoles(() => {
      const roles = guildStore.manageableRolesAsSelectable;

      for (const { role } of config.roles) {
        const index = roles.findIndex(({ value }) => value === role);
        roles.splice(index, 1);
      }

      return roles;
    });
  }, [config.roles, guildStore.manageableRolesAsSelectable]);

  return (
    <form
      className={className}
      onSubmit={form.onSubmit(({ role, level }) => {
        if (!role || !level) {
          return;
        }

        onSubmit({ level: Number.parseInt(level), role: role });

        form.reset();
      })}
    >
      <Select
        required
        searchable
        data={availableRoles}
        description={"The role that should be added for a reaching the level."}
        label="Select role"
        nothingFoundMessage={"No roles available"}
        {...form.getInputProps("role")}
        placeholder={"Select role to assign"}
      />
      <Select
        required
        searchable
        data={availableLevels}
        description={"The level, when the role should be added."}
        label="Select level"
        {...form.getInputProps("level")}
        placeholder={"Select when to assign"}
      />

      <div className={"mt-2.5 flex justify-end"}>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

export default observer(AddLevelRoleForm);
