export const DiscordPermission = {
  ManageMessages: BigInt(0x2000 /* Manage Messages */),
  SendMessages: BigInt(0x800 /* Send Messages */),
  Administrator: BigInt(0x8 /* Administrator */),
  ManageRoles: BigInt(0x10000000 /* Manage Roles */),
};

export enum AutoModerationRuleKeywordPresetKind {
  Profanity = 1,
  SexualContent = 2,
  Slurs = 3,
}

export enum AutoModerationTriggerType {
  Keyword = 1,
  Spam = 3,
  KeywordPreset = 4,
  MentionSpam = 5,
}
