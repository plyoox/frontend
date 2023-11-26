import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const { back } = useRouter();

  return (
    <Tooltip withArrow label={"Go back"}>
      <ActionIcon color={"gray"} onClick={back} variant={"transparent"}>
        <>
          <IconArrowBack />
          <span className={"sr-only"}>Go back</span>
        </>
      </ActionIcon>
    </Tooltip>
  );
}

export default BackButton;
