import classes from "@/styles/important-links.module.css";
import Link from "next/link";

interface Props {
  className?: string;
}

function ImportantLinks({ className }: Props) {
  return (
    <div className={`w-full rounded-lg bg-pl-text p-8 text-black md:p-16 lg:max-w-[445px] ${className}`}>
      <h2 className="text-3xl font-bold tracking-wide">Important Links</h2>

      <ul className="mt-2">
        <li>
          <Link className={classes.importantLink} href={"https://wiki.plyoox.net"} target={"_blank"}>
            Documentation
          </Link>
        </li>
        <li className="mt-1">
          <Link className={classes.importantLink} href={"https://discord.gg/5qPPvQe"} target={"_blank"}>
            Support Server
          </Link>
        </li>
        <li className="mt-1">
          <Link
            className={classes.importantLink}
            href={
              "https://discord.com/oauth2/authorize?client_id=505433541916622850&scope=bot+applications.commands&permissions=275146828846"
            }
          >
            Invite the Bot
          </Link>
        </li>
        <li className="mt-1">
          <Link className={classes.importantLink} href={"https://github.com/plyoox/plyoox-v3"} target={"_blank"}>
            Source Code
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ImportantLinks;
