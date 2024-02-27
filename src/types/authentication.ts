export interface AuthUser {
  id: string;
  username: string;
  avatar: string | null;
  locale?: string;
  display_name?: string;
  premium: boolean;
}
