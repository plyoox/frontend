import LevelContainer from "@/components/dashboard/leveling/level-container";

export const metadata = {
  title: "Leveling",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Leveling</h1>

      <LevelContainer />
    </>
  );
}

export default Page;
