export interface TwitchNotification {
  guild_id: string;
  user: TwitchUser;
  channel: string | null;
  message: string | null;
}

export interface TwitchUser {
  login: string;
  display_name: string;
  profile_image_url: string;
  user_id: number;
}

export interface TwitchNotificationResponse {
  user: TwitchUser | null;
  notifications: TwitchNotification[];
}

export interface YoutubeNotificationResponse {
  user: TwitchUser | null;
  notifications: TwitchNotification[];
}
