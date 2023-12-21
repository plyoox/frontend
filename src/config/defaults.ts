import { createTheme } from "@mantine/core";

export const DEFAULT_LOGGING_SETTING = {
  active: false,
  channel: null,
  exempt_channels: [],
  exempt_roles: [],
};

export const theme = createTheme({
  cursorType: "pointer",
});
