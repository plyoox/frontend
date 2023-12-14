import { ActionCheckKind, ActionPunishmentKind } from "@/config/enums";
import { AutoModerationTriggerType } from "@/discord/enums";

export interface ModerationConfig {
  active: boolean;
  moderation_roles: string[];
  ignored_roles: string[];
  log_channel: string | null;
  notify_user: boolean;
  point_actions: Punishment[];

  invite_active: boolean;
  invite_exempt_channels: string[];
  invite_exempt_roles: string[];
  invite_exempt_guilds: string[];
  invite_actions: Punishment[];

  link_active: boolean;
  link_exempt_channels: string[];
  link_exempt_roles: string[];
  link_allow_list: string[];
  link_actions: Punishment[];
  link_is_whitelist: boolean;

  caps_active: boolean;
  caps_exempt_channels: string[];
  caps_exempt_roles: string[];
  caps_actions: Punishment[];
}

export interface Punishment {
  punishment: PunishmentAction;
  check: PunishmentCheck;
}

export interface ModerationRule {
  guild_id: string;
  rule_id: string;
  reason: string | null;
  actions: Punishment[];
}

export interface TempActionValue {
  duration: number;
}

export interface PointAction {
  [ActionPunishmentKind.Point]: { points: number; expires_in: number | null };
}

export interface AccountAgeCheck {
  [ActionCheckKind.AccountAge]: { time: number };
}

export interface JoinDateCheck {
  [ActionCheckKind.JoinDate]: { time: number };
}

type PunishmentAction =
  | { [ActionPunishmentKind.TempBan]: TempActionValue }
  | { [ActionPunishmentKind.TempMute]: TempActionValue }
  | PointAction
  | ActionPunishmentKind.Ban
  | ActionPunishmentKind.Kick
  | ActionPunishmentKind.Delete;

type PunishmentCheck = AccountAgeCheck | JoinDateCheck | ActionCheckKind.NoAvatar | ActionCheckKind.NoRole | null;

export interface RuleMigration {
  enabled: boolean;
  type: "invite" | "link-wl" | "link-bl";
  actions: Punishment[];
  exemptRoles: string[];
  exemptChannels: string[];
  keywordFilter?: string[];
  allowList?: string[];
}

export interface CreateAutoModerationRule {
  legacy?: string;
  name: string;
  enabled: boolean;
  trigger_type: AutoModerationTriggerType;
  exempt_roles: string[];
  exempt_channels: string[];
  mention_total_limit: number;
  keyword_filter: string[];
  regex_patterns: string[];
  allow_list: string[];
}
