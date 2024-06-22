import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

function LegacyRuleLink() {
  return (
    <Link
      className="my-2.5 flex h-16 w-full items-center justify-between rounded-md bg-mt-dark-6 p-4 duration-300 hover:bg-mt-dark-5"
      href={"moderation/legacy-rules"}
    >
      <span className={"text-xl font-semibold text-pl-text"}>Legacy Rules</span>
      <IconChevronRight />
    </Link>
  );
}

export default LegacyRuleLink;
