import DocsContainer from "@/components/docs/docs-container";
import ExternalLink from "@/components/docs/external-link";
import { Kbd, ThemeIcon } from "@mantine/core";
import { IconTemplate } from "@tabler/icons-react";

import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsHeading from "@/components/docs/docs-heading";
import classes from "@/styles/docs.module.css";

function WelcomeDocs() {
  return (
    <DocsContainer>
      <DocsBox title={"Joining"}>
        <p> When a user joins the guild, the bot can send a message or assign roles to the user.</p>
        <p className={"mt-1"}>
          If the server has{" "}
          <ExternalLink href={"https://support.discord.com/hc/en-us/articles/11074987197975-Community-Onboarding-FAQ"}>
            Community onboarding
          </ExternalLink>{" "}
          enabled, the role will be assigned <i>after</i> the user has finished it.
        </p>
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox title={"Leaving"}>
        When a user leaves the guild, a message can be sent in a specific channel. It will trigger when a user leaves by
        themselves or the user gets kicked or banned.
      </DocsBox>

      <Divider className={"my-1 border-mt-dark-4"} />

      <DocsBox>
        <div className={"flex items-center gap-2"}>
          <DocsHeading title={"Messages"} />
          <ThemeIcon className={"relative"} color={"blue"} size={"sm"} variant={"light"}>
            <IconTemplate />
          </ThemeIcon>
        </div>

        <p>
          Whenever a new user joins the server or a existing user leaves the guild, the bot can sent a message to a
          channel.
        </p>

        <p className={"mt-1"}>
          When clicking on the right icon of the textarea a popup with variables will come up. These will help
          formatting the message by your needs.
        </p>

        <table className={`mt-1 w-full table-auto border-collapse border border-mt-dark-4 ${classes.docsTable}`}>
          <thead className={"text-left font-semibold"}>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <Kbd>{"{user}"}</Kbd>
              </td>
              <td>The users full name, including discriminator if still used</td>
            </tr>
            <tr>
              <td>
                <Kbd>{"{user.mention}"}</Kbd>
              </td>
              <td>Mention of the user</td>
            </tr>

            <tr>
              <td>
                <Kbd>{"{user.name}"}</Kbd>
              </td>
              <td>Global display name of the user</td>
            </tr>

            <tr>
              <td>
                <Kbd>{"{user.id}"}</Kbd>
              </td>
              <td>Id of the user</td>
            </tr>

            <tr>
              <td>
                <Kbd>{"{guild.name}"}</Kbd>
              </td>
              <td>Name of the server</td>
            </tr>

            <tr>
              <td>
                <Kbd>{"{guild.member_count}"}</Kbd>
              </td>
              <td>The amount of members on the server</td>
            </tr>
          </tbody>
        </table>
      </DocsBox>
    </DocsContainer>
  );
}

export default WelcomeDocs;
