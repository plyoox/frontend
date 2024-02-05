import {
  IconBrandTwitch,
  IconMessages,
  IconSettings,
  IconShieldChevron,
  IconUserPlus,
  IconUserUp,
} from "@tabler/icons-react";
import FullView from "@/components/dashboard/full-view";
import InfoBox from "@/components/dashboard/home/info-box";

function Page() {
  return (
    <div>
      <FullView />

      <h1 className={"text-2xl font-semibold"}>Available Settings</h1>

      <div className={"flex flex-wrap gap-2"}>
        <InfoBox icon={<IconSettings />} link={"settings"} title={"Settings"}>
          Manage the Helper access and your webhooks as well as view the server&apos;s audit log.
        </InfoBox>

        <InfoBox icon={<IconBrandTwitch />} link={"twitch"} title={"Notifications"}>
          Setup live notifications for streamers that the server should know about.
        </InfoBox>

        <InfoBox icon={<IconUserPlus />} link={"welcome"} title={"Welcome"}>
          Sent welcome and goodbye messages or assign roles to a user when a new user joined the server.
        </InfoBox>

        <InfoBox icon={<IconShieldChevron />} link={"moderation"} title={"Moderation"}>
          Setup powerful moderation and automoderation to keep the server clean and friendly.
        </InfoBox>

        <InfoBox icon={<IconMessages />} link={"logging"} title={"Logging"}>
          Setup logging for the server and always see what&apos;s going on.
        </InfoBox>

        <InfoBox icon={<IconUserUp />} link={"leveling"} title={"Leveling"}>
          Reward users for actively chatting, assign roles based on their level and promote server boosts.
        </InfoBox>
      </div>
    </div>
  );
}

export default Page;
