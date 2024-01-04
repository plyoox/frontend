import LoggingContainer from "@/components/dashboard/logging/logging-container";
import WebhookInfoAlert from "@/components/dashboard/webhook-info-alert";

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Logging</h1>

      <WebhookInfoAlert identifier={"logging"} />
      <LoggingContainer />
    </>
  );
}

export default Page;
