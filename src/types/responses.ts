import { CategoryChannel, Guild, Role, TextChannel, VoiceChannel } from "@/discord/types";
import { ModerationConfig, ModerationRule } from "@/types/moderation";

export interface GuildDataResponse {
  text: TextChannel[];
  voice: VoiceChannel[];
  category: CategoryChannel[];
  infos: Guild;
  roles: Role[];
  premium: boolean;
}

export interface ModerationResponse {
  config: ModerationConfig;
  rules: ModerationRule[];
}

export interface WelcomeResponse {
  active: boolean;
  join_active: boolean;
  leave_active: boolean;
  join_message: string;
  leave_message: string;
  join_channel: string;
  leave_channel: string;
  join_roles: string[];
}
