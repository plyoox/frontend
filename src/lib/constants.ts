import type { TemplateString } from "@/types/welcome";

export const WELCOME_TEMPLATES: TemplateString[] = [
  { name: "Username with discriminator", value: "{user}" },
  { name: "User mention", value: "{user.mention}" },
  { name: "User name", value: "{user.name}" },
  { name: "User id", value: "{user.id}" },
  { name: "Guild name", value: "{guild.name}" },
  { name: "Guild member count", value: "{guild.member_count}" },
];

export const LEVEL_TEMPLATES: TemplateString[] = [
  { name: "Username with discriminator", value: "{user}" },
  { name: "User mention", value: "{user.mention}" },
  { name: "User name", value: "{user.name}" },
  { name: "User id", value: "{user.id}" },
  { name: "Guild name", value: "{guild.name}" },
  { name: "Guild member count", value: "{guild.member_count}" },
  { value: "{level}", name: "User level" },
  { value: "{level.role}", name: "Received Role", info: "Only sent when role was given" },
];

export const LEVEL_GAIN_MULTIPLIER_MARKS = [
  { value: 1, label: "1" },
  { value: 1.2, label: "1.2" },
  { value: 1.4, label: "1.4" },
  { value: 1.6, label: "1.6" },
  { value: 1.8, label: "1.8" },
  { value: 2, label: "2" },
];

export const NO_CHANNELS_AVAILABLE = "No channels available.";
export const NO_ROLES_AVAILABLE = "There are no roles to assign.";
