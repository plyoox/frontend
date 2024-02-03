export const DiscordPermission = {
  ManageMessages: BigInt(0x2000),
  SendMessages: BigInt(0x800),
  Administrator: BigInt(0x8),
  ManageRoles: BigInt(0x10000000),
  ModerateMembers: BigInt(0x10000000000),
  BanMembers: BigInt(0x4),
  KickMembers: BigInt(0x2),
  ManageServer: BigInt(0x20),
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
