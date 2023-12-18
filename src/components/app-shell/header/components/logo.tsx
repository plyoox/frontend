import Image from "next/image";
import Link from "next/link";
import logo from "@//public/plyoox.png";

function Logo() {
  return (
    <Link className="flex items-center gap-3" href="/">
      <Image alt="plyoox logo" className="h-14 w-14" src={logo} />

      <div className="text-xl font-black uppercase text-white">
        <span className="text-3xl">P</span>lyoox
      </div>
    </Link>
  );
}

export default Logo;
