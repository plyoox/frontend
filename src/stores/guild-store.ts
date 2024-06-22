import { DiscordPermission } from "@/discord/enums";
import type { CategoryChannel, Guild, Role, TextChannel, VoiceChannel } from "@/discord/types";
import { colorToHexString } from "@/lib/utils";
import type { GuildDataResponse } from "@/types/responses";
import type { RoleItem, SelectItem } from "@/types/utils";
import type { ComboboxItem, ComboboxItemGroup } from "@mantine/core";
import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

export class GuildStore {
  guild: Guild | null = null;
  #textChannels: Map<string, TextChannel> = observable.map();
  #voiceChannels: Map<string, VoiceChannel> = observable.map();
  #categories: Map<string, CategoryChannel> = observable.map();
  #roles: Role[] = observable.array();
  #premium = false;

  constructor() {
    makeAutoObservable(this);
  }

  get roles() {
    return this.#roles;
  }

  get textChannels() {
    return this.#textChannels;
  }

  get premium() {
    return this.#premium;
  }

  get loaded() {
    return !!this.guild;
  }

  get writeableAsSelectable(): ComboboxItemGroup[] {
    if (this.guild === null) return [];

    const isAdmin = (BigInt(this.guild?.permissions) & BigInt(0x8)) === BigInt(0x8);

    const data: Record<string, ComboboxItem[]> = { "": [] };
    for (const channel of this.#textChannels.values()) {
      if (
        !isAdmin &&
        (BigInt(channel.permissions) & DiscordPermission.SendMessages) !== DiscordPermission.SendMessages
      ) {
        continue;
      }

      let group = "";
      if (channel.parent_id !== null) {
        group = this.#categories.get(channel.parent_id)?.name ?? "";
      }

      if (!data[group]) data[group] = [{ label: channel.name, value: channel.id }];
      else data[group].push({ label: channel.name, value: channel.id });
    }

    return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  }

  get textAsSelectable(): ComboboxItemGroup[] {
    const data: Record<string, ComboboxItem[]> = { "": [] };
    for (const channel of this.#textChannels.values()) {
      let group = "";
      if (channel.parent_id !== null) {
        group = this.#categories.get(channel.parent_id)?.name ?? "";
      }

      if (!data[group]) data[group] = [{ label: channel.name, value: channel.id }];
      else data[group].push({ label: channel.name, value: channel.id });
    }

    return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  }

  get textWithCategories(): ComboboxItemGroup<SelectItem>[] {
    const data: Record<string, SelectItem[]> = { "": [], Categories: [] };
    for (const channel of this.#textChannels.values()) {
      let group = "";
      if (channel.parent_id !== null) {
        group = this.#categories.get(channel.parent_id)?.name ?? "";
      }

      if (!data[group]) data[group] = [{ label: channel.name, value: channel.id, type: "text" }];
      else data[group].push({ label: channel.name, value: channel.id, type: "text" });
    }

    for (const category of this.#categories.values()) {
      data.Categories.push({ label: category.name, value: category.id, type: "category" });
    }

    return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  }

  // get voiceAsSelectable(): ComboboxItemGroup[] {
  //   const data: Record<string, ComboboxItem[]> = { "": [] };
  //   for (const channel of this.#voiceChannels.values()) {
  //     const group = this.#categories.get(channel.parent_id!)?.name ?? "";
  //
  //     if (!data[group]) data[group] = [{ label: channel.name, value: channel.id }];
  //     else data[group].push({ label: channel.name, value: channel.id });
  //   }
  //
  //   return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  // }

  // get channelsAsSelectable(): ComboboxData {
  //   const data: Record<string, any[]> = { "": [] };
  //
  //   this.textAsSelectable.forEach((group) => {
  //     if (!data[group.group]) data[group.group] = group.items;
  //     else data[group.group].push(...group.items);
  //   });
  //
  //   this.voiceAsSelectable.forEach((group) => {
  //     if (!data[group.group]) data[group.group] = group.items;
  //     else data[group.group].push(...group.items);
  //   });
  //
  //   return Object.entries(data).map(([group, items]) => ({ group: group, items }));
  // }

  get rolesAsSelectable(): RoleItem[] {
    return this.#roles.map((r) => ({
      label: r.name,
      value: r.id,
      color: colorToHexString(r.color),
    }));
  }

  get botHighestRole(): Role | undefined {
    return this.#roles.find((r) => r.id === this.guild?.highest_role);
  }

  get manageableRolesAsSelectable(): RoleItem[] {
    const highestRole = this.botHighestRole;
    if (highestRole === undefined) return [];

    return [...this.#roles]
      .filter((r) => !r.managed && highestRole.position > r.position)
      .map((r) => ({ label: r.name, value: r.id, color: colorToHexString(r.color) }));
  }

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

    this.#premium = data.premium;
  }

  botHasPermission(permission: bigint) {
    if (this.guild === null) return false;

    const permissions = BigInt(this.guild.permissions);

    if ((permissions & DiscordPermission.Administrator) === DiscordPermission.Administrator) return true;
    return (permissions & permission) === permission;
  }
}

export const GlobalGuildStore = new GuildStore();

export const GuildStoreContext = createContext<GuildStore>(GlobalGuildStore);
