import { CategoryChannel, Guild, Role, TextChannel, VoiceChannel } from "@/discord/types";
import { HelperPermission } from "@/config/enums";
import { LevelRole } from "@/types/leveling";
import { LoggingConfig, LoggingSetting } from "@/types/logging";
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

export interface LevelingResponse {
  active: boolean;
  message: string;
  channel: string | null;
  roles: LevelRole[];
  exempt_role: string | null;
  exempt_channels: string[];
  remove_roles: boolean;
  booster_xp_multiplier: number | null;
}

export interface LoggingResponse {
  config: LoggingConfig;
  settings: LoggingSetting[];
}

export interface SettingsResponse {
  helper_permission: HelperPermission | null;
}
