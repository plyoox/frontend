import { Blockquote, Kbd } from "@mantine/core";
import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";
import ExternalLink from "@/components/docs/external-link";

function Page() {
  return (
    <DocsContainer>
      <DocsBox title={"Helper Permission"}>
        <p>These Permissions allow Helper to view or edit your settings.</p>
        <p className={"mt-1 font-medium italic"}>
          Do not change this to <Kbd>Full</Kbd> unless specifically requested.
        </p>
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Webhooks"}>
        <p>Webhooks are created for Logging purposes and used to sent logs.</p>
        <Blockquote className={"mt-1 p-4 text-gray-50"} color={"#FFD500"}>
          Removing a Webhook will delete all usages.
        </Blockquote>
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Audit Logs"}>
        <p>Audit Logs are automatically created and cannot be disabled.</p>
        <p className={"font-medium italic"}>
          When required, more logs can be requested in the{" "}
          <ExternalLink href={"https://discord.gg/5qPPvQe"}>Support Server</ExternalLink>.
        </p>
      </DocsBox>
    </DocsContainer>
  );
}

export default Page;
