import { API_URL } from "@/environment";
import { AuthGuild, AuthUser } from "@/types/authentication";
import { createContext } from "react";
import { flow, makeAutoObservable } from "mobx";
import axios, { AxiosError, AxiosResponse } from "axios";

export enum AuthStatus {
  Authenticated,
  Unauthenticated,
  Pending,
}

export class UserStore {
  authStatus: AuthStatus = AuthStatus.Unauthenticated;
  user: AuthUser | null = null;
  guild: AuthGuild | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setGuild(guild: AuthGuild | null) {
    this.guild = guild;
  }

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

  logout = flow(function* (this: UserStore) {
    try {
      yield axios.delete(`${API_URL}/logout`, { withCredentials: true });

      this.authStatus = AuthStatus.Unauthenticated;
    } catch (e) {
      console.error(e);
    }
  });
}

export const userStoreInstance = new UserStore();
export const UserStoreContext = createContext<UserStore>(userStoreInstance);
