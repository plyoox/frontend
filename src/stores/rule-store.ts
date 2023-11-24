import { AutoModerationTriggerType } from "@/discord/enums";
import { DISCORD_KEYWORD_RULE_LIMIT } from "@/lib/limits";
import { DiscordModerationRule } from "@/discord/types";
import { ModerationRule } from "@/types/moderation";
import { createContext } from "react";
import { makeAutoObservable, observable } from "mobx";
import { removeModerationRule } from "@/lib/requests";

class RuleStore {
  #discordRules: Map<string, DiscordModerationRule> = observable.map();
  #moderationRules: Map<string, ModerationRule> = observable.map();
  #loadedRules = false;

  constructor() {
    makeAutoObservable(this);
  }

  addModerationRule(rule: ModerationRule) {
    this.#moderationRules.set(rule.rule_id, rule);
  }

  removeModerationRule(rule_id: string) {
    this.#moderationRules.delete(rule_id);
  }

  get moderationRules() {
    return this.#moderationRules;
  }

  setModerationRules(rules: ModerationRule[]) {
    for (const rule of rules) {
      this.#moderationRules.set(rule.rule_id, rule);
    }
  }

  setDiscordRules(rules: DiscordModerationRule[]) {
    this.#loadedRules = true;

    for (const rule of rules) {
      this.#discordRules.set(rule.id, rule);
    }

    this.removeAbundantRules();
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

  addDiscordRule(rule: DiscordModerationRule) {
    this.#discordRules.set(rule.id, rule);
  }

  removeDiscordRule(rule_id: string) {
    this.#discordRules.delete(rule_id);
  }

  get discordRules() {
    return this.#discordRules;
  }

  get discordRulesArray() {
    return Array.from(this.#discordRules.values());
  }

  canCreateKeywordRule() {
    const keywordLength = this.discordRulesArray.filter(
      (rule) => rule.trigger_type === AutoModerationTriggerType.Keyword,
    ).length;
    return this.#loadedRules && keywordLength < DISCORD_KEYWORD_RULE_LIMIT;
  }
}

export const GlobalRuleStore = new RuleStore();

export const RuleStoreContext = createContext<RuleStore>(GlobalRuleStore);
