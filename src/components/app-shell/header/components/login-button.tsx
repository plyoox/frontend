import { IconLogin } from "@tabler/icons-react";
import { API_URL } from "@/environment";
import Link from "next/link";

function LoginButton() {
  return (
    <Link href={`${API_URL}/discord/login`}>
      <button className="bg-pl-accent-dark text-pl-text rounded-lg text-xl font-bold flex h-12 items-center gap-4 justify-center sm:w-40 px-6 hover:bg-pl-accent duration-200 hover:shadow-pl-button">
        <span className="hidden sm:inline">Login</span>
        <IconLogin stroke={2} />
      </button>
    </Link>
  );
}

export default LoginButton;
