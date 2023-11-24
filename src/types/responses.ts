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
