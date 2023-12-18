import SellingPoint from "./selling-point";

interface Props {
  className?: string;
}

function MainCard({ className }: Props) {
  return (
    <div className={`w-full rounded-lg bg-pl-card p-8 md:p-16 lg:max-w-[575px] ${className}`}>
      <span className="whitespace-nowrap text-4xl">
        A{" "}
        <span className="bg-gradient-to-r from-pl-accent to-pl-primary bg-clip-text font-black italic tracking-wider text-transparent">
          modern
        </span>
      </span>
      <br />
      <span className="whitespace-nowrap text-5xl font-black">
        <span>Discord Bot</span>
      </span>

      <div className="mt-16">
        <SellingPoint text="Advanced Automoderation" />
        <SellingPoint text="Customizable Levelsystem" />
        <SellingPoint text="Easy-to-use Dashboard" />
        <SellingPoint text="Open Source" />
      </div>
    </div>
  );
}

export default MainCard;
