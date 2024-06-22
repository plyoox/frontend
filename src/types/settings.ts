export interface AuditLogEntry {
  user_id: string;
  kind: number;
  created_at: string;
}

export interface SimpleUser {
  id: string;
  username: string;
}
