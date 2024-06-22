import EditPointsContainer from "@/components/dashboard/edit-points/edit-points-container";
import RequiredPermissionAlert from "@/components/dashboard/required-permission-alert";
import { ACTION_PERMISSIONS } from "@/lib/defaults";

function Page() {
  return (
    <div>
      <h1 className={"text-2xl font-semibold"}>Point punishments</h1>

      <RequiredPermissionAlert permissions={ACTION_PERMISSIONS} />

      <EditPointsContainer />
    </div>
  );
}

export default Page;
