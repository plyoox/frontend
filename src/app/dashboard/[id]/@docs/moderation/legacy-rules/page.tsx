import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";

function Page() {
  return (
    <DocsContainer>
      <DocsBox>
        Legacy rules are reading the message content instead of the built-in Discord rules.
        <br />
        The Bot cannot prevent the messages from being sent, only delete them afterwards. Whenever the bot gets
        triggered, the actions will run and the message will be deleted.
      </DocsBox>

      <DocsBox title={"Ignored Roles"}>
        These rules will take into account ignored roles. Messages sent by users with the specified roles will be
        ignored.
      </DocsBox>
    </DocsContainer>
  );
}

export default Page;
