function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      className={"rounded-md bg-blue-400/30 px-1.5 py-0.5 font-semibold text-blue-100 hover:underline"}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default ExternalLink;
