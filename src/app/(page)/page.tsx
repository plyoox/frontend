import GettingStarted from "./components/GettingStarted";
import ImportantLinks from "./components/ImportantLinks";
import MainCard from "./components/MainCard";

function Page() {
  return (
    <div className="container mx-auto relative flex flex-col px-5">
      <MainCard className="mx-auto lg:absolute md:top-10 2xl:z-10 2xl:left-16 mt-5" />
      <GettingStarted className="mx-auto lg:absolute lg:top-60 2xl:right-52 lg:right-0 mt-5" />
      <ImportantLinks className="mx-auto mt-5 lg:mt-[480px]" />
    </div>
  );
}

export default Page;
