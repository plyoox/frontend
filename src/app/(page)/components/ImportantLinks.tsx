import { FC } from "react";
import classes from "./ImportantLinks.module.css";
import Link from "next/link";

interface Props {
  className?: string;
}

function ImportantLinks({ className }: Props) {
  return (
    <div
      className={`bg-pl-text text-black p-8 rounded-lg md:p-16 lg:max-w-[445px] w-full ${className}`}
    >
      <h2 className="font-bold text-3xl tracking-wide">Important Links</h2>

      <ul className="mt-2">
        <li>
          <Link href={""} className={classes.importantLink}>
            Documentation
          </Link>
        </li>
        <li className="mt-1">
          <Link href={""} className={classes.importantLink}>
            Support Server
          </Link>
        </li>
        <li className="mt-1">
          <Link href={""} className={classes.importantLink}>
            Invite the Bot
          </Link>
        </li>
        <li className="mt-1">
          <Link href={""} className={classes.importantLink}>
            Source Code
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ImportantLinks;
