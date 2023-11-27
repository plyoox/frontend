import { TemplateString } from "@/types/welcome";

export const WELCOME_TEMPLATES: TemplateString[] = [
  { name: "Username with discriminator", value: "{user}" },
  { name: "User mention", value: "{user.mention}" },
  { name: "User name", value: "{user.name}" },
  { name: "User id", value: "{user.id}" },
  { name: "Guild name", value: "{guild.name}" },
  { name: "Guild member count", value: "{guild.member_count}" },
];
