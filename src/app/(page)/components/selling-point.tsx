import { IconChevronsRight } from "@tabler/icons-react";

interface Props {
  text: string;
}

function SellingPoint({ text }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <IconChevronsRight className="text-pl-primary" size={24} />
      <span className="text-lg font-normal">{text}</span>
    </div>
  );
}

export default SellingPoint;
