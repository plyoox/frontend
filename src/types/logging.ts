import type { LoggingKind } from "@/lib/enums";
import type { MaybeWebhook } from "@/types/webhook";

export type MassWebhookKind = "all" | "empty";

export interface LoggingData {
  config: LoggingConfig;
  settings: Record<LoggingKind, LoggingSetting>;
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
