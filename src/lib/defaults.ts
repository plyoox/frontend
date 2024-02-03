import { DiscordPermission } from "@/discord/enums";

export const DEFAULT_LOGGING_SETTING = {
  active: false,
  channel: null,
  exempt_channels: [],
  exempt_roles: [],
};

export const ACTION_PERMISSIONS = [
  DiscordPermission.ModerateMembers,
  DiscordPermission.BanMembers,
  DiscordPermission.KickMembers,
  DiscordPermission.ManageMessages,
];
