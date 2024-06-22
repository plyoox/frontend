import type { AuditLogEntry as AuditLogKind } from "@/types/settings";
import { Table } from "@mantine/core";
import AuditLog from "./audit-log";

function AuditLogList({ auditLogs, users }: { auditLogs: AuditLogKind[]; users: Map<string, string> }) {
  return (
    <Table.Tbody>
      {auditLogs.map((log) => (
        <AuditLog auditLog={log} key={log.created_at} user={users.get(log.user_id) ?? null} />
      ))}
    </Table.Tbody>
  );
}

export default AuditLogList;
