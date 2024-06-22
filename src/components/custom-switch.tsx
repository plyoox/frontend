"use client";

import { Switch } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

function CustomSwitch({
  checked,
  onChange,
  label,
  color = "teal",
  onIconColor = "lime",
  labelPosition,
  className,
}: {
  checked: boolean;
  labelPosition?: "left" | "right";
  label?: string;
  color?: string;
  onIconColor?: string;
  onChange: (active: boolean) => void;
  className?: string;
}) {
  return (
    <Switch
      checked={checked}
      classNames={{
        root: className,
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
