import LoginView from "./components/login-view";
import Logo from "./components/logo";

interface NavbarProps {
  setOpen?: (value: any) => void;
  open?: boolean;
}

function Header({ setOpen, open }: NavbarProps) {
  return (
    <nav className="border-b border-b-dark-4 bg-mt-dark-7 px-2">
      <div className="container mx-auto flex h-[70px] items-center justify-between">
        <Logo />

        <LoginView />
      </div>
    </nav>
  );
}

export default Header;
