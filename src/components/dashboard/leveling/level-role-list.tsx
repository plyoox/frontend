import { LevelingResponse } from "@/types/responses";
import LevelRoleItem from "@/components/dashboard/leveling/level-role-item";

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
