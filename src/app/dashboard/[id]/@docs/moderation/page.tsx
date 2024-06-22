import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";
import ExternalLink from "@/components/docs/external-link";
import InternalLink from "@/components/docs/internal-link";
import { Alert, Kbd } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

function Page() {
  return (
    <DocsContainer>
      <Alert className={"mt-1"} color={"pink"} icon={<IconInfoCircle />}>
        This module uses Webhooks. Manage them in the <InternalLink href={"settings"}>Settings</InternalLink>.
      </Alert>
      <DocsBox title={"Moderation roles"}>
        Moderation roles cannot be punished by commands or the automoderator. Commands are gated by Discord Permission,
        they can be changed{" "}
        <ExternalLink href={"https://support.discord.com/hc/en-us/articles/4644915651095-Command-Permissions"}>
          in the Guild Settings
        </ExternalLink>
        .
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Automoderation"}>
        <p>
          The automoderator can be configured to easily punish users based on many conditions. It easily integrates with
          Discord&apos;s built-in system.
        </p>

        <h4 className={"mt-1 font-bold"}>How does it work</h4>
        <ul className={"list-disc pl-5"}>
          <li>Set up to 5 actions per trigger</li>
          <li>Define a punishment and check for each action</li>
          <li>Punish users based on conditions</li>
        </ul>
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Point Actions"}>
        <p>A user can collect up to 10 points until the punishments are run.</p>

        <h4 className={"mt-1 font-bold"}>How to receive points</h4>
        <ul className={"list-disc pl-5"}>
          <li>Automoderation actions</li>
          <li>Punishment template actions</li>
          <li>
            <Kbd>/warn add</Kbd> Command
          </li>
        </ul>
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Logging"}>
        <p>
          All Bot actions will be logged in the logging channel. It is recommended to set a channel, so every action is
          traceable.
        </p>
      </DocsBox>
    </DocsContainer>
  );
}

export default Page;
