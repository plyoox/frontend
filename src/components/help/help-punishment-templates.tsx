import { Alert, Button, Kbd, Modal } from "@mantine/core";
import { IconHelpCircle, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

function HelpPunishmentTemplates() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button color={"blue"} leftSection={<IconHelpCircle />} onClick={() => setOpen(true)} variant={"light"}>
        How does it work?
      </Button>

      <Modal
        centered
        classNames={{
          title: "text-white text-xl font-semibold",
        }}
        onClose={() => setOpen(false)}
        opened={open}
        size={"xl"}
        title={"Punishment templates"}
      >
        <p className={"mb-3"}>
          Punishment templates are a simple way to consistently punish users across all moderators.
        </p>

        <Alert color={"teal"} icon={<IconInfoCircle />}>
          By default, the command requires the <Kbd>Ban members</Kbd> permission, but it can be changed in the settings
          in your guild. Check out{" "}
          <a
            className={"rounded-md p-0.5 text-blue-500 underline"}
            href={"https://support.discord.com/hc/en-us/articles/4644915651095-Command-Permissions"}
            referrerPolicy={"no-referrer"}
            target={"_blank"}
          >
            this guide
          </a>{" "}
          if you have problems.
        </Alert>

        <h3 className={"mt-2 text-lg font-medium text-white"}>How to use</h3>
        <p className={"text-base"}>
          Users with the required permission can use the <Kbd>/punish &lt;member&gt; &lt;template&gt;</Kbd> command.
        </p>
        <p>The template is dynamically provided trough the autocomplete feature.</p>
      </Modal>
    </div>
  );
}

export default HelpPunishmentTemplates;
