import { ActionCheckKind, ActionPunishmentKind, HelperPermission } from "@/config/enums";
import { ComboboxItem } from "@mantine/core";

export const TIME_CHECKS = [ActionCheckKind.JoinDate, ActionCheckKind.AccountAge];
export const DURATION_PUNISHMENTS = [ActionPunishmentKind.TempBan, ActionPunishmentKind.TempMute];

export const LegacyPunishmentItems: ComboboxItem[] = [
  { label: "Kick", value: ActionPunishmentKind.Kick },
  { label: "Ban", value: ActionPunishmentKind.Ban },
  { label: "Delete message", value: ActionPunishmentKind.Delete },
  { label: "Temporary mute", value: ActionPunishmentKind.TempMute },
  { label: "Temporary ban", value: ActionPunishmentKind.TempBan },
  { label: "Add points", value: ActionPunishmentKind.Point },
];

export const DiscordRulePunishmentItems: ComboboxItem[] = [
  { label: "Kick", value: ActionPunishmentKind.Kick },
  { label: "Ban", value: ActionPunishmentKind.Ban },
  { label: "Temporary mute", value: ActionPunishmentKind.TempMute },
  { label: "Temporary ban", value: ActionPunishmentKind.TempBan },
  { label: "Add points", value: ActionPunishmentKind.Point },
];

export const PointPunishmentItems: ComboboxItem[] = [
  { label: "Kick", value: ActionPunishmentKind.Kick },
  { label: "Ban", value: ActionPunishmentKind.Ban },
  { label: "Temporary mute", value: ActionPunishmentKind.TempMute },
  { label: "Temporary ban", value: ActionPunishmentKind.TempBan },
];

export const PunishmentCheckItems: ComboboxItem[] = [
  { label: "Everyone", value: "" },
  { label: "Users with no role", value: ActionCheckKind.NoRole },
  { label: "Users with no avatar", value: ActionCheckKind.NoAvatar },
  { label: "Accounts younger than", value: ActionCheckKind.AccountAge },
  { label: "Joined the server before", value: ActionCheckKind.JoinDate },
];

export const TIME_MARKS = [
  { label: "5 min", seconds: 300, value: 0 },
  { label: "10 min", seconds: 600, value: 1 },
  { label: "30 min", seconds: 1800, value: 2 },
  { label: "1h", seconds: 3600, value: 3 },
  { label: "3h", seconds: 10800, value: 4 },
  { label: "6h", seconds: 21600, value: 5 },
  { label: "12h", seconds: 43200, value: 6 },
  { label: "1d", seconds: 86400, value: 7 },
  { label: "2d", seconds: 172800, value: 8 },
  { label: "3d", seconds: 259200, value: 9 },
  { label: "1w", seconds: 604800, value: 10 },
  { label: "2w", seconds: 1209600, value: 11 },
  { label: "28d", seconds: 2419200, value: 12 },
];

export const POINT_EXPIRATION_ITEMS: ComboboxItem[] = [
  { label: "Never", value: "never" },
  { label: "6 hours", value: "3600" },
  { label: "12 hours", value: "7200" },
  { label: "1 days", value: "86400" },
  { label: "3 days", value: "259200" },
  { label: "1 weeks", value: "604800" },
  { label: "2 weeks", value: "1209600" },
  { label: "1 month", value: "2419200" },
  { label: "3 months", value: "7889400" },
  { label: "6 months", value: "14515200" },
  { label: "1 year", value: "29030400" },
];

export const HELPER_PERMISSION_ITEMS: ComboboxItem[] = [
  { label: "Full", value: HelperPermission.Full },
  { label: "View", value: HelperPermission.View },
  { label: "None", value: "" },
];
