"use client";

import { IconVersions, IconWebhook } from "@tabler/icons-react";
import { Tabs } from "@mantine/core";
import AuditLogContainer from "@/components/dashboard/settings/audit-log-container";
import WebhookContainer from "@/components/dashboard/settings/webhook-container";

function SettingsTabs({ className }: { className?: string }) {
  return (
    <Tabs className={className} defaultValue="webhooks">
      <Tabs.List>
        <Tabs.Tab leftSection={<IconWebhook />} value="webhooks">
          Webhooks
        </Tabs.Tab>
        <Tabs.Tab leftSection={<IconVersions />} value="audit-logs">
          Audit Logs
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="webhooks">
        <WebhookContainer className={"mt-2"} />
      </Tabs.Panel>

      <Tabs.Panel value="audit-logs">
        <AuditLogContainer className={"mt-2"} />
      </Tabs.Panel>
    </Tabs>
  );
}

export default SettingsTabs;
