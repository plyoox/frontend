"use client";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserStoreContext, userStoreInstance } from "@/stores/user-store";
import ChooseWebhookModal from "@/components/modals/choose-webhook-modal";
import ChooseWebhookTargets from "@/components/modals/choose-webhook-targets";
import React from "react";

export function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          gcTime: 1000 * 60 * 10,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ModalsProvider modals={{ webhook: ChooseWebhookModal, webhookMassSelect: ChooseWebhookTargets }}>
        <UserStoreContext.Provider value={userStoreInstance}>{children}</UserStoreContext.Provider>
      </ModalsProvider>
      <Notifications />
    </QueryClientProvider>
  );
}
