import { AccountAgeCheck, JoinDateCheck, PointAction, Punishment, TempActionValue } from "@/types/moderation";
import { ActionCheckKind, ActionPunishmentKind } from "@/config/enums";
import { ComboboxItem, ComboboxItemGroup } from "@mantine/core";
import { DURATION_PUNISHMENTS, LegacyPunishmentItems } from "@/config/select-values";
import { GuildStore } from "@/stores/guild-store";
import { LoggingData } from "@/types/logging";
import { UseState } from "@/types/react";

export function getPunishmentKind(data: Punishment): ActionPunishmentKind {
  const value = data.punishment;

  if (typeof value === "string") {
    return value;
  }

  return Object.keys(value)[0] as ActionPunishmentKind;
}

export function getCheckKind(data: Punishment): ActionCheckKind | null {
  const value = data.check;

  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return Object.keys(value)[0] as ActionCheckKind;
}

export function actionToText(punishment: Punishment): string {
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
  if (amount === 0) return { from: "blue", to: "green" };
  if (ratio <= 0.334 || amount === 0) return { from: "green", to: "yellow" };
  if (ratio <= 0.667) return { from: "#ec8c69", to: "#ed6ea0" };
  return { from: "orange", to: "red" };
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
  data,
}: {
  guildStore: GuildStore;
  setTextChannels: UseState<ComboboxItemGroup[]>;
  data: LoggingData;
}) {
  const webhookMap = new Map<string, ComboboxItem>();

  Object.values(data.settings)
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
