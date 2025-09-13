import { Link } from "react-router";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import ThemeSwitch from "../../ui/ThemeSwitch";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <Logo />
      <div className="flex items-center gap-2">
        <Link to="/signup">
          <Button type="primary">Create Account</Button>
        </Link>
        <Link to="/login">
          <Button type="secondary">Login</Button>
        </Link>
        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
