import { IconCheck, IconX } from "@tabler/icons-react";
import { Switch } from "@mantine/core";

function ToggleActive({ active, onChange }: { active: boolean; onChange: (active: boolean) => void }) {
  return (
    <div className={"flex justify-between my-3"}>
      <span className={"text-pl-text text-sm"}>Module enabled</span>

      <Switch
        checked={active}
        color="teal"
        mr={10}
        offLabel={<IconX color={"red"} size="1rem" stroke={3} />}
        onChange={(el) => {
          onChange(el.target.checked);
        }}
        onLabel={<IconCheck color={"lime"} size="1rem" stroke={3} />}
        size="md"
      />
    </div>
  );
}

export default ToggleActive;
