"use client";

import { ScrollArea, Skeleton, Table } from "@mantine/core";
import { useAuditLogs } from "@/lib/hooks";
import { useEffect, useState } from "react";
import AuditLogList from "@/components/dashboard/settings/audit-log-list";
import RequestError from "@/components/dashboard/request-error";
import type { AuditLog } from "@/types/settings";

function AuditLogView() {
  const auditLogResponse = useAuditLogs();

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [users, setUsers] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (auditLogResponse.data) {
      setAuditLogs(auditLogResponse.data.audit_logs);

      setUsers(new Map(auditLogResponse.data.users.map((user) => [user.id, user.username])));
    }
  }, [auditLogResponse.data]);

  if (auditLogResponse.error) {
    return <RequestError error={auditLogResponse.error} />;
  }

  if (auditLogResponse.isLoading) {
    return (
      <>
        <Skeleton height={28} mt={40} width="100px" />
        <Skeleton height={56} mt={40} width="100%" />
      </>
    );
  }

  return (
    <ScrollArea h={550}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Action</Table.Th>
            <Table.Th>Created at</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <AuditLogList auditLogs={auditLogs} users={users} />
      </Table>
    </ScrollArea>
  );
}

export default AuditLogView;
