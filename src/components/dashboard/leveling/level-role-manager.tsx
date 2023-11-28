import { LevelingResponse } from "@/types/responses";
import AddLevelRoleButton from "@/components/dashboard/leveling/add-level-role-button";
import LevelRoleList from "@/components/dashboard/leveling/level-role-list";

function LevelRoleManager({
  config,
  handleChange,
}: {
  config: LevelingResponse;
  handleChange: (config: Partial<LevelingResponse>) => void;
}) {
  return (
    <>
      <LevelRoleList config={config} handleChange={handleChange} />
      <AddLevelRoleButton config={config} handleChange={handleChange} />
    </>
  );
}

export default LevelRoleManager;
