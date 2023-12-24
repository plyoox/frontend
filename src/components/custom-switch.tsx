"use client";

import { IconCheck, IconX } from "@tabler/icons-react";
import { Switch } from "@mantine/core";

function CustomSwitch({
  checked,
  onChange,
  label,
  color = "teal",
  onIconColor = "lime",
  labelPosition,
}: {
  checked: boolean;
  labelPosition?: "left" | "right";
  label?: string;
  color?: string;
  onIconColor?: string;
  onChange: (active: boolean) => void;
}) {
  return (
    <Switch
      checked={checked}
      classNames={{
        body: "flex justify-between",
      }}
      color={color}
      label={label}
      labelPosition={labelPosition}
      mr={10}
      offLabel={<IconX color={"red"} size="1rem" stroke={3} />}
      onChange={(el) => {
        onChange(el.target.checked);
      }}
      onLabel={<IconCheck color={onIconColor} size="1rem" stroke={3} />}
      size="md"
    />
  );
}

export default CustomSwitch;
