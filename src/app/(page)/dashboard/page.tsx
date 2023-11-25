import "./Scrollbar.css";
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
      <h1 className={"text-3xl text-center my-5 "}>Select a server</h1>

      <div
        className={
          "max-h-[70vh] bg-mt-dark-7 container mx-auto max-w-2xl overflow-y-scroll p-2 rounded-md shadow-xl shadow-mt-dark-8"
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
