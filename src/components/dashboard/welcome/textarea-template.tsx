import type { TemplateString } from "@/types/welcome";
import { ActionIcon, Button, Popover, Tooltip } from "@mantine/core";
import { IconTemplate } from "@tabler/icons-react";
import { type RefObject, useState } from "react";

interface Props {
  textarea: RefObject<HTMLTextAreaElement>;
  template: TemplateString[];
  onChange: (value: string) => void;
}

function TextareaTemplate({ textarea, template, onChange }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  function typeInTextarea(text: string): void {
    if (!textarea.current) return;

    const [start, end] = [textarea.current.selectionStart || 0, textarea.current.selectionEnd || 0];

    textarea.current.setRangeText(text, start, end, "end");
    textarea.current.focus();

    setOpen(false);
    onChange(textarea.current.value);
  }

  return (
    <Popover withArrow onClose={() => setOpen(false)} opened={open} position="left" shadow="md" width="250px">
      <Popover.Target>
        <ActionIcon
          aria-label={"Open message placeholder"}
          color={"blue"}
          onClick={() => setOpen(!open)}
          variant={"light"}
        >
          <IconTemplate />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        {template.map((t) => {
          const button = (
            <Button key={t.value} onClick={() => typeInTextarea(t.value)} size={"xs"} variant={"subtle"}>
              {t.name}
            </Button>
          );

          if (t.info) {
            return (
              <Tooltip withArrow key={t.info + t.value} label={t.info}>
                {button}
              </Tooltip>
            );
          }

          return button;
        })}
      </Popover.Dropdown>
    </Popover>
  );
}

export default TextareaTemplate;
