import { Badge, Collapse, ThemeIcon } from "@mantine/core";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconPlus } from "@tabler/icons-react";
import { LevelingResponse } from "@/types/responses";
import { amountToColor } from "@/lib/utils";
import { useContext, useState } from "react";
import AddLevelRoleForm from "@/components/dashboard/leveling/add-level-role-form";

function AddLevelRoleButton({
  className,
  config,
  handleChange,
}: {
  className?: string;
  config: LevelingResponse;
  handleChange: (config: Partial<LevelingResponse>) => void;
}) {
  const guildStore = useContext(GuildStoreContext);
  const [open, setOpen] = useState(false);

  const limit = guildStore.premium ? PREMIUM_LIMITS.MAX_LEVEL_ROLES : DEFAULT_LIMITS.MAX_LEVEL_ROLES;

  return (
    <div className={className}>
      <button
        className={`flex h-[60px] w-full cursor-pointer items-center justify-between rounded-md bg-mt-dark-6 pl-2.5 pr-2
        disabled:cursor-not-allowed disabled:bg-mt-dark-7 disabled:hover:bg-mt-dark-7`}
        disabled={config.roles.length >= limit}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex items-center gap-3 font-semibold">
          <ThemeIcon color="green" size="md" variant="light">
            <IconPlus size={20} />
          </ThemeIcon>
          <span className="mt-0.5 ">Add level role</span>
        </div>
        <Badge gradient={amountToColor(config.roles.length, limit)} variant="gradient">
          {config.roles.length}/{limit} Roles
        </Badge>
      </button>

      <Collapse className="rounded-b" in={open}>
        <AddLevelRoleForm
          className="rounded-md bg-mt-dark-6 p-2"
          config={config}
          onSubmit={({ level, role }) => {
            handleChange({
              roles: [...config.roles, { level, role }],
            });
            setOpen(false);
          }}
        />
      </Collapse>
    </div>
  );
}

export default AddLevelRoleButton;
