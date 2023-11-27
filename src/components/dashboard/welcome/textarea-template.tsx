import { Button, Popover, Tooltip } from "@mantine/core";
import { IconTemplate } from "@tabler/icons-react";
import { RefObject, useState } from "react";
import { TemplateString } from "@/types/welcome";

interface Props {
  textarea: RefObject<HTMLTextAreaElement>;
  template: TemplateString[];
}

function TextareaTemplate({ textarea, template }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  function typeInTextarea(text: string): void {
    if (!textarea.current) return;

    const [start, end] = [textarea.current.selectionStart || 0, textarea.current.selectionEnd || 0];

    textarea.current.setRangeText(text, start, end, "end");
    textarea.current.focus();
    setOpen(false);
  }

  return (
    <Popover withArrow onClose={() => setOpen(false)} opened={open} position="left" shadow="md" width="250px">
      <Popover.Target>
        <IconTemplate onClick={() => setOpen(!open)} style={{ cursor: "pointer" }} />
      </Popover.Target>
      <Popover.Dropdown>
        {template.map((t) => {
          if (t.info) {
            return (
              <Tooltip withArrow color="dark" key={t.value} label={t.info}>
                <Button onClick={() => typeInTextarea(t.value)} variant="subtle">
                  {t.name}
                </Button>
              </Tooltip>
            );
          }

          return (
            <Button key={t.value} onClick={() => typeInTextarea(t.value)} variant="subtle">
              {t.name}
            </Button>
          );
        })}
      </Popover.Dropdown>
    </Popover>
  );
}

export default TextareaTemplate;
