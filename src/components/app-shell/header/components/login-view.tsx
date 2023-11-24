"use client";

import { AuthStatus, UserStoreContext } from "@/stores/user-store";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import LoginButton from "@/components/app-shell/header/components/login-button";
import UserView from "@/components/app-shell/header/components/user-view";

function LoginView() {
  const store = useContext(UserStoreContext);

  useEffect(() => {
    if (store.authStatus == AuthStatus.Unauthenticated) {
      store.fetchUser().then();
    }
  }, [store]);

  return (
    <>
      {store.authStatus === AuthStatus.Unauthenticated && <LoginButton />}
      {store.authStatus === AuthStatus.Authenticated && <UserView />}
    </>
  );
}

export default observer(LoginView);
