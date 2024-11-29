import { NO_ROLES_AVAILABLE } from "@/lib/constants";
import type { RoleItem } from "@/types/utils";
import { CheckIcon, CloseButton, Combobox, Pill, PillsInput, useCombobox } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  data: RoleItem[];
  description?: string;
  label: string;
  onChange: (values: string[]) => void;
  value: string[];
  placeholder?: string;
  missingPermission?: boolean;
  maxValues?: number;
}

function MultiRoleSelect({
  data,
  description,
  label,
  onChange,
  value,
  placeholder,
  missingPermission,
  maxValues,
}: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");

  const handleValueSelect = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else if (maxValues === undefined || value.length <= maxValues) {
      onChange([...value, val]);
    }
  };

  const handleValueRemove = (val: string) => onChange(value.filter((v) => v !== val));

  const currentValues = data
    .filter((r) => value.includes(r.value))
    .map((item) => (
      <Pill withRemoveButton key={item.value} onRemove={() => handleValueRemove(item.value)}>
        <div className={"flex items-center gap-1"}>
          <span className={"inline-block size-3 rounded-full"} style={{ backgroundColor: item.color }} />
          {item.label}
        </div>
      </Pill>
    ));

  const options = data
    .filter((item) => item.label.includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option active={value.includes(item.value)} key={item.value} value={item.value}>
        <div className={"flex items-center gap-2"}>
          {value.includes(item.value) ? (
            <CheckIcon color={item.color} size={12} />
          ) : (
            <span className={"size-3 rounded-full"} style={{ backgroundColor: item.color }} />
          )}
          <span>{item.label}</span>
        </div>
      </Combobox.Option>
    ));

  return (
    <Combobox onOptionSubmit={handleValueSelect} store={combobox} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          description={description}
          label={label}
          leftSection={<IconAt size={16} />}
          onClick={() => combobox.openDropdown()}
          rightSection={
            value.length !== 0 ? (
              <CloseButton
                aria-label="Clear value"
                onClick={() => onChange([])}
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                onMouseDown={(event: any) => event.preventDefault()}
                size="sm"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
        >
          <Pill.Group>
            {currentValues}

            <Combobox.EventsTarget>
              <PillsInput.Field
                disabled={missingPermission}
                onBlur={() => combobox.closeDropdown()}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onFocus={() => combobox.openDropdown()}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();

                    const valueToRemove = value.at(-1);
                    if (valueToRemove !== undefined) {
                      handleValueRemove(valueToRemove);
                    }
                  }
                }}
                placeholder={missingPermission ? "Missing *Manage Role* permission" : placeholder}
                value={search}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>{NO_ROLES_AVAILABLE}</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default MultiRoleSelect;
