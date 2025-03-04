import { useState } from "react";
import { useLogout } from "../authentication/useLogout";
import ContainerLoader from "../../ui/ContainerLoader";
import Logo from "../../ui/Logo";
import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineBars3CenterLeft,
  HiOutlineChartPie,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import DashboardSidebarItem from "./DashboardSidebarItem";
import { GoShieldLock } from "react-icons/go";
import { PiVault } from "react-icons/pi";

export default function DashboardNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logout, isLogingout } = useLogout();

  function handleSidebarExpansion() {
    setIsExpanded((isExpanded) => !isExpanded);
  }

  if (isLogingout) return <ContainerLoader />;

  return (
    <>
      <nav
        className={`dark:shadow-charcoal-700 bg-ocean-100 dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-100 fixed top-0 bottom-0 z-99 flex transition-all duration-300 ${isExpanded ? "w-68 px-6 py-4" : "w-16 items-center p-4"} flex-col justify-between shadow-md`}
      >
        <div className="space-y-4">
          <div
            className={`${isExpanded ? "mb-6 flex items-end justify-between" : "space-y-6"} `}
          >
            <Logo textVisible={isExpanded} />
            <HiOutlineBars3CenterLeft
              size={24}
              className={`cursor-pointer ${isExpanded ? "rotate-180" : "items-center justify-center"}`}
              onClick={handleSidebarExpansion}
            />
          </div>
          <DashboardSidebarItem
            Icon={<HiOutlineChartPie size={24} />}
            isExpanded={isExpanded}
            content="Dashboard"
            link="/dashboard"
          />
          <DashboardSidebarItem
            Icon={<GoShieldLock size={24} />}
            isExpanded={isExpanded}
            content="Passwords"
            link="/passwords"
          />
          <DashboardSidebarItem
            Icon={<PiVault size={24} />}
            isExpanded={isExpanded}
            content="Vaults"
            link="/vaults"
          />
          <DashboardSidebarItem
            Icon={<HiOutlineCog6Tooth size={24} />}
            isExpanded={isExpanded}
            content="Settings"
            link="/settings"
          />
        </div>
        <div className="before:bg-charcoal-300 relative before:absolute before:-top-3 before:h-[0.5px] before:w-full">
          <div
            className="flex cursor-pointer items-center gap-2 font-medium"
            onClick={logout}
          >
            <HiOutlineArrowRightStartOnRectangle size={24} />

            <p className={`${isExpanded ? "block" : "hidden"}`}>Logout</p>
          </div>
        </div>
      </nav>
      {isExpanded && (
        <div
          className="bg-ocean-100/40 dark:bg-charcoal-800/40 fixed inset-y-0 right-0 left-64 z-50 backdrop-blur-sm"
          onClick={handleSidebarExpansion}
        ></div>
      )}
    </>
  );
}
