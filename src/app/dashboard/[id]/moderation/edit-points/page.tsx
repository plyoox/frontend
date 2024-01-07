import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import EditPointsContainer from "@/components/dashboard/edit-points/edit-points-container";

function Page() {
  return (
    <div>
      <h1 className={"text-2xl font-semibold"}>Point punishments</h1>
      <Alert icon={<IconInfoCircle />} mb={10} variant="light">
        Decide what happens when a user reaches the maximum amount of 10 points. After being punished, the points will
        be reset to 0.
        <br />
        Points can be added by punishments or manually by moderators.
      </Alert>

      <EditPointsContainer />
    </div>
  );
}

export default Page;
