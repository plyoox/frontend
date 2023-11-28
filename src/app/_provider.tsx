"use client";

import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserStoreContext, userStoreInstance } from "@/stores/user-store";
import React from "react";

export function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            gcTime: 1000 * 60 * 10,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserStoreContext.Provider value={userStoreInstance}>{children}</UserStoreContext.Provider>
      <Notifications />
    </QueryClientProvider>
  );
}
