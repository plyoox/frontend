import { Skeleton } from "@mantine/core";

function ServerCardSkeleton() {
  return (
    <div className={"p-2.5 flex items-center gap-5"}>
      <Skeleton style={{ height: "38px", width: "42px", borderRadius: "50px" }} />
      <Skeleton height={20} />
    </div>
  );
}

export default ServerCardSkeleton;
