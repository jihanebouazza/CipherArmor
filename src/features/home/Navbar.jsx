import { Link } from "react-router";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import ThemeSwitch from "../../ui/ThemeSwitch";
import { useUser } from "../authentication/useUser";
import Loader from "../../ui/Loader";
import Menu from "../../ui/Menu";
import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineChartPie,
} from "react-icons/hi2";
import { useLogout } from "../authentication/useLogout";

function Navbar() {
  const { isPending, isAuthenticated, user } = useUser();
  const { logout, isLogingout } = useLogout();
  const firstName = user?.user_metadata?.fullName.split(" ")[0];
  const lastName = user?.user_metadata?.fullName.split(" ")[1];

  return (
    <nav className="dark:bg-charcoal-800 bg-ocean-100 sticky top-0 z-49 flex items-center justify-between px-8 py-6">
      <Logo />
      <div className="flex items-center gap-2">
        {isPending || isLogingout ? (
          <Loader width={20} borderWidth={4} />
        ) : isAuthenticated ? (
          <Menu>
            <Menu.Toggle id="user menu">
              <div className="border-r-charcoal-300 group flex cursor-pointer items-center gap-2 border-r px-4">
                <div className="bg-ocean-150 dark:bg-charcoal-600 outline-ocean-150 rounded-full px-2.5 py-1.5 text-lg font-semibold outline outline-offset-2 transition-all duration-200 group-hover:scale-103">
                  {firstName[0] + lastName[0]}
                </div>
                <div>
                  <p className="text-sm leading-4 group-hover:text-base text-left">
                    {firstName}
                  </p>
                  <p className="text-charcoal-700 dark:text-charcoal-200 text-sm leading-4 font-light">
                    {lastName}
                  </p>
                </div>
              </div>
            </Menu.Toggle>
            <Menu.List id="user menu">
              <Menu.ListButton Icon={<HiOutlineChartPie />}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.ListButton>

              <Menu.ListButton
                Icon={<HiOutlineArrowRightStartOnRectangle />}
                onClick={logout}
              >Logout</Menu.ListButton>
            </Menu.List>
          </Menu>
        ) : (
          <>
            <Link to="/signup">
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
