import ServerCardSkeleton from "./server-card-skeleton";

function ServerLoading() {
  return (
    <div>
      {[...Array(3).keys()].map((i) => (
        <ServerCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default ServerLoading;
