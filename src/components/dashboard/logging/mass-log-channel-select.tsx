import { GuildStoreContext } from "@/stores/guild-store";
import { Select } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useContext, useRef, useState } from "react";

function MassLogChannelSelect({ openModal }: { openModal: (id: string) => void }) {
  const guildStore = useContext(GuildStoreContext);

  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      searchable
      data={guildStore.textAsSelectable}
      description={"Set a channel for specific log variants."}
      label={"Set channel"}
      mb={10}
      onChange={(channel) => {
        if (channel) {
          openModal(channel);
          setValue(null);

          // This removes the focus from the input field.
          // Without this, the dropdown will open again, after the webhook window closes.
          ref.current?.blur();
        }
      }}
      ref={ref}
      value={value}
    />
  );
}

export default observer(MassLogChannelSelect);
