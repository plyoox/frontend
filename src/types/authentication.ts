export interface AuthGuild {
  icon: string | null;
  name: string;
  id: string;
}

export interface AuthUser {
  id: string;
  username: string;
  avatar: string | null;
  locale?: string;
  display_name?: string;
}
