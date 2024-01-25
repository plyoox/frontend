import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";
import InternalLink from "@/components/docs/internal-link";

function LoggingDocs() {
  return (
    <DocsContainer>
      <Alert className={"mt-1"} color={"pink"} icon={<IconInfoCircle />}>
        This module uses Webhooks. Manage them in the <InternalLink href={"settings"}>Settings</InternalLink>.
      </Alert>

      <DocsBox title={"Member leave"}>
        <p>When a member leaves or gets kicked or banned from the server.</p>
      </DocsBox>
      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Message delete"}>
        <p>
          When a message gets deleted. Only contains the content of previous messages if the message is not too old.
        </p>
      </DocsBox>
      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Message edited"}>
        <p>When a message gets edited. Only contains the previous content if the message is not too old.</p>
      </DocsBox>
    </DocsContainer>
  );
}

export default LoggingDocs;
