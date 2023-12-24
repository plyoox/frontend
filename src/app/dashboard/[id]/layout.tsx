"use client";

import { AppShell } from "@mantine/core";
import { GlobalGuildStore, GuildStoreContext } from "@/stores/guild-store";
import { ReactNode, useState } from "react";
import BreadCrumbs from "@/components/dashboard/bread-crumbs";
import Header from "@/components/app-shell/header/header";
import Sidenav from "@/components/app-shell/sidenav/sidenav";

function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ breakpoint: "sm", width: { sm: 200, lg: 300 }, collapsed: { mobile: open } }}
    >
      <AppShell.Header>
        <Header open={open} setOpen={setOpen} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidenav open={open} setOpen={setOpen} />
      </AppShell.Navbar>

      <AppShell.Main>
        <GuildStoreContext.Provider value={GlobalGuildStore}>
          <div className={"max-w-4xl p-5 text-white"}>
            <BreadCrumbs />
            {children}
          </div>
        </GuildStoreContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
