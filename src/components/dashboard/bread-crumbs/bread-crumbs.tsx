import BackButton from "@/components/dashboard/bread-crumbs/back-button";
import DynamicCrumbs from "@/components/dashboard/bread-crumbs/dynamic-crumbs";
import Link from "next/link";

export function BreadCrumbs() {
  return (
    <ul className={"list-none flex gap-2 p-0 items-center m-0"}>
      <li className={"hover:underline font-medium text-blue-400"}>
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
