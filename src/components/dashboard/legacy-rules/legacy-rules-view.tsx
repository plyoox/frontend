import InviteRule from "@/components/dashboard/legacy-rules/invite-rule";
import LinkRule from "@/components/dashboard/legacy-rules/link-rule";
import { GuildStoreContext } from "@/stores/guild-store";
import type { ModerationConfig } from "@/types/moderation";
import { Tabs } from "@mantine/core";
import { useContext, useMemo } from "react";
import CapsRule from "./caps-rule";

interface Props {
  data: ModerationConfig;
  handleChange: (data: Partial<ModerationConfig>) => void;
}

function LegacyRuleView({ data, handleChange }: Props) {
  const guildStore = useContext(GuildStoreContext);

  const roles = useMemo(() => guildStore.rolesAsSelectable, [guildStore.rolesAsSelectable]);
  const channels = guildStore.textWithCategories;

  return (
    <Tabs color={"plyoox"} defaultValue="caps" variant={"pills"}>
      <Tabs.List grow>
        <Tabs.Tab value="caps">Caps</Tabs.Tab>
        <Tabs.Tab value="link">Links</Tabs.Tab>
        <Tabs.Tab value="invite">Invites</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="caps">
        <CapsRule channels={channels} data={data} handleChange={handleChange} roles={roles} />
      </Tabs.Panel>

      <Tabs.Panel value="link">
        <LinkRule channels={channels} config={data} handleChange={handleChange} roles={roles} />
      </Tabs.Panel>

      <Tabs.Panel value="invite">
        <InviteRule channels={channels} config={data} handleChange={handleChange} roles={roles} />
      </Tabs.Panel>
    </Tabs>
  );
}

export default LegacyRuleView;
