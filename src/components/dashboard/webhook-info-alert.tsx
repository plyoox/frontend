"use client";

import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Link from "next/link";

function WebhookInfoAlert({ identifier }: { identifier: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(`${identifier}-showWebhookInfo`) === "false") {
      setShow(false);
    }
  }, [identifier]);

  if (!show) {
    return null;
  }

  return (
    <Alert
      withCloseButton
      color={"pink"}
      icon={<IconInfoCircle />}
      mt={10}
      onClose={() => {
        localStorage.setItem(`${identifier}-showWebhookInfo`, "false");
        setShow(false);
      }}
      variant={"light"}
    >
      This Component uses webhooks. Manage them in the{" "}
      <Link
        className={"rounded-md bg-pl-secondary p-1 font-semibold text-pl-accent-light hover:underline"}
        href={"settings"}
      >
        Settings
      </Link>{" "}
      page.
    </Alert>
  );
}

export default WebhookInfoAlert;
