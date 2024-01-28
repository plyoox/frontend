import { Skeleton } from "@mantine/core";

function RulesLoading() {
  return (
    <>
      <Skeleton className={"h-[24px] w-44 rounded-sm"} />
      <Skeleton className={"mt-1 h-[60px] w-full rounded-md"} />
      <Skeleton className={"mt-1 h-[60px] w-full rounded-md"} />
    </>
  );
}

export default RulesLoading;
