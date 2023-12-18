import { API_URL } from "@/environment";
import { IconLogin } from "@tabler/icons-react";
import Link from "next/link";

function LoginButton() {
  return (
    <Link href={`${API_URL}/discord/login`}>
      <button className="flex h-12 items-center justify-center gap-4 rounded-lg bg-pl-accent-dark px-6 text-xl font-bold text-pl-text duration-200 hover:bg-pl-accent hover:shadow-pl-button sm:w-40">
        <span className="hidden sm:inline">Login</span>
        <IconLogin stroke={2} />
      </button>
    </Link>
  );
}

export default LoginButton;
