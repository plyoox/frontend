import type { SelectItem } from "@/types/utils";
import {
  CheckIcon,
  CloseButton,
  Combobox,
  type ComboboxItemGroup,
  Pill,
  PillsInput,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import { IconHash, IconListDetails, IconVolume } from "@tabler/icons-react";
import { type JSX, type ReactNode, useMemo, useState } from "react";

const ICONS: Record<string, JSX.ElementType> = {
  text: IconHash,
  voice: IconVolume,
  category: IconListDetails,
};

interface Props {
  label?: string;
  description?: string;
  data: ComboboxItemGroup<SelectItem>[];
  maxValues?: number;
  placeholder?: string;
  value: string[];
  leftSection?: ReactNode;
  onChange: (value: string[]) => void;
}

export function MultiChannelSelect({
  data,
  maxValues,
  placeholder,
  value,
  label,
  description,
  leftSection,
  onChange,
}: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const flattenItems = useMemo(() => {
    return data.flatMap((i) => i.items);
  }, [data]);

  const [search, setSearch] = useState<string>("");

  const handleValueSelect = (val: string) => {
    onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
  };

  const handleValueRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const values = flattenItems
    .filter((i) => value.includes(i.value))
    .map((item) => (
      <Pill withRemoveButton key={item.value} onRemove={() => handleValueRemove(item.value)}>
        {item.label}
      </Pill>
    ));

  const options = data.flatMap((group) => {
    const items = group.items.filter((item) => item.label.toLowerCase().includes(search.trim().toLowerCase()));

    if (!items.length) return [];

    return (
      <Combobox.Group key={group.group} label={group.group}>
        {items.map((item) => {
          const Icon = ICONS[item.type];

          return (
            <Combobox.Option
              active={value.includes(item.value)}
              disabled={!!(maxValues && value.length >= maxValues) && !value.includes(item.value)}
              key={item.value}
              value={item.value}
            >
              <div className={"flex items-center gap-2"}>
                {value.includes(item.value) ? <CheckIcon size={12} /> : null}
                {Icon ? <Icon size={16} title={item.type} /> : null}

                <span className={"text-mt-dark-0"}>{item.label}</span>
              </div>
            </Combobox.Option>
          );
        })}
      </Combobox.Group>
    );
  });

  return (
    <Combobox onOptionSubmit={handleValueSelect} store={combobox} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          pointer
          description={description}
          label={label}
          leftSection={leftSection}
          onClick={() => combobox.openDropdown()}
          rightSection={
            value.length !== 0 ? (
              <CloseButton
                aria-label="Clear value"
                onClick={() => onChange([])}
                onMouseDown={(event) => event.preventDefault()}
                size="sm"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
        >
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onBlur={() => combobox.closeDropdown()}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onFocus={() => combobox.openDropdown()}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
                placeholder={placeholder}
                value={search}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      {options.length > 1 && (
        <Combobox.Dropdown hidden={options.length === 0}>
          <ScrollArea.Autosize mah={"200"}>
            <Combobox.Options>{options}</Combobox.Options>
          </ScrollArea.Autosize>
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
}

export default MultiChannelSelect;
