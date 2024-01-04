import ModerationSettings from "@/components/dashboard/moderation/moderation-settings";
import WebhookInfoAlert from "@/components/dashboard/webhook-info-alert";

export const metadata = {
  title: "Moderation",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Moderation</h1>

      <WebhookInfoAlert identifier={"moderation"} />
      <ModerationSettings />
    </>
  );
}

export default Page;
