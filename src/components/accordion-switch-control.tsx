import CustomSwitch from "@/components/custom-switch";
import { Accordion, type AccordionControlProps } from "@mantine/core";

interface Props extends AccordionControlProps {
  state: boolean;
  onStateChange: (state: boolean) => void;
}

function AccordionSwitchControl({ state, onStateChange, ...props }: Props) {
  return (
    <div className={"flex items-center rounded-sm hover:bg-mt-dark-6"}>
      <Accordion.Control {...props} />

      <CustomSwitch
        checked={state}
        color={"gray"}
        onChange={(checked) => {
          onStateChange(checked);
        }}
        onIconColor={"green"}
      />
    </div>
  );
}

export default AccordionSwitchControl;
