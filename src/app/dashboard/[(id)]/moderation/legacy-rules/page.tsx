import LegacyRulesContainer from "@/components/dashboard/legacy-rules/legacy-rules-container";

export function Page() {
  return (
    <div>
      <h1 className={"text-2xl font-semibold"}>Legacy rules</h1>
      <LegacyRulesContainer />
    </div>
  );
}

export default Page;
