import { Blockquote } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import type { ReactNode } from "react";

import "@/styles/Scrollbar.css";

function DocsContainer({ children }: { children: ReactNode }) {
  return (
    <Blockquote
      className={"text-sm"}
      color={"#9c9c9c"}
      component={"section"}
      icon={<IconInfoCircle color={"white"} />}
      iconSize={35}
    >
      <div className={"lg:overflow-hidden"}>
        <h2 className={"text-xl font-medium"}>Documentation</h2>
        <div className={"overflow-y-scroll lg:max-h-[63vh] xl:max-h-[68vh] 2xl:max-h-[70vh]"}>{children}</div>
      </div>
    </Blockquote>
  );
}

export default DocsContainer;
