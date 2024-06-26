import { DiscordPermission } from "@/discord/enums";
import { API_URL } from "@/environment";
import type { LoggingKind } from "@/lib/enums";
import { useGuildId } from "@/lib/hooks";
import { GuildStoreContext } from "@/stores/guild-store";
import { Button, Tooltip } from "@mantine/core";
import type { ContextModalProps } from "@mantine/modals";
import { useContext, useMemo } from "react";

function ChooseWebhookModal({
  innerProps,
  context,
  id,
}: ContextModalProps<{
  text: string;
  webhookKind: LoggingKind;
  channel: string;
  forbidText: boolean;
  noSingleUse: boolean;
}>) {
  const guildStore = useContext(GuildStoreContext);
  const guildId = useGuildId();

  const channelWritePermission = useMemo(() => {
    const channel = guildStore.textChannels.get(innerProps.channel);
    if (!channel) return false;

    return (BigInt(channel.permissions) && DiscordPermission.SendMessages) === DiscordPermission.SendMessages;
  }, [guildStore.textChannels, innerProps.channel]);

  function openWindow(singleUse: boolean) {
    window.open(
      `${API_URL}/guild/${guildId}/webhook/redirect?channel_id=${innerProps.channel}&webhook=log_${innerProps.webhookKind}&single_use=${singleUse}`,
      "Create Webhook | Plyoox",
      "height=900,width=500",
    );

    context.closeModal(id);
  }

  return (
    <>
      <span className="text-sm">{innerProps.text}</span>

      <div className={"flex flex-col gap-2"}>
        <Tooltip label={"Created a new webhook, that will be reused when the channel is used multiple times."}>
          <Button onClick={() => openWindow(false)}>Create Webhook (recommended)</Button>
        </Tooltip>

        {!innerProps.noSingleUse && (
          <Tooltip label={"Created a new webhook, that is only used for this."}>
            <Button onClick={() => openWindow(true)} variant={"subtle"}>
              Create single-use Webhook
            </Button>
          </Tooltip>
        )}

        {!innerProps.forbidText && (
          <Tooltip
            label={
              channelWritePermission
                ? "Send a normal message. This should only be used, if you cannot create more webhooks for this channel."
                : "The bot does not have the permission to send messages in this channel."
            }
          >
            <Button
              disabled={!channelWritePermission}
              onClick={() => {
                const channel = new BroadcastChannel("webhook-creation");

                channel.postMessage(`log_${innerProps.webhookKind}:${innerProps.channel}`);
                channel.close();

                context.closeModal(id);
              }}
              variant={"light"}
            >
              Use channel (not recommended)
            </Button>
          </Tooltip>
        )}

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
