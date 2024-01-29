import { API_URL } from "@/environment";
import { IconLogin } from "@tabler/icons-react";
import Link from "next/link";

function LoginButton() {
  return (
    <Link href={`${API_URL}/discord/login`}>
      <button
        className={
          "hover:shadow-ring flex h-12 items-center justify-center gap-4 rounded-lg bg-pl-accent-dark text-white duration-200 hover:bg-pl-accent hover:shadow-pl-accent/80 sm:w-40"
        }
      >
        <span className="hidden text-xl font-bold sm:block">Login</span>
        <IconLogin stroke={2} />
      </button>
    </Link>
  );
}

export default LoginButton;
