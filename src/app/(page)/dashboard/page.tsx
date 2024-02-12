import "../../../styles/Scrollbar.css";
import { Guild } from "@/discord/types";
import { Suspense } from "react";
import { parseGuilds } from "@/lib/utils";
import ServerList from "./components/server-list";
import ServerLoading from "./components/server-loading";

function Page({ searchParams }: { searchParams: { data?: string } }) {
  let guilds: Guild[] | null;

  try {
    guilds = parseGuilds(searchParams.data!);
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
