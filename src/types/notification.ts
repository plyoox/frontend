export interface TwitchNotification {
  guild_id: string;
  user: TwitchUserType;
  channel: string;
  message: string | null;
}

export interface YoutubeNotification {
  youtube_channel: string;
  channel: string;
  message: string | null;
  name: string;
  profile_image_url: string;
}

export interface TwitchUserType {
  login: string;
  display_name: string;
  profile_image_url: string;
  user_id: number;
}

export interface TwitchNotificationResponse {
  user: TwitchUserType | null;
  notifications: TwitchNotification[];
}

export interface AddYoutubeNotification {
  youtube_channel: string;
  name: string;
  profile_image_url: string;
  channel: string;
}

export type YoutubeNotificationResponse = YoutubeNotification[];
