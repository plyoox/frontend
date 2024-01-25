import { clsx } from "clsx";

function Divider({ className }: { className?: string }) {
  return <div className={clsx("w-full border-t", className)}></div>;
}

export default Divider;
