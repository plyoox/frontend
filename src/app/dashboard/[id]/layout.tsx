"use client";

import { AppShell } from "@mantine/core";
import { GlobalGuildStore, GuildStoreContext } from "@/stores/guild-store";
import { ReactNode, useState } from "react";
import BreadCrumbs from "@/components/dashboard/bread-crumbs";
import Header from "@/components/app-shell/header/header";
import Sidenav from "@/components/app-shell/sidenav/sidenav";

function Layout({ docs, children }: { children: ReactNode; docs: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ breakpoint: "sm", width: { sm: 200, lg: 300 }, collapsed: { mobile: !open } }}
    >
      <AppShell.Header>
        <Header open={open} setOpen={setOpen} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidenav setOpen={setOpen} />
      </AppShell.Navbar>

      <AppShell.Main>
        <GuildStoreContext.Provider value={GlobalGuildStore}>
          <div className={"container mx-auto p-5 pb-0 text-white"}>
            <BreadCrumbs />
            <div className={"mb-5 grid grid-cols-5 gap-5"}>
              <div className={"col-span-5 lg:col-span-3 lg:mb-60"} id={"main-content"}>
                {children}
              </div>
              <div className={"sticky top-[95px] col-span-5 self-start lg:col-span-2"} id={"docs-content"}>
                {docs}
              </div>
            </div>
          </div>
        </GuildStoreContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
