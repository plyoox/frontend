import InfoHeading from "@/components/dashboard/info-heading";
import { LEVEL_GAIN_MULTIPLIER_MARKS } from "@/lib/constants";
import type { LevelingResponse } from "@/types/responses";
import { Slider } from "@mantine/core";

function LevelGainMultiplier({
  config,
  handleChange,
}: {
  config: LevelingResponse;
  handleChange: (config: Partial<LevelingResponse>) => void;
}) {
  return (
    <>
      <InfoHeading description="How much more XP server booster should receive." label="Booster XP Multiplier" />
      <Slider
        label={(value) => `${value.toFixed(1)}x`}
        marks={LEVEL_GAIN_MULTIPLIER_MARKS}
        max={2}
        mb={25}
        min={1}
        onChangeEnd={(value) => handleChange({ booster_xp_multiplier: value === 1 ? null : value })}
        step={0.1}
        value={config?.booster_xp_multiplier || 1}
      />
    </>
  );
}

export default LevelGainMultiplier;
