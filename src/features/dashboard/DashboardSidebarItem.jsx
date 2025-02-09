import { NavLink } from "react-router";

function DashboardSidebarItem({ Icon, isExpanded, content, link }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex ${isExpanded ? "gap-2" : "items-center justify-center"} ${isExpanded && isActive ? "-mx-3 px-3 py-2" : "-mx-2 p-2"} font-medium ${isActive && "text-ocean-500 bg-ocean-150 dark:bg-blanc-100 rounded-xl"}`
      }
    >
      {Icon}
      <p className={`${isExpanded ? "block" : "hidden"}`}>{content}</p>
    </NavLink>
  );
}

export default DashboardSidebarItem;
