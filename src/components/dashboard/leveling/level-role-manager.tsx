import { DiscordPermission } from "@/discord/enums";
import { LevelingResponse } from "@/types/responses";
import AddLevelRoleButton from "@/components/dashboard/leveling/add-level-role-button";
import CustomSwitch from "@/components/custom-switch";
import LevelRoleList from "@/components/dashboard/leveling/level-role-list";
import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";

const PERMISSIONS: bigint[] = [DiscordPermission.ManageRoles, DiscordPermission.SendMessages];

function LevelRoleManager({
  config,
  handleChange,
}: {
  config: LevelingResponse;
  handleChange: (config: Partial<LevelingResponse>) => void;
}) {
  return (
    <>
      <RequiredPermissionAlert permissions={PERMISSIONS} />

      <CustomSwitch
        checked={config.remove_roles}
        className={"my-2"}
        label={"Remove roles on level up"}
        labelPosition={"left"}
        onChange={(checked) => {
          handleChange({ remove_roles: checked });
        }}
      />
      <LevelRoleList config={config} handleChange={handleChange} />
      <AddLevelRoleButton config={config} handleChange={handleChange} />
    </>
  );
}

export default LevelRoleManager;
