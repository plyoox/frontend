import LevelRoleItem from "@/components/dashboard/leveling/level-role-item";
import type { LevelingResponse } from "@/types/responses";

function LevelRoleList({
  config,
  handleChange,
}: {
  config: LevelingResponse;
  handleChange: (config: Partial<LevelingResponse>) => void;
}) {
  return (
    <div>
      {config.roles.map((levelRole) => (
        <LevelRoleItem
          key={levelRole.role}
          levelRole={levelRole}
          onRemove={() => {
            const roles = config.roles.filter((r) => r.role !== levelRole.role);
            handleChange({ roles });
          }}
        />
      ))}
    </div>
  );
}

export default LevelRoleList;
