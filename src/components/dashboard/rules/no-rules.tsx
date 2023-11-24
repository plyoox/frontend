import { Alert } from "@mantine/core";
import { IconAssemblyOff } from "@tabler/icons-react";

function NoRulesAvailable() {
  return (
    <Alert icon={<IconAssemblyOff />} py={14} title="No rule available">
      All rules are already in use. Create a new one or modify an existing one.
    </Alert>
  );
}

export default NoRulesAvailable;
