"use client";

import type { UseState } from "@/types/react";
import { Burger } from "@mantine/core";

function MobileToggle({ open, setOpen }: { open?: boolean; setOpen?: UseState<boolean> }) {
  if (open === undefined || setOpen === undefined) {
    return null;
  }

  return (
    <Burger
      aria-label="Toggle navigation"
      className={"block md:hidden"}
      onClick={() => setOpen((o) => !o)}
      opened={open}
    />
  );
}

export default MobileToggle;
