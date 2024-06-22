import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";
import ExternalLink from "@/components/docs/external-link";
import { Kbd } from "@mantine/core";

function Page() {
  return (
    <DocsContainer>
      <DocsBox>Punishment templates are a simple way to consistently punish users across all moderators.</DocsBox>

      <DocsBox title={"How does it Work"}>
        <ul className={"list-disc pl-5"}>
          <li>
            Create templates for often occurring offences
            <br />
            <i>e.g Advertising, Spamming, Scams, ...</i>
          </li>
          <li>
            <i>opt.</i> Update the{" "}
            <ExternalLink href={"https://support.discord.com/hc/en-us/articles/4644915651095-Command-Permissions"}>
              Command Permission
            </ExternalLink>
          </li>
          <li>
            Punish by using <Kbd>/punish &lt;member&gt; &lt;template&gt;</Kbd>
          </li>
        </ul>
      </DocsBox>
    </DocsContainer>
  );
}

export default Page;
