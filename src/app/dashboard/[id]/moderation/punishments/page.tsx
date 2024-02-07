import { ACTION_PERMISSIONS } from "@/lib/defaults";
import PunishmentContainer from "@/components/dashboard/punishments/punishment-container";
import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";

function Page() {
  return (
    <div>
      <h1 className={"text-2xl font-semibold"}>Command Punishments</h1>

      <RequiredPermissionAlert permissions={ACTION_PERMISSIONS} />

      <PunishmentContainer />
    </div>
  );
}

export default Page;
