import { AutoModerationRuleKeywordPresetKind, AutoModerationTriggerType } from "@/discord/enums";

export interface Guild {
  id: string;
  name: string;
  verified: boolean;
  verificationLevel: string;
  icon: string | null;
  permissions: string;
  memberCount: number;
  description: string | null;
  mfaLevel: string;
  nameAcronym: string;
  partnered: boolean;
  splash: string | null;
  discoverySplash: string | null;
  vanityURLCode: string | null;
  has_bot: boolean;
  highest_role: string;
  is_new?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  position: number;
  parent_id: string | null;
  category?: CategoryChannel | null;
  type: string;
}

export interface TextChannel extends Channel {
  topic: string | null;
  nsfw: boolean;
  rate_limit_per_user: number;
  permissions: string;
  permissions_locked: boolean;
}

export interface VoiceChannel extends Channel {
  permissions: string;
  permissions_locked: boolean;
  user_limit: number;
  bitrate: number;
}

export interface Role {
  id: string;
  name: string;
  color: number;
  icon: string;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
}

export interface CategoryChannel {
  id: string;
  name: string;
  position: number;
  type: string;
  viewable: boolean;
  permissions: string;
  permissions_locked: boolean;
}

export interface DiscordModerationRule {
  actions: {
    type: number;
    metadata: {
      duration_seconds: number;
    };
  }[];
  creator_id: string;
  enabled: boolean;
  event_type: number;
  exempt_channels: string[];
  exempt_roles: string[];
  guild_id: string;
  id: string;
  name: string;
  trigger_metadata: {
    allow_list: string[];
    keyword_filter: string[];
    presets: AutoModerationRuleKeywordPresetKind[];
    regex_patterns: string[];
    mention_total_limit: number;
  };
  trigger_type: AutoModerationTriggerType;
}
