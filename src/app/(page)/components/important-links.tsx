import Link from "next/link";
import classes from "@/styles/important-links.module.css";

interface Props {
  className?: string;
}

function ImportantLinks({ className }: Props) {
  return (
    <div className={`w-full rounded-lg bg-pl-text p-8 text-black md:p-16 lg:max-w-[445px] ${className}`}>
      <h2 className="text-3xl font-bold tracking-wide">Important Links</h2>

      <ul className="mt-2">
        <li>
          <Link className={classes.importantLink} href={""}>
            Documentation
          </Link>
        </li>
        <li className="mt-1">
          <Link className={classes.importantLink} href={""}>
            Support Server
          </Link>
        </li>
        <li className="mt-1">
          <Link className={classes.importantLink} href={""}>
            Invite the Bot
          </Link>
        </li>
        <li className="mt-1">
          <Link className={classes.importantLink} href={""}>
            Source Code
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ImportantLinks;
