import MobileToggle from "@/components/app-shell/header/components/mobile-toggle";
import type { UseState } from "@/types/react";
import LoginView from "./components/login-view";
import Logo from "./components/logo";

interface NavbarProps {
  setOpen?: UseState<boolean>;
  open?: boolean;
}

function Header({ setOpen, open }: NavbarProps) {
  return (
    <nav className="bg-mt-dark-7 px-2">
      <div className="container mx-auto flex h-[70px] items-center justify-between">
        <div className={"flex items-center gap-2"}>
          <MobileToggle open={open} setOpen={setOpen} />
          <Logo />
        </div>

        <LoginView />
      </div>
    </nav>
  );
}

export default Header;
