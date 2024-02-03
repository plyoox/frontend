import { ACTION_PERMISSIONS } from "@/lib/defaults";
import { DiscordPermission } from "@/discord/enums";
import ModerationSettings from "@/components/dashboard/moderation/moderation-settings";
import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";

const PERMISSION = [...ACTION_PERMISSIONS, DiscordPermission.ManageServer];

export const metadata = {
  title: "Moderation",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Moderation</h1>

      <RequiredPermissionAlert permissions={PERMISSION} />

      <ModerationSettings />
    </>
  );
}

export default Page;
