import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";

function Page() {
  return (
    <DocsContainer>
      <DocsBox>
        Discord&apos;s Automoderation system can be easily integrated with the Plyoox punishment system.
      </DocsBox>

      <DocsBox title={"You need to know"}>
        <ul className={"list-disc pl-5"}>
          <li>Whenever a rule is executed on Discord&apos;s end, the defined actions will run.</li>

          <li>
            Ignored roles are <b>not</b> automatically exempt.
          </li>
        </ul>
      </DocsBox>
    </DocsContainer>
  );
}

export default Page;
