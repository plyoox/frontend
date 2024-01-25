import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import type { ReactNode } from "react";

function DocsContainer({ children }: { children: ReactNode }) {
  return (
    <Alert color={"gray"} component={"section"} icon={<IconInfoCircle />} title={"Documentation"}>
      {children}
    </Alert>
  );
}

export default DocsContainer;
