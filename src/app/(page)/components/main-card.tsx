import SellingPoint from "./selling-point";

interface Props {
  className?: string;
}

function MainCard({ className }: Props) {
  return (
    <div className={`p-8 rounded-lg bg-pl-card md:p-16 w-full lg:max-w-[575px] ${className}`}>
      <span className="text-4xl whitespace-nowrap">
        A{" "}
        <span className="bg-gradient-to-r from-pl-accent to-pl-primary bg-clip-text text-transparent font-black italic tracking-wider">
          modern
        </span>
      </span>
      <br />
      <span className="text-5xl font-black whitespace-nowrap">
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
