import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import ThemeSwitch from "../../ui/ThemeSwitch";

function Navbar() {
  return (
    <nav className="bg-ocean-150 flex items-center justify-between px-8 py-6">
      <Logo />
      <div className="flex items-center gap-2">
        <Button type="primary">Create Account</Button>
        <Button type="secondary">Login</Button>
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
