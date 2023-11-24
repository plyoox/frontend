import Image from "next/image";
import Link from "next/link";
import logo from "@//public/plyoox.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src={logo} className="h-14 w-14" alt="plyoox logo" />

      <div className="uppercase font-black text-xl">
        <span className="text-3xl">P</span>lyoox
      </div>
    </Link>
  );
}

export default Logo;
