import { LoadingOverlay } from "@mantine/core";
import { Suspense } from "react";
import ModerationSettings from "@/components/dashboard/moderation/moderation-settings";

export const metadata = {
  title: "Moderation",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Moderation</h1>
      <Suspense fallback={<LoadingOverlay />}>
        <ModerationSettings />
      </Suspense>
    </>
  );
}

export default Page;
