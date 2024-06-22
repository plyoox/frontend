import Divider from "@/components/divider";
import DocsBox from "@/components/docs/docs-box";
import DocsContainer from "@/components/docs/docs-container";
import DocsHeading from "@/components/docs/docs-heading";
import ExternalLink from "@/components/docs/external-link";
import classes from "@/styles/docs.module.css";
import { Alert, Kbd, ThemeIcon } from "@mantine/core";
import { IconAlertTriangle, IconInfoCircle, IconTemplate } from "@tabler/icons-react";

function WelcomeDocs() {
  return (
    <DocsContainer>
      <Alert icon={<IconInfoCircle />} mb={10} mt={10} title={"Migration"} variant={"light"}>
        <div className={"text-gray-100"}>
          If you want to import levels from other bots, please join the{" "}
          <ExternalLink href="https://discord.gg/5qPPvQe">support server</ExternalLink>.
        </div>
      </Alert>

      <DocsBox title={"Join roles"}>
        <p>When a user reaches a specific level, the bot can add roles to a user.</p>
        <p className={"mt-1 italic"}>The Bot must be above the roles to be able to assign them to users.</p>
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
          Sent whenever a member levels up. When no channel is defined, the message will be sent in the last channel the
          user wrote.
        </p>

        <p className={"mt-1"}>
          When clicking on the right icon of the textarea a popup with variables will come up. These will help
          formatting the message by your needs.
        </p>

        <Alert color={"yellow"} icon={<IconAlertTriangle />}>
          <Kbd>{"{level.role}"}</Kbd> is only sent when a user receives a new role. If the user has not received a role,
          the message will <b>not</b> be sent.
        </Alert>

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

            <tr>
              <td>
                <Kbd>{"{user.level}"}</Kbd>
              </td>
              <td>The new level of the user</td>
            </tr>

            <tr>
              <td>
                <Kbd>{"{level.role}"}</Kbd>
              </td>
              <td>The role that the user received</td>
            </tr>
          </tbody>
        </table>
      </DocsBox>
    </DocsContainer>
  );
}

export default WelcomeDocs;
