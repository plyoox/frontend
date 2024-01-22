import AuditLogView from "@/components/dashboard/settings/audit-log-view";

function AuditLogContainer({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className={"text-xl font-semibold"}>Audit Logs</h2>
      <div className={"flex flex-col gap-2 rounded-md bg-mt-dark-6 p-1"}>
        <AuditLogView />
      </div>
    </div>
  );
}

export default AuditLogContainer;
