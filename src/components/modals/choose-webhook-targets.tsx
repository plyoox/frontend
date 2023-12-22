import { API_URL } from "@/environment";
import { Button, Tooltip } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useGuildId } from "@/lib/hooks";

function ChooseWebhookModal({
  innerProps,
  context,
  id,
}: ContextModalProps<{
  text: string;
  channel: string;
}>) {
  const guildId = useGuildId();

  function openWindow() {
    window.open(
      `${API_URL}/guild/${guildId}/create-webhook?channel_id=${innerProps.channel}&webhook=other&single_use=false`,
      "Create Webhook | Plyoox",
      "height=900,width=500",
    );

    context.closeModal(id);
  }

  return (
    <>
      <span className="text-sm">{innerProps.text}</span>

      <div className={"flex flex-col gap-2"}>
        <Tooltip label={"Set the webhook for all settings"}>
          <Button onClick={() => openWindow()}>Change all</Button>
        </Tooltip>

        <Tooltip label={"Set the webhook for all settings that not already have a channel"}>
          <Button onClick={() => openWindow()}>Change empty</Button>
        </Tooltip>

        <Button
          color={"red"}
          onClick={() => {
            context.closeModal(id);
          }}
          variant={"light"}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default ChooseWebhookModal;
