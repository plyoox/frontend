import { Badge, Collapse, ThemeIcon } from "@mantine/core";
import { DEFAULT_LIMITS, PREMIUM_LIMITS } from "@/lib/limits";
import { GuildStoreContext } from "@/stores/guild-store";
import { IconPlus } from "@tabler/icons-react";
import { Punishment } from "@/types/moderation";
import { UseState } from "@/types/react";
import { amountToColor } from "@/lib/utils";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import AddPunishmentForm from "@/components/dashboard/punishments/add-punishment-form";

interface Props {
  punishments: Punishment[];
  setPunishments: UseState<Punishment[]>;
  isFinal?: boolean;
  className?: string;
}

function AddPunishment({ punishments, setPunishments, isFinal, className }: Props) {
  const guildStore = useContext(GuildStoreContext);
  const [open, setOpen] = useState(false);

  const disabled =
    punishments.length >= (guildStore.premium ? PREMIUM_LIMITS.MAX_AUTOMOD_RULES : DEFAULT_LIMITS.MAX_AUTOMOD_RULES);

  return (
    <div className={className}>
      <button
        className={`pl-2.5 w-full rounded-md h-[60px] pr-2 bg-mt-dark-6 flex justify-between items-center cursor-pointer
        disabled:bg-mt-dark-7 disabled:cursor-not-allowed disabled:hover:bg-mt-dark-7`}
        disabled={disabled}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="font-semibold flex items-center gap-3">
          <ThemeIcon color="green" size="md" variant="light">
            <IconPlus size={20} />
          </ThemeIcon>
          <span className="mt-0.5 ">Add action</span>
        </div>
        <Badge gradient={amountToColor(punishments.length, DEFAULT_LIMITS.MAX_AUTOMOD_RULES)} variant="gradient">
          {punishments.length}/{DEFAULT_LIMITS.MAX_AUTOMOD_RULES} Rules
        </Badge>
      </button>

      <Collapse className="rounded-b" in={open}>
        <AddPunishmentForm
          className="rounded-md bg-mt-dark-6 p-2 mt-1"
          isFinal={isFinal}
          punishments={punishments}
          setOpen={setOpen}
          setPunishments={setPunishments}
        />
      </Collapse>
    </div>
  );
}

export default observer(AddPunishment);
