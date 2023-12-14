import { LoggingKind } from "@/config/enums";
import { MaybeWebhook } from "@/types/responses";

export interface LoggingConfig {
  active: boolean;
}

export interface LoggingSetting {
  kind: LoggingKind;
  active: boolean;
  guild_id: string;
  channel: MaybeWebhook | string | null;
  exempt_roles: string[];
  exempt_channels: string[];
}
