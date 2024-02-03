import { ACTION_PERMISSIONS } from "@/lib/defaults";
import { DiscordPermission } from "@/discord/enums";
import EditRuleContainer from "@/components/dashboard/rules/edit-rule-container";
import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";

const PERMISSION = [...ACTION_PERMISSIONS, DiscordPermission.ManageServer];

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Edit rule actions</h1>

      <RequiredPermissionAlert permissions={PERMISSION} />
      <EditRuleContainer />
    </>
  );
}

export default Page;
