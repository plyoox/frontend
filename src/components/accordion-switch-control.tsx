import { Accordion, AccordionControlProps, Switch } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface Props extends AccordionControlProps {
  state: boolean;
  onStateChange: (state: boolean) => void;
}

function AccordionSwitchControl({ state, onStateChange, ...props }: Props) {
  return (
    <div className={"flex items-center"}>
      <Accordion.Control {...props} />

      <Switch
        checked={state}
        color="gray"
        mr={10}
        offLabel={<IconX color={"red"} size="1rem" stroke={3} />}
        onChange={(el) => {
          onStateChange(el.target.checked);
        }}
        onLabel={<IconCheck color={"green"} size="1rem" stroke={3} />}
        size="md"
      />
    </div>
  );
}

export default AccordionSwitchControl;
