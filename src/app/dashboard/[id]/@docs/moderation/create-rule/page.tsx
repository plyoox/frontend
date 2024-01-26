import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";

function Page() {
  return (
    <DocsContainer>
      <DocsBox>
        Helper to create rules directly from the Dashboard. For extended configuration go to the guild&apos;s settings.
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Templates"}>Templates allows to create rules that block specific links.</DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Allow list"}>
        Allow list will update your inputs to better handle different messages.
        <h4 className={"mt-1 font-semibold"}>Following input will be changed:</h4>
        <ul className={"list-disc pl-5"}>
          <li>Discord Invites</li>
          <li>Youtube Channel links</li>
          <li>Twitch Channel links</li>
          <li>Other links</li>
        </ul>
      </DocsBox>
    </DocsContainer>
  );
}

export default Page;
