export interface MaybeWebhook {
  id: string;
  webhook_channel: string | null;
  single_use: boolean;
  ref_count: number;
}
