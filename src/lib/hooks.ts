import { API_URL } from "@/environment";
import {
  type AuditLogResponse,
  GuildDataResponse,
  LevelingResponse,
  LoggingResponse,
  ModerationResponse,
  type NotificationResponse,
  SettingsResponse,
  WelcomeResponse,
} from "@/types/responses";
import { DiscordModerationRule, Guild } from "@/discord/types";
import { GuildStoreContext } from "@/stores/guild-store";
import { MaybeWebhook } from "@/types/webhook";
import { Punishment, type UpsertPunishment } from "@/types/moderation";
import { RuleStoreContext } from "@/stores/rule-store";
import { UserStoreContext } from "@/stores/user-store";
import {
  fetchAuditLogs,
  fetchAutoModerationRules,
  fetchGuildData,
  fetchGuilds,
  fetchLevelingData,
  fetchLoggingData,
  fetchModerationData,
  fetchNotifications,
  fetchPunishments,
  fetchSettingsData,
  fetchWebhooks,
  fetchWelcomeData,
} from "@/lib/requests";
import { useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import type { TwitchNotification, TwitchUser } from "@/types/notification";

export function useGuildId() {
  const { id } = useParams();

  return id as string;
}

export function useGuildData(resources: RequestGuildData) {
  const id = useGuildId();
  const { push } = useRouter();
  const guildStore = useContext(GuildStoreContext);

  const urlParams = new URLSearchParams();
  resources.text && urlParams.set("text", "true");
  resources.category && urlParams.set("category", "true");
  resources.voice && urlParams.set("voice", "true");
  resources.roles && urlParams.set("roles", "true");
  resources.premium && urlParams.set("premium", "true");

  const params = urlParams.toString();

  const { data, error, isLoading } = useQuery<GuildDataResponse, AxiosError>({
    queryKey: ["guild", id, params],
    queryFn: () => fetchGuildData(id, params, push),
  });

  useEffect(() => {
    if (data) {
      guildStore.setData(data);
    }
  }, [data, guildStore]);

  return { data, error, isLoading };
}

export function useModerationData() {
  const id = useGuildId();
  const rules = useContext(RuleStoreContext);

  const { data, error, isLoading } = useQuery<ModerationResponse, AxiosError>({
    queryKey: ["moderation", id],
    queryFn: () => fetchModerationData(id),
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (data) {
      rules.setModerationRules(data.rules);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data, error, isLoading };
}

export function useModerationPunishments() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<Punishment[], AxiosError>({
    queryKey: ["moderation", id, "punishments"],
    queryFn: () => fetchPunishments(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useDiscordRules() {
  const id = useGuildId();
  const rules = useContext(RuleStoreContext);

  const { data, error, isLoading } = useQuery<DiscordModerationRule[], AxiosError>({
    queryKey: ["discord-rules", id],
    queryFn: () => fetchAutoModerationRules(id),
    refetchOnMount: "always",
  });

  useEffect(() => {
    if (data) {
      rules.setDiscordRules(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { data, error, isLoading };
}

export function useWelcomeData() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<WelcomeResponse, AxiosError>({
    queryKey: ["welcome", id],
    queryFn: () => fetchWelcomeData(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useLevelingData() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<LevelingResponse, AxiosError>({
    queryKey: ["leveling", id],
    queryFn: () => fetchLevelingData(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useSettingsData() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<SettingsResponse, AxiosError>({
    queryKey: ["settings", id],
    queryFn: () => fetchSettingsData(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useWebhooks() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<MaybeWebhook[], AxiosError>({
    queryKey: ["webhook", id],
    queryFn: () => fetchWebhooks(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useLoggingData() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<LoggingResponse, AxiosError>({
    queryKey: ["logging", id],
    queryFn: () => fetchLoggingData(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useUserGuilds({ enabled }: { enabled: boolean }) {
  const userStore = useContext(UserStoreContext);

  const { data, error, isLoading } = useQuery<Guild[], AxiosError>({
    queryKey: ["user-guilds"],
    queryFn: () => fetchGuilds(),
    refetchOnMount: "always",
    enabled: enabled,
  });

  if (error?.response?.status) {
    userStore.logout();
  }

  return { data, error, isLoading };
}

export function useUpdatePunishment() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ punishmentId, payload }: { punishmentId: number; payload: UpsertPunishment }) => {
      return axios.put<Punishment>(`${API_URL}/guild/${id}/moderation/punishments/${punishmentId}`, payload, {
        withCredentials: true,
      });
    },
    onSuccess: (response, data) => {
      queryClient.setQueryData<Punishment[]>(["moderation", id, "punishments"], (oldData) => {
        if (!oldData) return [response.data];

        if (data.punishmentId === 0) {
          return [...oldData, response.data];
        }

        const filteredPunishments = oldData.filter((punishment) => punishment.id !== data.punishmentId);

        return [...filteredPunishments, response.data];
      });
    },
  });
}

export function useDeletePunishment() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (punishmentId: number) => {
      return axios.delete<void>(`${API_URL}/guild/${id}/moderation/punishments/${punishmentId}`, {
        withCredentials: true,
      });
    },
    onSuccess: (_, punishmentId) => {
      queryClient.setQueryData<Punishment[]>(["moderation", id, "punishments"], (oldData) => {
        if (!oldData) return oldData;

        return oldData.filter((punishment) => punishment.id !== punishmentId);
      });
    },
  });
}

export function useNotifications() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<NotificationResponse, AxiosError>({
    queryKey: ["notifications", id],
    queryFn: () => fetchNotifications(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useCreateNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => {
      return axios.post<TwitchNotification>(
        `${API_URL}/guild/${id}/notifications/twitch`,
        { name },
        { withCredentials: true },
      );
    },
    onSuccess: (response) => {
      queryClient.setQueryData<NotificationResponse>(
        ["notifications", id],
        (oldData): NotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            twitch: {
              user: oldData.twitch.user,
              notifications: [...oldData.twitch.notifications, response.data],
            },
          };
        },
      );
    },
  });
}

export function useDeleteNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => {
      return axios.delete<void>(`${API_URL}/guild/${id}/notifications/twitch/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: (_, userId) => {
      queryClient.setQueryData<NotificationResponse>(
        ["notifications", id],
        (oldData): NotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            twitch: {
              ...oldData.twitch,
              notifications: oldData.twitch.notifications.filter(
                (notification) => notification.user.user_id !== userId,
              ),
            },
          };
        },
      );
    },
  });
}

export function useEditNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, channel, message }: { userId: number; channel: string | null; message: string | null }) => {
      return axios.post<TwitchNotification>(
        `${API_URL}/guild/${id}/notifications/twitch/${userId}`,
        { channel, message },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: (_, { userId, channel, message }) => {
      queryClient.setQueryData<NotificationResponse>(
        ["notifications", id],
        (oldData): NotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            twitch: {
              ...oldData.twitch,
              notifications: [
                ...oldData.twitch.notifications.map((notification) => {
                  if (notification.user.user_id === userId) {
                    notification.channel = channel;
                    notification.message = message;
                  }

                  return notification;
                }),
              ],
            },
          };
        },
      );
    },
  });
}

export function useRemoveUser() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete<TwitchNotification>(`${API_URL}/guild/${id}/notifications/twitch`, {
        withCredentials: true,
      });
    },
    onSuccess: (_) => {
      queryClient.setQueryData<NotificationResponse>(
        ["notifications", id],
        (oldData): NotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            twitch: {
              ...oldData.twitch,
              user: null,
            },
          };
        },
      );
    },
  });
}

export function useUpdateConnectedAccount() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: TwitchUser) => {
      return Promise.resolve(user);
    },
    onSuccess: (user) => {
      queryClient.setQueryData<NotificationResponse>(
        ["notifications", id],
        (oldData): NotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            twitch: {
              ...oldData.twitch,
              user: user,
            },
          };
        },
      );
    },
  });
}

export function useAuditLogs() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<AuditLogResponse, AxiosError>({
    queryKey: ["audit-logs", id],
    queryFn: () => fetchAuditLogs(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

interface RequestGuildData {
  text?: boolean;
  voice?: boolean;
  category?: boolean;
  roles?: boolean;
  premium?: boolean;
}
