import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import LevelContainer from "@/components/dashboard/leveling/level-container";
import Link from "next/link";

export const metadata = {
  title: "Leveling",
};

function Page() {
  return (
    <>
      <h1 className={"text-2xl font-semibold"}>Leveling</h1>

      <Alert icon={<IconInfoCircle />} mb={10} mt={10} title={"Migration"} variant={"light"}>
        <div className={"text-gray-100"}>
          If you want to import levels from other bots, please join the{" "}
          <Link
            className={"rounded-md bg-pl-secondary p-1 font-semibold text-pl-accent-light hover:underline"}
            href="https://discord.gg/5qPPvQe"
            target="_blank"
          >
            support server
          </Link>
          .
        </div>
      </Alert>

      <LevelContainer />
    </>
  );
}

export default Page;
