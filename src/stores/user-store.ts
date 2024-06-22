import { API_URL } from "@/environment";
import type { AuthUser } from "@/types/authentication";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { flow, makeAutoObservable } from "mobx";
import { createContext } from "react";

export enum AuthStatus {
  Authenticated = 0,
  Unauthenticated = 1,
  Pending = 2,
}

export class UserStore {
  authStatus: AuthStatus = AuthStatus.Unauthenticated;
  user: AuthUser | null = null;

  fetchUser = flow(function* (this: UserStore) {
    try {
      this.authStatus = AuthStatus.Pending;

      const response: AxiosResponse<AuthUser> = yield axios.get<AuthUser>(`${API_URL}/user`, { withCredentials: true });

      this.user = response.data;
      this.authStatus = AuthStatus.Authenticated;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status === 401) {
        this.authStatus = AuthStatus.Unauthenticated;
      }
    }
  });

  requestLogout = flow(function* (this: UserStore, allDevices) {
    yield axios.delete(`${API_URL}/user?all=${allDevices}`, { withCredentials: true });

    this.logout();
  });

  constructor() {
    makeAutoObservable(this);
  }

  logout() {
    this.authStatus = AuthStatus.Unauthenticated;
    this.user = null;
  }

  get avatarUrl(): string {
    if (!this.user) {
      return "https://cdn.discordapp.com/embed/avatars/1.png";
    }

    return this.user.avatar
      ? `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatar}.webp?size=256`
      : `https://cdn.discordapp.com/embed/avatars/${(BigInt(this.user.id) << BigInt(22)) % BigInt(6)}.png`;
  }
}

export const userStoreInstance = new UserStore();
export const UserStoreContext = createContext<UserStore>(userStoreInstance);
