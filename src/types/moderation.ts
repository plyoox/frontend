import type { AutoModerationTriggerType } from "@/discord/enums";
import { ActionCheckKind, ActionPunishmentKind, type MarkdownActionEnum } from "@/lib/enums";
import type { MaybeWebhook } from "@/types/webhook";

export interface ModerationConfig<TAction = Action> {
  active: boolean;
  moderation_roles: string[];
  ignored_roles: string[];
  logging_channel: MaybeWebhook | null;
  notify_user: boolean;
  point_actions: TAction[];

  invite_active: boolean;
  invite_exempt_channels: string[];
  invite_exempt_roles: string[];
  invite_exempt_guilds: string[];
  invite_actions: TAction[];

  link_active: boolean;
  link_exempt_channels: string[];
  link_exempt_roles: string[];
  link_allow_list: string[];
  link_actions: TAction[];
  link_markdown_action: MarkdownActionEnum | null;
  link_is_whitelist: boolean;

  caps_active: boolean;
  caps_exempt_channels: string[];
  caps_exempt_roles: string[];
  caps_actions: TAction[];
}

export interface Action {
  id: string;
  punishment: PunishmentAction;
  check: PunishmentCheck;
}

export interface ActionWithoutId {
  punishment: PunishmentAction;
  check: PunishmentCheck;
}

export interface ModerationRule<TAction = Action> {
  guild_id: string;
  rule_id: string;
  reason: string | null;
  actions: TAction[];
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
  actions: Action[];
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

export interface PunishmentType {
  id: number;
  guild_id: string;
  enabled: boolean;
  name: string;
  reason: string | null;
  actions: Action[];
}

export interface UpsertPunishment {
  id?: number;
  guild_id?: string;
  enabled: boolean;
  name: string;
  reason: string | null;
  actions: Action[];
}

export interface PunishmentValues {
  punishment: ActionPunishmentKind;
  punishmentDuration: number;
  check: ActionCheckKind | null;
  checkTime: number;
  points: number;
  pointExpiration: number | null;
}
