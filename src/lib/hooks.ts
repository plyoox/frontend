import { AxiosError } from "axios";
import { DiscordModerationRule, Guild } from "@/discord/types";
import {
  GuildDataResponse,
  LevelingResponse,
  LoggingResponse,
  ModerationResponse,
  WelcomeResponse,
} from "@/types/responses";
import { GuildStoreContext } from "@/stores/guild-store";
import { LoggingData } from "@/types/logging";
import { RuleStoreContext } from "@/stores/rule-store";
import { UserStoreContext } from "@/stores/user-store";
import {
  fetchAutoModerationRules,
  fetchGuildData,
  fetchGuilds,
  fetchLevelingData,
  fetchLoggingData,
  fetchModerationData,
  fetchWelcomeData,
} from "@/lib/requests";
import { useContext, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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

export function useLoggingData() {
  const id = useGuildId();

  const { data, error, isLoading } = useQuery<LoggingData, AxiosError>({
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

interface RequestGuildData {
  text?: boolean;
  voice?: boolean;
  category?: boolean;
  roles?: boolean;
  premium?: boolean;
}
