export enum ActionPunishmentKind {
  Point = "point",
  Delete = "delete",
  Kick = "kick",
  Ban = "ban",
  TempBan = "tempban",
  TempMute = "tempmute",
}

export enum ActionCheckKind {
  NoRole = "no_role",
  NoAvatar = "no_avatar",
  AccountAge = "account_age",
  JoinDate = "join_date",
}

export enum LoggingKind {
  MemberBan = "member_ban",
  MemberJoin = "member_join",
  MemberLeave = "member_leave",
  MemberRename = "member_rename",
  MemberRoleUpdate = "member_role_update",
  MemberUnban = "member_unban",
  MessageDelete = "message_delete",
  MessageEdit = "message_edit",
}

export enum HelperPermission {
  View = "view",
  Full = "full",
}
