import { API_URL } from "@/environment";
import { DiscordModerationRule } from "@/discord/types";
import { GuildDataResponse, LevelingResponse, ModerationResponse, WelcomeResponse } from "@/types/responses";
import { ModerationConfig } from "@/types/moderation";
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

export async function fetchWelcomeData(id: string) {
  const response = await axios.get<WelcomeResponse>(`${API_URL}/guild/${id}/welcome`, { withCredentials: true });

  return response.data;
}

export async function fetchLevelingData(id: string) {
  const response = await axios.get<LevelingResponse>(`${API_URL}/guild/${id}/leveling`, { withCredentials: true });

  return response.data;
}

export async function removeModerationRule(guildId: string, ruleId: string) {
  await axios.delete(`${API_URL}/guild/${guildId}/moderation/rules/${ruleId}`, {
    withCredentials: true,
  });
}

export async function fetchAutoModerationRules(id: String): Promise<DiscordModerationRule[]> {
  const response = await axios.get(`${API_URL}/guild/${id}/data/automod`, { withCredentials: true });

  return response.data;
}

export async function saveModerationData(id: string, data: Partial<Partial<ModerationConfig>>): Promise<any> {
  await axios.patch(`${API_URL}/guild/${id}/moderation`, data, {
    withCredentials: true,
  });
}

export async function saveWelcomeData(id: string, data: Partial<Partial<WelcomeResponse>>): Promise<any> {
  await axios.patch(`${API_URL}/guild/${id}/welcome`, data, {
    withCredentials: true,
  });
}

export async function saveLevelingData(id: string, data: Partial<Partial<LevelingResponse>>): Promise<any> {
  await axios.patch(`${API_URL}/guild/${id}/leveling`, data, {
    withCredentials: true,
  });
}
