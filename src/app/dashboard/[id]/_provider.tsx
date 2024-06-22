"use client";

import AddActionModal from "@/components/modals/add-action-modal";
import ChooseWebhookModal from "@/components/modals/choose-webhook-modal";
import ChooseWebhookTargets from "@/components/modals/choose-webhook-targets";
import { GlobalGuildStore, GuildStoreContext } from "@/stores/guild-store";
import { ModalsProvider } from "@mantine/modals";
import type { ReactNode } from "react";

function Provider({ children }: { children: ReactNode }) {
  return (
    <ModalsProvider
      modals={{ webhook: ChooseWebhookModal, webhookMassSelect: ChooseWebhookTargets, addAction: AddActionModal }}
    >
      <GuildStoreContext.Provider value={GlobalGuildStore}>{children}</GuildStoreContext.Provider>
    </ModalsProvider>
  );
}

export default Provider;
