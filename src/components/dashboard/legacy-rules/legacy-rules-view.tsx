import { GuildStoreContext } from "@/stores/guild-store";
import { ModerationConfig } from "@/types/moderation";
import { Tabs } from "@mantine/core";
import { useContext, useMemo } from "react";
import CapsRule from "./caps-rule";
import InviteRule from "@/components/dashboard/legacy-rules/invite-rule";
import LinkRule from "@/components/dashboard/legacy-rules/link-rule";

interface Props {
  data: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function LegacyRuleView({ data, handleChange }: Props) {
  const guildStore = useContext(GuildStoreContext);

  const roles = useMemo(() => guildStore.rolesAsSelectable, [guildStore.rolesAsSelectable]);
  const channels = useMemo(() => guildStore.textAsSelectable, [guildStore.textAsSelectable]);

  return (
    <Tabs defaultValue="caps" variant="pills">
      <Tabs.List>
        <Tabs.Tab value="caps">Caps</Tabs.Tab>
        <Tabs.Tab value="link">Links</Tabs.Tab>
        <Tabs.Tab value="invite">Invites</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="caps">
        <CapsRule channels={channels} data={data} handleChange={handleChange} roles={roles} />
      </Tabs.Panel>

      <Tabs.Panel value="link">
        <LinkRule channels={channels} data={data} handleChange={handleChange} roles={roles} />
      </Tabs.Panel>

      <Tabs.Panel value="invite">
        <InviteRule channels={channels} data={data} handleChange={handleChange} roles={roles} />
      </Tabs.Panel>
    </Tabs>
  );
}

export default LegacyRuleView;
