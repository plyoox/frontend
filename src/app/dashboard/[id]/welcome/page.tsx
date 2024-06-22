import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";
import WelcomeContainer from "@/components/dashboard/welcome/welcome-container";
import { DiscordPermission } from "@/discord/enums";

const PERMISSION = [DiscordPermission.ManageRoles, DiscordPermission.SendMessages];

export const metadata = {
  title: "Moderation",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Welcome</h1>
      <RequiredPermissionAlert permissions={PERMISSION} />
      <WelcomeContainer />
    </>
  );
}

export default Page;
