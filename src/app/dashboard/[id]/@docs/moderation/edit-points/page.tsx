import { Kbd } from "@mantine/core";
import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";

function Page() {
  return (
    <DocsContainer>
      <DocsBox title={"Point Actions"}>
        <p>Points are an easy way to warn and punish users.</p>
        <p className={"mt-1 font-medium"}>There are multiple ways to assign points:</p>
        <ul className={"ml-5 list-disc"}>
          <li>
            <Kbd>/warn add</Kbd> Command
          </li>
          <li>Automoderation Actions</li>
          <li>Punishment Template System</li>
        </ul>
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"How does it work?"}>
        <p>
          When a user reaches <b>10</b> points, the first action whose check passes is executed and the user is
          punished. <i>After that, the user&apos;s points are reset to 0.</i>
        </p>
      </DocsBox>
    </DocsContainer>
  );
}

export default Page;
