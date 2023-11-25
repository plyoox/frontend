import { NumberInput, Select } from "@mantine/core";
import InfoHeading from "@/components/dashboard/info-heading";
import React, { useMemo, useState } from "react";

interface DurationPickerProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  hideControls?: boolean;
  error?: boolean;
  allowDecimal?: boolean;
  defaultValue?: number;
  defaultUnit?: keyof DurationOptions;
}

const DURATION_OPTIONS: DurationOptions = {
  Seconds: { conversion: 1, defaultValue: 300, label: "Seconds" },
  Minutes: { conversion: 60, defaultValue: 5, label: "Minutes" },
  Hours: { conversion: 3600, defaultValue: 1, label: "Hours" },
  Days: { conversion: 86400, defaultValue: 1, label: "Days" },
  Weeks: { conversion: 604800, defaultValue: 1, label: "Weeks" },
  Months: { conversion: 2419200, defaultValue: 1, label: "Months (4 weeks)" },
};

function DurationPicker({
  value,
  onChange,
  min,
  max,
  hideControls,
  error,
  defaultUnit,
  label,
  description,
  allowDecimal,
  defaultValue,
}: DurationPickerProps) {
  const [conversion, setConversion] = useState<DurationOption>(DURATION_OPTIONS[defaultUnit ?? "Days"]);
  const [duration, setDuration] = useState<number>(
    (value ?? defaultValue) / DURATION_OPTIONS[defaultUnit ?? "Days"].conversion,
  );

  const duration_options: DurationOptions = useMemo(() => {
    const options = structuredClone(DURATION_OPTIONS);

    Object.keys(options).forEach((key) => {
      const value = options[key as keyof DurationOptions];

      if (max && value.conversion > max) {
        value.disabled = true;
      }
      if (min && value.defaultValue * value.conversion < min) {
        value.defaultValue = min / value.conversion;
      }

      options[key as keyof DurationOptions] = value;
    });

    return options;
  }, [max, min]);

  return (
    <div>
      <InfoHeading description={description} label={label} />

      <div className={"flex gap-2"}>
        <NumberInput
          required
          allowDecimal={allowDecimal}
          className={"flex-grow"}
          error={error}
          hideControls={hideControls}
          onChange={(event) => {
            if (typeof event === "string") return;

            const value = Math.floor(event) * conversion.conversion;

            if (min && value < min) {
              onChange(min);
              return;
            }

            if (max && value > max) {
              onChange(max);
              return;
            }

            setDuration(Math.floor(event));
            onChange(value);
          }}
          value={duration}
        />

        <Select
          allowDeselect={false}
          data={Object.entries(duration_options).map(([key, value]) => ({ value: key, label: value.label }))}
          onChange={(cur: any) => {
            const newConversion = duration_options[cur as keyof DurationOptions];

            if (newConversion.conversion === conversion.conversion) return;

            const max = Math.max(min ?? 1, newConversion.conversion * newConversion.defaultValue);
            const newDuration = Math.min(
              min ? Math.floor(min / newConversion.conversion) : 1,
              max ? Math.floor(max / newConversion.conversion) : 1,
            );

            setDuration(newDuration || 1);
            setConversion(newConversion);
            onChange(newConversion.conversion * newDuration);
          }}
          placeholder="Select duration"
          value={conversion.label}
        />
      </div>
    </div>
  );
}

export default DurationPicker;

interface DurationOptions {
  Seconds: DurationOption;
  Minutes: DurationOption;
  Hours: DurationOption;
  Days: DurationOption;
  Weeks: DurationOption;
  Months: DurationOption;
}

interface DurationOption {
  label: string;
  conversion: number;
  defaultValue: number;
  disabled?: boolean;
}
