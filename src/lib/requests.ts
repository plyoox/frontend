import { API_URL } from "@/environment";
import { DiscordModerationRule, Guild } from "@/discord/types";
import {
  GuildDataResponse,
  LevelingResponse,
  LoggingResponse,
  ModerationResponse,
  type NotificationResponse,
  SettingsResponse,
  WelcomeResponse,
} from "@/types/responses";
import { LoggingData } from "@/types/logging";
import { MaybeWebhook } from "@/types/webhook";
import { ModerationConfig, Punishment } from "@/types/moderation";
import { notifications } from "@mantine/notifications";
import axios, { AxiosError } from "axios";

export async function fetchGuildData(id: string, params: string, redirect: any) {
  try {
    const response = await axios.get<GuildDataResponse>(`${API_URL}/guild/${id}/data?${params}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const responseCode = e.response?.status;

      if (responseCode === 401) {
        notifications.show({
          title: "Not logged in",
          message: "You need to be logged in to access this server.",
          color: "red",
        });

        redirect("/");
      } else if (responseCode === 403) {
        notifications.show({
          title: "No access",
          message: "You don't have access to this server.",
          color: "red",
        });

        redirect("/dashboard");
      } else if (responseCode === 404) {
        notifications.show({ title: "Server not found", message: "The bot is not part of this server.", color: "red" });

        redirect("/dashboard");
      }
    }

    throw e;
  }
}

export async function fetchModerationData(id: string) {
  const response = await axios.get<ModerationResponse>(`${API_URL}/guild/${id}/moderation`, { withCredentials: true });

  return response.data;
}

export async function fetchPunishments(id: string) {
  const response = await axios.get<Punishment[]>(`${API_URL}/guild/${id}/moderation/punishments`, {
    withCredentials: true,
  });

  return response.data;
}

export async function fetchWelcomeData(id: string) {
  const response = await axios.get<WelcomeResponse>(`${API_URL}/guild/${id}/welcome`, { withCredentials: true });

  return response.data;
}

export async function fetchLevelingData(id: string) {
  const response = await axios.get<LevelingResponse>(`${API_URL}/guild/${id}/leveling`, { withCredentials: true });

  return response.data;
}

export async function fetchSettingsData(id: string) {
  const response = await axios.get<SettingsResponse>(`${API_URL}/guild/${id}/settings`, { withCredentials: true });

  return response.data;
}

export async function fetchWebhooks(id: string) {
  const response = await axios.get<MaybeWebhook[]>(`${API_URL}/guild/${id}/webhook`, { withCredentials: true });

  return response.data;
}

export async function fetchLoggingData(id: string) {
  const response = await axios.get<LoggingResponse>(`${API_URL}/guild/${id}/logging`, { withCredentials: true });

  return response.data;
}

export async function fetchGuilds(): Promise<Guild[]> {
  const res = await axios.get(`${API_URL}/discord/guilds`, { withCredentials: true });

  return res.data;
}

export async function removeModerationRule(guildId: string, ruleId: string): Promise<void> {
  await axios.delete(`${API_URL}/guild/${guildId}/moderation/rules/${ruleId}`, {
    withCredentials: true,
  });
}

export async function fetchAutoModerationRules(id: String): Promise<DiscordModerationRule[]> {
  const response = await axios.get(`${API_URL}/guild/${id}/data/automod`, { withCredentials: true });

  return response.data;
}

export async function saveModerationData(id: string, data: Partial<ModerationConfig>): Promise<void> {
  if (data.logging_channel) {
    // Backend only accepts the channel/webhook id
    // @ts-ignore
    data.logging_channel = data.logging_channel.id;
  }

  await axios.patch(`${API_URL}/guild/${id}/moderation`, data, {
    withCredentials: true,
  });
}

export async function saveWelcomeData(id: string, data: Partial<WelcomeResponse>): Promise<void> {
  await axios.patch(`${API_URL}/guild/${id}/welcome`, data, {
    withCredentials: true,
  });
}

export async function saveLevelingData(id: string, data: Partial<LevelingResponse>): Promise<void> {
  await axios.patch(`${API_URL}/guild/${id}/leveling`, data, {
    withCredentials: true,
  });
}

export async function saveLoggingConfig(id: string, data: Partial<LoggingData>): Promise<void> {
  // Convert the channel object to the id
  const loggingData = {
    config: data.config,
    settings: data.settings
      ? Object.values(data.settings).map((s) => {
          // @ts-ignore
          s.channel = s.channel ? s.channel.id : null;
          return s;
        })
      : undefined,
  };

  await axios.patch(`${API_URL}/guild/${id}/logging`, loggingData, {
    withCredentials: true,
  });
}

export async function saveSettingsData(id: string, data: Partial<SettingsResponse>): Promise<void> {
  await axios.patch(`${API_URL}/guild/${id}/settings`, data, {
    withCredentials: true,
  });
}

export async function fetchNotifications(id: string) {
  const response = await axios.get<NotificationResponse>(`${API_URL}/guild/${id}/notifications`, {
    withCredentials: true,
  });

  return response.data;
}
