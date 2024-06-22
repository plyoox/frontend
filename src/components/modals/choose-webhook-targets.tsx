import { API_URL } from "@/environment";
import { useGuildId } from "@/lib/hooks";
import type { MassWebhookKind } from "@/types/logging";
import { Button, Tooltip } from "@mantine/core";
import type { ContextModalProps } from "@mantine/modals";

function ChooseWebhookModal({
  innerProps,
  context,
  id,
}: ContextModalProps<{
  text: string;
  channel: string;
  onVariant: (kind: MassWebhookKind) => void;
}>) {
  const guildId = useGuildId();

  function openWindow(kind: MassWebhookKind) {
    innerProps.onVariant(kind);

    window.open(
      `${API_URL}/guild/${guildId}/webhook/redirect?channel_id=${innerProps.channel}&webhook=other&single_use=false`,
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
          <Button onClick={() => openWindow("all")}>Change all</Button>
        </Tooltip>

        <Tooltip label={"Set the webhook for all settings that not already have a channel"}>
          <Button onClick={() => openWindow("empty")}>Change empty</Button>
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
