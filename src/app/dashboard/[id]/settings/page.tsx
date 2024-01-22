import SettingsContainer from "@/components/dashboard/settings/settings-container";
import SettingsTabs from "@/components/dashboard/settings/settings-tabs";

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Settings</h1>
      <SettingsContainer />
      <SettingsTabs className={"mt-5"} />
    </>
  );
}

export default Page;
