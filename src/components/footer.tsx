import { COMMIT_REF } from "@/environment";
import Link from "next/link";

function Footer() {
  return (
    <footer className={"w-full bg-mt-dark-7 p-2"}>
      <div className={"container mx-auto flex items-center justify-between"}>
        <p>© Copyright 2024 JohannesIBK</p>

        <div className={"flex gap-2 text-sm"}>
          <Link className={"text-mt-dark-0 underline"} href={"privacy"} prefetch={false}>
            Datenschutzerklärung
          </Link>
          <Link className={"text-mt-dark-0 underline"} href={"legal-notice"} prefetch={false}>
            Impressum
          </Link>
        </div>
      </div>

      <div className={"text-center text-xs"}>Git: {COMMIT_REF}</div>
    </footer>
  );
}

export default Footer;
