import type { CategoryChannel, Guild, Role, TextChannel, VoiceChannel } from "@/discord/types";
import type { HelperPermission } from "@/lib/enums";
import type { LevelRole } from "@/types/leveling";
import type { LoggingConfig, LoggingSetting } from "@/types/logging";
import type { Action, ModerationConfig, ModerationRule } from "@/types/moderation";
import type { AuditLogEntry, SimpleUser } from "@/types/settings";

export interface GuildDataResponse {
  text: TextChannel[];
  voice: VoiceChannel[];
  category: CategoryChannel[];
  infos: Guild;
  roles: Role[];
  premium: boolean;
}

export interface ModerationResponse<TAction = Action> {
  config: ModerationConfig<TAction>;
  rules: ModerationRule<TAction>[];
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

export interface AuditLogResponse {
  users: SimpleUser[];
  audit_logs: AuditLogEntry[];
}

export interface ErrorResponse {
  message: string;
  code: string;
  data: unknown;
}
