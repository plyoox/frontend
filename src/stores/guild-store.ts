import { CategoryChannel, Guild, Role, TextChannel, VoiceChannel } from "@/discord/types";
import { ComboboxData, ComboboxItem, ComboboxItemGroup } from "@mantine/core";
import { DiscordPermission } from "@/discord/enums";
import { GuildDataResponse } from "@/types/responses";
import { action, observable } from "mobx";
import { createContext } from "react";

export class GuildStore {
  #textChannels: Map<string, TextChannel> = observable.map();
  #voiceChannels: Map<string, VoiceChannel> = observable.map();
  #categories: Map<string, CategoryChannel> = observable.map();
  #roles: Role[] = observable.array();
  guild: Guild | null = null;

  setData(data: GuildDataResponse) {
    if (data.infos) this.guild = data.infos;
    if (data.text) {
      action(() => {
        this.#textChannels.clear();
        for (const channel of data.text) {
          this.#textChannels.set(channel.id, channel);
        }
      })();
    }
    if (data.roles) {
      action(() => {
        this.#roles.length = 0;
        this.#roles.push(...data.roles);
      })();
    }
    if (data.voice) {
      this.#voiceChannels.clear();
      for (const channel of data.voice) {
        this.#voiceChannels.set(channel.id, channel);
      }
    }
    if (data.category) {
      this.#categories.clear();
      for (const channel of data.category) {
        this.#categories.set(channel.id, channel);
      }
    }
  }

  get roles() {
    return this.#roles;
  }

  get writeableAsSelectable(): ComboboxItemGroup[] {
    if (this.guild === null) return [];

    const isAdmin = (BigInt(this.guild!.permissions) & BigInt(0x8)) === BigInt(0x8);

    const data: Record<string, ComboboxItem[]> = { "": [] };
    for (const channel of this.#textChannels.values()) {
      if (
        !isAdmin &&
        (BigInt(channel.permissions) & DiscordPermission.SendMessages) !== DiscordPermission.SendMessages
      ) {
        continue;
      }

      const group = this.#categories.get(channel.parent_id!)?.name ?? "";

      if (!data[group]) data[group] = [{ label: channel.name, value: channel.id }];
      else data[group].push({ label: channel.name, value: channel.id });
    }

    return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  }

  get textAsSelectable(): ComboboxItemGroup[] {
    const data: Record<string, ComboboxItem[]> = { "": [] };
    for (const channel of this.#textChannels.values()) {
      const group = this.#categories.get(channel.parent_id!)?.name ?? "";

      if (!data[group]) data[group] = [{ label: channel.name, value: channel.id }];
      else data[group].push({ label: channel.name, value: channel.id });
    }

    return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  }

  get voiceAsSelectable(): ComboboxData {
    const data: Record<string, ComboboxItem[]> = { "": [] };
    for (const channel of this.#voiceChannels.values()) {
      const group = this.#categories.get(channel.parent_id!)?.name ?? "";

      if (!data[group]) data[group] = [{ label: channel.name, value: channel.id }];
      else data[group].push({ label: channel.name, value: channel.id });
    }

    return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  }

  get allAsSelectable(): ComboboxData {
    return [...this.textAsSelectable, ...this.voiceAsSelectable];
  }

  get rolesAsSelectable(): ComboboxItem[] {
    return [...this.#roles].map((r) => ({ label: r.name, value: r.id }));
  }

  get manageableRolesAsSelectable(): ComboboxData[] {
    const highestRole = this.#roles.find((r) => r.id === this.guild!.highest_role)!;

    // return [...this.#roles]
    //   .filter(
    //     (r) =>
    //       !r.managed &&
    //       highestRole.position > r.position &&
    //       (BigInt(r.permissions) & DiscordPermission.ManageRoles) === DiscordPermission.ManageRoles,
    //   )
    //   .map((r) => ({ label: r.name, value: r.id }));

    return [];
  }

  botHasPermission(permission: bigint) {
    if (this.guild === null) return false;
    return (BigInt(this.guild.permissions) & permission) === permission;
  }
}

export const GlobalGuildStore = new GuildStore();

export const GuildStoreContext = createContext<GuildStore>(GlobalGuildStore);
