import { API_URL } from "@/environment";
import { AuthGuild, AuthUser } from "@/types/authentication";
import { action, makeAutoObservable } from "mobx";
import { createContext } from "react";
import axios, { AxiosError } from "axios";

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

  setAuthStatus(status: AuthStatus) {
    this.authStatus = status;
  }

  setUser(user: AuthUser | null): void {
    this.user = user;
  }

  setGuild(guild: AuthGuild | null) {
    this.guild = guild;
  }

  async fetchUser() {
    try {
      this.setAuthStatus(AuthStatus.Pending);

      const response = await axios.get<AuthUser>(`${API_URL}/user`, { withCredentials: true });

      action(() => {
        this.setUser(response.data);
        this.setAuthStatus(AuthStatus.Authenticated);
      })();
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status === 401) {
        action(() => {
          this.setAuthStatus(AuthStatus.Unauthenticated);
        })();
      }
    }
  }

  async logout() {
    try {
      await axios.delete(`${API_URL}/logout`, { withCredentials: true });
      action(() => {
        this.setAuthStatus(AuthStatus.Unauthenticated);
      })();
    } catch (e) {
      console.error(e);
    }
  }
}

export const userStoreInstance = new UserStore();
export const UserStoreContext = createContext<UserStore>(userStoreInstance);
