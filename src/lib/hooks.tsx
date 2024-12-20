import type { DiscordModerationRule, Guild } from "@/discord/types";
import { API_URL } from "@/environment";
import {
  fetchAuditLogs,
  fetchAutoModerationRules,
  fetchGuildData,
  fetchGuilds,
  fetchLevelCard,
  fetchLevelCardImage,
  fetchLevelingData,
  fetchLoggingData,
  fetchModerationData,
  fetchPunishments,
  fetchSettingsData,
  fetchTwitchNotifications,
  fetchWebhooks,
  fetchWelcomeData,
  fetchYoutubeNotifications,
} from "@/lib/requests";
import { GuildStoreContext } from "@/stores/guild-store";
import { RuleStoreContext } from "@/stores/rule-store";
import { UserStoreContext } from "@/stores/user-store";
import type { PunishmentType, UpsertPunishment } from "@/types/moderation";
import type {
  AddYoutubeNotification,
  TwitchNotification,
  TwitchNotificationResponse,
  TwitchUserType,
  YoutubeNotificationResponse,
} from "@/types/notification";
import type {
  AuditLogResponse,
  ErrorResponse,
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
import { IconAlertCircle } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export function useGuildId() {
  const { id } = useParams();

  return id as string;
}

export function useGuildData(resources: RequestGuildData) {
  const id = useGuildId();
  const { replace } = useRouter();
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
    queryFn: () => fetchGuildData(id, params, replace),
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: 'rules' never changes
  useEffect(() => {
    if (data) {
      rules.setModerationRules(data.rules);
    }
  }, [data]);

  return { data, error, isLoading };
}

export function useModerationPunishments() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<PunishmentType[], AxiosError>({
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: 'rules' never changes
  useEffect(() => {
    if (data) {
      rules.setDiscordRules(data);
    }
  }, [data]);

  return { data, error, isLoading };
}

export function useDeleteDiscordRule() {
  const id = useGuildId();
  const rules = useContext(RuleStoreContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ruleId: string) => {
      return axios.delete(`${API_URL}/guild/${id}/moderation/rules/${ruleId}/purge`, {
        withCredentials: true,
      });
    },
    onSuccess: (_, ruleId) => {
      queryClient.setQueryData<DiscordModerationRule[]>(["discord-rules", id], (oldData) => {
        rules.removeDiscordRule(ruleId);

        if (!oldData) return oldData;

        return [...oldData.filter((r) => r.id !== ruleId)];
      });
    },
    onError: (e: AxiosError<ErrorResponse>) => {
      notifications.show({
        title: "Failed to delete rule",
        message: e.response?.data.message ?? e.message,
        color: "red",
        icon: <IconAlertCircle />,
      });
    },
  });
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

  const { data, error, isLoading } = useQuery<Guild[], AxiosError<ErrorResponse>>({
    queryKey: ["user-guilds"],
    queryFn: () => fetchGuilds(),
    refetchOnMount: "always",
    enabled: enabled,
  });

  useEffect(() => {
    if (error?.response) {
      const message = error.response.data?.message;

      notifications.show({
        title: "Failed to fetch guilds",
        message: message,
        color: "red",
        withBorder: true,
        autoClose: 10000,
      });
    }

    if (error?.response?.status === 401) {
      userStore.logout();
    }
  }, [error, userStore]);

  return { data, error, isLoading };
}

export function useUpdatePunishment() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ punishmentId, payload }: { punishmentId: number; payload: UpsertPunishment }) => {
      return axios.put<PunishmentType>(`${API_URL}/guild/${id}/moderation/punishments/${punishmentId}`, payload, {
        withCredentials: true,
      });
    },
    onSuccess: (response, data) => {
      queryClient.setQueryData<PunishmentType[]>(["moderation", id, "punishments"], (oldData) => {
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
      queryClient.setQueryData<PunishmentType[]>(["moderation", id, "punishments"], (oldData) => {
        if (!oldData) return oldData;

        return oldData.filter((punishment) => punishment.id !== punishmentId);
      });
    },
  });
}

export function useTwitchNotifications() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<TwitchNotificationResponse, AxiosError>({
    queryKey: ["twitch", "notifications", id],
    queryFn: () => fetchTwitchNotifications(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useYoutubeNotifications() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<YoutubeNotificationResponse, AxiosError>({
    queryKey: ["youtube", "notifications", id],
    queryFn: () => fetchYoutubeNotifications(id),
    refetchOnMount: "always",
  });

  return { data, error, isLoading };
}

export function useCreateTwitchNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; channel: string }) => {
      return axios.post<TwitchNotification>(`${API_URL}/guild/${id}/notifications/twitch`, data, {
        withCredentials: true,
      });
    },
    onSuccess: (response) => {
      queryClient.setQueryData<TwitchNotificationResponse>(
        ["twitch", "notifications", id],
        (oldData): TwitchNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            user: oldData.user,
            notifications: [...oldData.notifications, response.data],
          };
        },
      );
    },
  });
}

export function useCreateYoutubeNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { youtube_url: string; channel: string }) => {
      return axios.post<AddYoutubeNotification>(`${API_URL}/guild/${id}/notifications/youtube`, data, {
        withCredentials: true,
      });
    },
    onSuccess: (response) => {
      queryClient.setQueryData<YoutubeNotificationResponse>(
        ["youtube", "notifications", id],
        (oldData): YoutubeNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return [...oldData, { ...response.data, message: null }];
        },
      );
    },
  });
}

export function useDeleteTwitchNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => {
      return axios.delete<void>(`${API_URL}/guild/${id}/notifications/twitch/${userId}`, {
        withCredentials: true,
      });
    },
    onSuccess: (_, userId) => {
      queryClient.setQueryData<TwitchNotificationResponse>(
        ["twitch", "notifications", id],
        (oldData): TwitchNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            user: oldData.user,
            notifications: oldData.notifications.filter((notification) => notification.user.user_id !== userId),
          };
        },
      );
    },
  });
}

export function useDeleteYoutubeNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (channelId: string) => {
      return axios.delete<void>(`${API_URL}/guild/${id}/notifications/youtube/${channelId}`, {
        withCredentials: true,
      });
    },
    onSuccess: (_, channelId) => {
      queryClient.setQueryData<YoutubeNotificationResponse>(
        ["youtube", "notifications", id],
        (oldData): YoutubeNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return oldData.filter((notification) => notification.youtube_channel !== channelId);
        },
      );
    },
  });
}

export function useEditTwitchNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, channel, message }: { userId: number; channel: string; message: string | null }) => {
      return axios.post<TwitchNotification>(
        `${API_URL}/guild/${id}/notifications/twitch/${userId}`,
        { channel, message },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: (_, { userId, channel, message }) => {
      queryClient.setQueryData<TwitchNotificationResponse>(
        ["twitch", "notifications", id],
        (oldData): TwitchNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            user: oldData.user,
            notifications: [
              ...oldData.notifications.map((notification) => {
                if (notification.user.user_id === userId) {
                  notification.channel = channel;
                  notification.message = message;
                }

                return notification;
              }),
            ],
          };
        },
      );
    },
  });
}

export function useEditYoutubeNotification() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId, channel, message }: { channelId: string; channel: string; message: string | null }) => {
      return axios.post<TwitchNotification>(
        `${API_URL}/guild/${id}/notifications/youtube/${channelId}`,
        { channel, message },
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: (_, { channelId, channel, message }) => {
      queryClient.setQueryData<YoutubeNotificationResponse>(
        ["youtube", "notifications", id],
        (oldData): YoutubeNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return oldData.map((notification) => {
            if (notification.youtube_channel === channelId) {
              notification.channel = channel;
              notification.message = message;
            }

            return notification;
          });
        },
      );
    },
  });
}

export function useRemoveTwitchUser() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.delete<TwitchNotification>(`${API_URL}/guild/${id}/notifications/twitch`, {
        withCredentials: true,
      });
    },
    onSuccess: (_) => {
      queryClient.setQueryData<TwitchNotificationResponse>(
        ["twitch", "notifications", id],
        (oldData): TwitchNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            notifications: oldData.notifications,
            user: null,
          };
        },
      );
    },
  });
}

export function useUpdateConnectedTwitchAccount() {
  const id = useGuildId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: TwitchUserType) => {
      return Promise.resolve(user);
    },
    onSuccess: (user) => {
      queryClient.setQueryData<TwitchNotificationResponse>(
        ["twitch", "notifications", id],
        (oldData): TwitchNotificationResponse | undefined => {
          if (!oldData) return oldData;

          return {
            notifications: oldData.notifications,
            user: user,
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

export function useLevelCard() {
  const userStore = useContext(UserStoreContext);

  const { data, error, isLoading } = useQuery<LevelCard | null, AxiosError>({
    queryKey: ["level-card", userStore.user?.id],
    queryFn: () => fetchLevelCard(),
    refetchOnMount: "always",
    enabled: !!userStore.user,
  });

  return { data, error, isLoading };
}

export function useLevelCardImage() {
  const userStore = useContext(UserStoreContext);

  const { data, error, isLoading } = useQuery<File, AxiosError>({
    queryKey: ["level-card/image", userStore.user?.id],
    queryFn: () => fetchLevelCardImage(),
    refetchOnMount: "always",
    enabled: !!userStore.user,
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
