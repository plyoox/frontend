import SettingsContainer from "@/components/dashboard/settings/settings-container";
import WebhookContainer from "@/components/dashboard/settings/webhook-container";

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Settings</h1>
      <SettingsContainer />
      <WebhookContainer className={"mt-2"} />
    </>
  );
}

export default Page;
