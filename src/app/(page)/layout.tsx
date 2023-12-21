import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Provider } from "@/app/_provider";
import { ReactNode } from "react";
import { theme } from "@/config/defaults";
import Header from "@/components/app-shell/header/header";

function Layout({ children }: { children: ReactNode }) {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme} withCssVariables={false}>
      <Provider>
        <Header />
        {children}
      </Provider>
    </MantineProvider>
  );
}

export default Layout;
