import { DiscordPermission } from "@/discord/enums";
import LevelContainer from "@/components/dashboard/leveling/level-container";
import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";

const PERMISSION = [DiscordPermission.ManageRoles, DiscordPermission.SendMessages];

export const metadata = {
  title: "Leveling",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Leveling</h1>

      <RequiredPermissionAlert permissions={PERMISSION} />

      <LevelContainer />
    </>
  );
}

export default Page;
