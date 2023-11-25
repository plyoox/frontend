interface Props {
  label: string;
  description: string;
}

function InfoHeading({ label, description }: Props) {
  return (
    <div className="mt-1.5">
      <p className={"text-sm font-medium"}>{label}</p>
      <p className={"text-mt-dark-2 text-xs my-0.5"}>{description}</p>
    </div>
  );
}

export default InfoHeading;
