import { HiOutlineArrowRightStartOnRectangle, HiOutlineChartPie } from "react-icons/hi2";
import Menu from "../../ui/Menu";
import { Link } from "react-router";

function NavbarMenu({firstName, lastName, logout}) {
  return (
    <Menu>
      <Menu.Toggle id="user menu">
        <div className="border-r-charcoal-300 group flex cursor-pointer items-center gap-2 border-r px-4">
          <div className="bg-ocean-150 dark:bg-charcoal-600 outline-ocean-150 rounded-full px-2.5 py-1.5 text-lg font-semibold outline outline-offset-2 transition-all duration-200 group-hover:scale-103">
            {firstName[0] + lastName[0]}
          </div>
          <div>
            <p className="text-left text-sm leading-4 group-hover:text-base">
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
        >
          Logout
        </Menu.ListButton>
      </Menu.List>
    </Menu>
  );
}

export default NavbarMenu;
