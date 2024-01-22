import { AccountAgeCheck, Action, JoinDateCheck, PointAction, TempActionValue } from "@/types/moderation";
import { ActionCheckKind, ActionPunishmentKind, LoggingKind } from "@/config/enums";
import { ComboboxItem, ComboboxItemGroup } from "@mantine/core";
import { DURATION_PUNISHMENTS, LegacyPunishmentItems } from "@/config/select-values";
import { GuildStore } from "@/stores/guild-store";
import { LoggingSetting } from "@/types/logging";
import { UseState } from "@/types/react";

export function getPunishmentKind(data: Action): ActionPunishmentKind {
  const value = data.punishment;

  if (typeof value === "string") {
    return value;
  }

  return Object.keys(value)[0] as ActionPunishmentKind;
}

export function getCheckKind(data: Action): ActionCheckKind | null {
  const value = data.check;

  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return Object.keys(value)[0] as ActionCheckKind;
}

export function actionToText(punishment: Action): string {
  let str = "";

  const punishmentKind = getPunishmentKind(punishment);
  const checkKind = getCheckKind(punishment);

  const action = punishment.punishment as never;
  const check = punishment.check as any;

  switch (punishmentKind) {
    case ActionPunishmentKind.Point:
      let data = (action as PointAction)[ActionPunishmentKind.Point];

      str += `Add ${data.points} point${data.points === 1 ? "" : "s"} to`;
      break;
    case ActionPunishmentKind.Delete:
      str += "Delete message from";
      break;
    default:
      str += LegacyPunishmentItems.find((a) => a.value === punishmentKind)!.label;
      break;
  }

  switch (checkKind) {
    case null:
    case undefined:
      str += " every user";
      break;
    case ActionCheckKind.NoRole:
      str += " users without a role";
      break;
    case ActionCheckKind.NoAvatar:
      str += " users without an avatar";
      break;
    case ActionCheckKind.AccountAge:
      const account_data = (check as AccountAgeCheck)[ActionCheckKind.AccountAge];

      str += ` users with an account younger than ${formatSeconds(account_data.time, true)}`;
      break;
    case ActionCheckKind.JoinDate:
      const join_data = (check as JoinDateCheck)[ActionCheckKind.JoinDate];

      str += ` users who joined the server before ${formatSeconds(join_data.time, true)}`;
      break;
  }

  if (punishmentKind === ActionPunishmentKind.Point) {
    const data = (action as PointAction)[ActionPunishmentKind.Point];

    if (data.expires_in == null) {
      str += " that will expire never";
    } else {
      str += ` that will expire ${formatSeconds(data.expires_in)}`;
    }
  }

  if (DURATION_PUNISHMENTS.includes(punishmentKind)) {
    const data = action[punishmentKind] as TempActionValue;

    str += ` for ${formatSeconds(data.duration, true)}.`;
  } else {
    str += ".";
  }

  return str;
}

function formatSeconds(seconds: number, cutPrefix: boolean = false): string {
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "always" });

  let str;

  if (seconds < 60) {
    str = formatter.format(seconds, "second");
  } else if (seconds < 3600) {
    str = formatter.format(Math.floor(seconds / 60), "minute");
  } else if (seconds < 86400) {
    str = formatter.format(Math.floor(seconds / 3600), "hour");
  } else {
    str = formatter.format(Math.floor(seconds / 86400), "day");
  }

  // remove first word
  if (cutPrefix) {
    return str.split(" ").slice(1).join(" ");
  }

  return str;
}

export function amountToColor(amount: number, max: number): { from: string; to: string; deg?: number } {
  const ratio = amount / max;

  if (ratio === 1) return { from: "red", to: "red" };

  if (amount === 0) return { from: "blue", to: "green" };
  if (ratio <= 0.334 || amount === 0) return { from: "green", to: "lime.5" };
  if (ratio <= 0.667) return { from: "#ec8c69", to: "#ed6ea0" };
  return { from: "#ed6ea0", to: "red" };
}

export function ensureUniqueness(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function setLoggingTextChannels({
  guildStore,
  setTextChannels,
  settings,
}: {
  guildStore: GuildStore;
  setTextChannels: UseState<ComboboxItemGroup[]>;
  settings: Record<LoggingKind, LoggingSetting>;
}) {
  const webhookMap = new Map<string, ComboboxItem>();

  Object.values(settings)
    .filter((setting) => setting.channel?.webhook_channel)
    .forEach((setting) => {
      const channel = guildStore.textChannels.get(setting.channel!.webhook_channel! /* filtered above */);

      webhookMap.set(setting.channel!.id, {
        label: (channel?.name ?? "Unknown Channel") + " (Webhook)",
        value: setting.channel!.id ?? "unknown",
        disabled: true,
      });
    });

  if (webhookMap.size > 0) {
    setTextChannels((channels) => {
      const webhookGroup = channels.find((group) => group.group === "Webhooks");

      if (webhookGroup) {
        webhookGroup.items.forEach((item) => {
          const forcedTypeItem = item as ComboboxItem;

          webhookMap.set(forcedTypeItem.value, forcedTypeItem);
        });

        webhookGroup.items = Array.from(webhookMap.values());
      } else {
        channels.push({
          group: "Webhooks",
          items: Array.from(webhookMap.values()),
        });
      }

      return [...channels];
    });
  }
}

export function addLoggingTextChannel({
  guildStore,
  setTextChannels,
  setting,
}: {
  guildStore: GuildStore;
  setTextChannels: UseState<ComboboxItemGroup[]>;
  setting: LoggingSetting;
}) {
  const webhook = setting.channel;
  if (!webhook || !webhook?.webhook_channel) {
    return;
  }

  setTextChannels((channels) => {
    const channel = guildStore.textChannels.get(webhook.webhook_channel!);
    const webhookGroup = channels.find((group) => group.group === "Webhooks");

    if (webhookGroup) {
      // check if webhook already exists
      if (!webhookGroup.items.some((item: any) => item.value === webhook.id)) {
        webhookGroup.items.push({
          label: (channel?.name ?? "Unknown Channel") + " (Webhook)",
          value: webhook.id,
          disabled: true,
        });
      }
    } else {
      channels.push({
        group: "Webhooks",
        items: [
          {
            label: (channel?.name ?? "Unknown Channel") + " (Webhook)",
            value: webhook.id,
            disabled: true,
          },
        ],
      });
    }

    return [...channels];
  });
}

export function logKindToMessage(kind: number): string {
  switch (kind) {
    case 1:
      return "Levels updated";
    case 2:
      return "Logging updated";
    case 3:
      return "Logging settings updated";
    case 4:
      return "Webhook deleted";
    case 5:
      return "Webhook created";
    case 6:
      return "Moderation updated";
    case 7:
      return "Moderation rule updated";
    case 8:
      return "Moderation rule deleted";
    case 9:
      return "Punishment template updated";
    case 10:
      return "Punishment template deleted";
    case 11:
      return "Created Discord rule";
    case 12:
      return "Deleted Discord rule";
    case 13:
      return "Welcome updated";
    case 14:
      return "Helper access changed";
    case 15:
      return "Notification removed";
    case 16:
      return "Notification added";
    case 17:
      return "Notification updated";
    case 18:
      return "Twitch account updated";
    default:
      return kind.toString();
  }
}
