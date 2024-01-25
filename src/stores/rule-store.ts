import { DiscordModerationRule } from "@/discord/types";
import { ModerationRule } from "@/types/moderation";
import { createContext } from "react";
import { makeAutoObservable, observable } from "mobx";
import { removeModerationRule } from "@/lib/requests";

class RuleStore {
  #discordRules: Map<string, DiscordModerationRule> = observable.map();
  #moderationRules: Map<string, ModerationRule> = observable.map();

  constructor() {
    makeAutoObservable(this);
  }

  get moderationRules() {
    return this.#moderationRules;
  }

  get discordRulesArray() {
    return Array.from(this.#discordRules.values());
  }

  addModerationRule(rule: ModerationRule) {
    this.#moderationRules.set(rule.rule_id, rule);
  }

  removeModerationRule(ruleId: string) {
    this.#moderationRules.delete(ruleId);
  }

  setModerationRules(rules: ModerationRule[]) {
    for (const rule of rules) {
      this.#moderationRules.set(rule.rule_id, rule);
    }
  }

  setDiscordRules(rules: DiscordModerationRule[]) {
    for (const rule of rules) {
      if (sessionStorage.getItem(rule.id)) continue;

      this.#discordRules.set(rule.id, rule);
    }

    this.removeAbundantRules();
  }

  addDiscordRule(rule: DiscordModerationRule) {
    this.#discordRules.set(rule.id, rule);
  }

  removeDiscordRule(ruleId: string) {
    this.#discordRules.delete(ruleId);
    this.#moderationRules.delete(ruleId);
  }

  /**
   * Deletes all moderation rules that have no corresponding discord rule
   */
  private removeAbundantRules() {
    for (const rule of this.#moderationRules.values()) {
      if (!this.#discordRules.get(rule.rule_id)) {
        removeModerationRule(rule.guild_id, rule.rule_id).then(() => {
          this.#moderationRules.delete(rule.rule_id);
        });
      }
    }
  }
}

export const GlobalRuleStore = new RuleStore();

export const RuleStoreContext = createContext<RuleStore>(GlobalRuleStore);
