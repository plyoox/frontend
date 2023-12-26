import { LoggingKind } from "@/config/enums";
import { MaybeWebhook } from "@/types/webhook";

export interface LoggingData {
  config: LoggingConfig;
  settings: Record<string, LoggingSetting>;
}

export interface ModifiedLoggingData {
  config: LoggingConfig;
  settings: Record<string, LoggingSettingData>;
}

export interface LoggingConfig {
  active: boolean;
}

export interface LoggingSetting {
  kind: LoggingKind;
  active: boolean;
  guild_id: string;
  channel: MaybeWebhook | null;
  exempt_roles: string[];
  exempt_channels: string[];
}

export interface LoggingSettingData {
  kind: LoggingKind;
  active: boolean;
  guild_id: string;
  channel: string | null;
  exempt_roles: string[];
  exempt_channels: string[];
}
