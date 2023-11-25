import { Skeleton } from "@mantine/core";

function LoadingSkeleton() {
  return (
    <>
      <Skeleton height={15} width="70%" />
      <Skeleton height={30} mt={8} width="40%" />
      <Skeleton height={100} mt={40} width="100%" />
      <Skeleton height={200} mt={40} width="100%" />
    </>
  );
}

export default LoadingSkeleton;
