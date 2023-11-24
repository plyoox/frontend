function AccordionLabel({ label, description }: { label: string; description: string }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-pl-text">{label}</h3>
      <span className={"font-normal text-sm text-mt-dark-2"}>{description}</span>
    </>
  );
}

export default AccordionLabel;
