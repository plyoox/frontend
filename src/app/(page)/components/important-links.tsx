import Link from "next/link";
import classes from "@/styles/important-links.module.css";

interface Props {
  className?: string;
}

function ImportantLinks({ className }: Props) {
  return (
    <div className={`bg-pl-text text-black p-8 rounded-lg md:p-16 lg:max-w-[445px] w-full ${className}`}>
      <h2 className="font-bold text-3xl tracking-wide">Important Links</h2>

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
