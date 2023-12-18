import "../../../styles/Scrollbar.css";
import { Guild } from "@/discord/types";
import { Suspense } from "react";
import ServerList from "./components/server-list";
import ServerLoading from "./components/server-loading";

function parseData(data: string): Guild[] | null {
  try {
    const guilds: Guild[] = JSON.parse(atob(data));

    return guilds.sort((a, b) => {
      if (a.has_bot && !b.has_bot) return -1;
      if (!a.has_bot && b.has_bot) return 1;
      return 0;
    });
  } catch (e) {
    return null;
  }
}

function Page({ searchParams }: { searchParams: { data?: string } }) {
  let guilds: Guild[] | null;

  try {
    guilds = parseData(searchParams.data!);
  } catch (e) {
    guilds = null;
  }

  return (
    <div>
      <h1 className={"my-5 text-center text-3xl "}>Select a server</h1>

      <div
        className={
          "container mx-auto max-h-[70vh] max-w-2xl overflow-y-scroll rounded-md bg-mt-dark-7 p-2 shadow-xl shadow-mt-dark-8"
        }
      >
        <Suspense fallback={<ServerLoading />}>
          <ServerList guilds={guilds} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
