import LoadingSkeleton from "@/components/dashboard/loading-skeleton";
import YoutubeNotificationList from "@/components/dashboard/notifications/youtube-notification-list";
import RequestError from "@/components/dashboard/request-error";
import { useYoutubeNotifications } from "@/lib/hooks";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { amountToColor } from "@/lib/utils";
import { GuildStoreContext } from "@/stores/guild-store";
import { Badge, ThemeIcon } from "@mantine/core";
import { IconBrandYoutube } from "@tabler/icons-react";
import { clsx } from "clsx";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

function YoutubeContainer({ className }: { className?: string }) {
  const guildContext = useContext(GuildStoreContext);

  const { data, isLoading, error } = useYoutubeNotifications();

  if (error) {
    return <RequestError error={error} />;
  }

  if (isLoading || !data) {
    return <LoadingSkeleton />;
  }

  const limit = guildContext.premium ? PREMIUM_LIMITS.YOUTUBE_MAX_CHANNELS : DEFAULT_LIMITS.YOUTUBE_MAX_CHANNELS;

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
