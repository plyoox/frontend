import { Table } from "@mantine/core";
import { logKindToMessage } from "@/lib/utils";
import type { AuditLog } from "@/types/settings";

const intl = new Intl.DateTimeFormat(undefined, {
  // year: "numeric",
  // month: "2-digit",
  // day: "2-digit",
  // hour: "numeric",
  // minute: "numeric",
  // second: "numeric",
  dateStyle: "short",
  timeStyle: "medium",
});

function AuditLog({ auditLog, user }: { auditLog: AuditLog; user: string | null }) {
  const date = intl.format(new Date(auditLog.created_at));

  return (
    <Table.Tr>
      <Table.Td>{user ?? auditLog.user_id}</Table.Td>
      <Table.Td>{logKindToMessage(auditLog.kind)}</Table.Td>
      <Table.Td>{date}</Table.Td>
    </Table.Tr>
  );
}

export default AuditLog;
