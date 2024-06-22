"use client";

import { GlobalRuleStore, RuleStoreContext } from "@/stores/rule-store";
import type React from "react";

export function Provider({ children }: { children: React.ReactNode }) {
  return <RuleStoreContext.Provider value={GlobalRuleStore}>{children}</RuleStoreContext.Provider>;
}
