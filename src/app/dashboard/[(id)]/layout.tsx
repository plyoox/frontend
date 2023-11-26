"use client";

import { AppShell } from "@mantine/core";
import { GlobalGuildStore, GuildStoreContext } from "@/stores/guild-store";
import BreadCrumbs from "@/components/dashboard/bread-crumbs";
import Header from "@/components/app-shell/header/header";
import React, { useState } from "react";
import Sidenav from "@/components/app-shell/sidenav/sidenav";

function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AppShell
      header={{ height: 71 }}
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
          <div className={"p-5 max-w-4xl"}>
            <BreadCrumbs />
            {children}
          </div>
        </GuildStoreContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
