import type { DiscordModerationRule, Guild } from "@/discord/types";
import { API_URL } from "@/environment";
import { addIdToActions } from "@/lib/request-utils";
import type { LoggingData } from "@/types/logging";
import type { ActionWithoutId, ModerationConfig, ModerationRule, PunishmentType } from "@/types/moderation";
import type { TwitchNotificationResponse, YoutubeNotificationResponse } from "@/types/notification";
import type {
  AuditLogResponse,
  GuildDataResponse,
  LevelingResponse,
  LoggingResponse,
  ModerationResponse,
  SettingsResponse,
  WelcomeResponse,
} from "@/types/responses";
import type { LevelCard } from "@/types/user";
import type { MaybeWebhook } from "@/types/webhook";
import { notifications } from "@mantine/notifications";
import axios, { AxiosError } from "axios";

export async function fetchGuildData(id: string, params: string, redirect: (url: string) => void) {
  try {
    const response = await axios.get<GuildDataResponse>(`${API_URL}/guild/${id}/data?${params}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const responseCode = e.response?.status;

      if (responseCode === 401) {
        sessionStorage.setItem("redirect-origin", window.location.pathname);
        redirect(`${API_URL}/discord/login`);
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

export async function fetchModerationData(id: string): Promise<ModerationResponse> {
  const response = await axios.get<ModerationResponse<ActionWithoutId>>(`${API_URL}/guild/${id}/moderation`, {
    withCredentials: true,
  });

  return {
    rules: response.data.rules.map(
      (rule): ModerationRule => ({
        ...rule,
        actions: addIdToActions(rule.actions),
      }),
    ),
    config: {
      ...response.data.config,
      caps_actions: addIdToActions(response.data.config.caps_actions),
      invite_actions: addIdToActions(response.data.config.invite_actions),
      link_actions: addIdToActions(response.data.config.link_actions),
      point_actions: addIdToActions(response.data.config.point_actions),
    },
  };
}

export async function fetchPunishments(id: string) {
  const response = await axios.get<PunishmentType[]>(`${API_URL}/guild/${id}/moderation/punishments`, {
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

export async function fetchAutoModerationRules(id: string): Promise<DiscordModerationRule[]> {
  const response = await axios.get(`${API_URL}/guild/${id}/data/automod`, { withCredentials: true });

  return response.data;
}

export async function saveModerationData(id: string, data: Partial<ModerationConfig>): Promise<void> {
  if (data.logging_channel) {
    // @ts-expect-error Backend only accepts the channel/webhook id
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
          // @ts-expect-error On the backend side this is a string
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

export async function fetchTwitchNotifications(id: string) {
  const response = await axios.get<TwitchNotificationResponse>(`${API_URL}/guild/${id}/notifications/twitch`, {
    withCredentials: true,
  });

  return response.data;
}

export async function fetchYoutubeNotifications(id: string) {
  const response = await axios.get<YoutubeNotificationResponse>(`${API_URL}/guild/${id}/notifications/youtube`, {
    withCredentials: true,
  });

  return response.data;
}

export async function fetchAuditLogs(id: string) {
  const response = await axios.get<AuditLogResponse>(`${API_URL}/guild/${id}/settings/audit-logs`, {
    withCredentials: true,
  });

  return response.data;
}

export async function fetchLevelCard() {
  const response = await axios.get<LevelCard | null>(`${API_URL}/user/level-card`, { withCredentials: true });

  return response.data;
}

export async function fetchLevelCardImage() {
  const response = await axios.get<File>(`${API_URL}/user/level-card/image`, {
    withCredentials: true,
    responseType: "blob",
  });

  return response.data;
}

export async function saveLevelCard(progress: { from: string; to?: string; background_hash?: false }) {
  const response = await axios.post<LevelCard | null>(`${API_URL}/user/level-card`, progress, {
    withCredentials: true,
  });

  return response.data;
}

export async function saveLevelImage(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  await axios.put<LevelCard | null>(`${API_URL}/user/level-card/image`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
