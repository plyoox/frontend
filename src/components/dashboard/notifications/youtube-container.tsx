import { Badge, ThemeIcon } from "@mantine/core";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconBrandYoutube } from "@tabler/icons-react";
import { amountToColor } from "@/lib/utils";
import { clsx } from "clsx";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useYoutubeNotifications } from "@/lib/hooks";
import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import RequestError from "@/components/dashboard/request-error";
import YoutubeNotificationList from "@/components/dashboard/notifications/youtube-notification-list";

function YoutubeContainer({ className }: { className?: string }) {
  const guildContext = useContext(GuildStoreContext);

  const { data, isLoading, error } = useYoutubeNotifications();

  if (error) {
    return <RequestError error={error} />;
  }

  if (isLoading || !data) {
    return <LoadingSkeleton />;
  }

  const limit = guildContext.premium ? PREMIUM_LIMITS.TWITCH_MAX_STREAMERS : DEFAULT_LIMITS.TWITCH_MAX_STREAMERS;

  return (
    <div className={clsx("rounded-md bg-mt-dark-7 p-2", className)}>
      <div className={"mb-2 flex items-center gap-2"}>
        <ThemeIcon color={"red"} radius={"md"} variant={"light"}>
          <IconBrandYoutube size={24} />
        </ThemeIcon>

        <h1 className={"text-xl"}>YouTube</h1>
      </div>

      <div className={"mt-3 flex justify-between"}>
        <h3 className={"font-semibold"}>Notifications</h3>

        <Badge gradient={amountToColor(data.length, limit)} variant={"gradient"}>
          {data.length}/{limit} Streams
        </Badge>
      </div>

      <YoutubeNotificationList disabled={data.length >= limit} notifications={data} />
    </div>
  );
}

export default observer(YoutubeContainer);
