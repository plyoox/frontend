import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";
import DocsHeading from "@/components/docs/docs-heading";

function LoggingDocs() {
  return (
    <DocsContainer>
      <DocsHeading title={"Member join"} />
      <DocsBox>
        <p>When a member leaves or gets kicked or banned from the server.</p>
      </DocsBox>
      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsHeading title={"Message delete"} />
      <DocsBox>
        <p>
          When a message gets deleted. Only contains the content of previous messages if the message is not too old.
        </p>
      </DocsBox>
      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsHeading title={"Message edited"} />
      <DocsBox>
        <p>When a message gets edited. Only contains the previous content if the message is not too old.</p>
      </DocsBox>
    </DocsContainer>
  );
}

export default LoggingDocs;
