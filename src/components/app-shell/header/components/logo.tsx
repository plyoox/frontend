import Image from "next/image";
import Link from "next/link";
import logo from "@//public/plyoox.png";

function Logo() {
  return (
    <Link className="flex items-center gap-3" href="/">
      <Image priority alt="plyoox logo" className="h-14 w-14" src={logo} />

      <div className="hidden text-xl font-black uppercase text-white sm:block">
        <span className="mr-0.5 text-3xl">P</span>lyoox
      </div>
    </Link>
  );
}

export default Logo;
