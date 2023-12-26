export interface MaybeWebhook {
  id: string;
  channel_id: string | null;
  single_use: boolean;
  ref_count: number;
}
