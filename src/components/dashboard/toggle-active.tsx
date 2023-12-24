import CustomSwitch from "@/components/custom-switch";

function ToggleActive({ active, onChange }: { active: boolean; onChange: (active: boolean) => void }) {
  return (
    <div className={"my-3"}>
      <CustomSwitch
        checked={active}
        color="teal"
        label={"Module enabled"}
        labelPosition={"left"}
        onChange={(checked) => {
          onChange(checked);
        }}
      />
    </div>
  );
}

export default ToggleActive;
