import BackButton from "@/components/dashboard/bread-crumbs/back-button";
import DynamicCrumbs from "@/components/dashboard/bread-crumbs/dynamic-crumbs";
import Link from "next/link";

export function BreadCrumbs() {
  return (
    <ul className={"m-0 flex list-none items-center gap-2 p-0"}>
      <li className={"font-medium text-blue-400 hover:underline"}>
        <Link href="/dashboard">Server List</Link>
      </li>
      <DynamicCrumbs />

      <li className="ml-auto">
        <BackButton />
      </li>
    </ul>
  );
}

export default BreadCrumbs;
