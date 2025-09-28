import { Link } from "react-router";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import ThemeSwitch from "../../ui/ThemeSwitch";
import { useUser } from "../authentication/useUser";
import Loader from "../../ui/Loader";
import { useLogout } from "../authentication/useLogout";
import NavbarMenu from "./NavbarMenu";

function Navbar() {
  const { isPending, isAuthenticated, user } = useUser();
  const { logout, isLogingout } = useLogout();
  const firstName = user?.user_metadata?.fullName.split(" ")[0];
  const lastName = user?.user_metadata?.fullName.split(" ")[1];

  return (
    <nav className="dark:bg-charcoal-800 bg-ocean-100 sticky top-0 z-49 flex items-center justify-between px-8 py-6 2xl:px-25">
      <Logo />
      <div className="flex items-center gap-2">
        {isPending || isLogingout ? (
          <Loader width={20} borderWidth={4} />
        ) : isAuthenticated ? (
          <NavbarMenu
            firstName={firstName}
            lastName={lastName}
            logout={logout}
          />
        ) : (
          <>
            <Link to="/signup" className="hidden md:block">
              <Button type="primary">Create Account</Button>
            </Link>
            <Link to="/login">
              <Button type="secondary">Login</Button>
            </Link>
          </>
        )}

        <ThemeSwitch />
      </div>
    </nav>
  );
}

export default Navbar;
