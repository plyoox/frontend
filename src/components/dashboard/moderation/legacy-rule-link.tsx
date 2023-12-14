import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

function LegacyRuleLink() {
  return (
    <Link
      className="flex items-center justify-between bg-mt-dark-6 rounded-md p-4 w-full my-2.5 h-16 duration-300 hover:bg-mt-dark-5"
      href={`moderation/legacy-rules`}
    >
      <span className={"font-semibold text-xl text-pl-text"}>Legacy Rules</span>
      <IconChevronRight />
    </Link>
  );
}

export default LegacyRuleLink;
