import Footer from "@/components/footer";
import GettingStarted from "./components/getting-started";
import ImportantLinks from "./components/important-links";
import MainCard from "./components/main-card";

function Page() {
  return (
    <div>
      <div className="container relative mx-auto flex flex-col px-5 text-white">
        <MainCard className="mx-auto mt-5 md:top-10 lg:absolute 2xl:left-16 2xl:z-10" />
        <GettingStarted className="mx-auto mt-5 lg:absolute lg:right-0 lg:top-60 2xl:right-52" />
        <ImportantLinks className="mx-auto mt-5 lg:mt-[480px]" />
      </div>

      <div className={"mt-60 w-full"}>
        <Footer />
      </div>
    </div>
  );
}

export default Page;
