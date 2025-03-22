import clsx from "clsx";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function BadgeItem({ badgeIcon, name, bgColor, Icon }) {
  const renderSvg = (svgString) => {
    const div = document.createElement("div");
    div.innerHTML = svgString.trim();
    return div.firstChild;
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={clsx(
        "relative rounded-xl p-1",
        bgColor || "bg-ocean-500", // Fallback color
        "!important" // Force override if needed
      )}>
        <div
          className="h-17 w-17"
          ref={(el) => el && el.replaceChildren(renderSvg(badgeIcon))}
        />
        <div className="bg-blanc-100 shadow-ocean-200 dark:shadow-charcoal-200 border-ocean-200 dark:border-charcoal-200 dark:bg-charcoal-50 absolute -top-3 -right-2 rounded-full border p-1 shadow-sm">
          {Icon}
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <p className="dark:text-charcoal-100 text-center text-sm font-medium">
          {name}
        </p>
        <HiOutlineInformationCircle
          size={14}
          className="text-charcoal-600 dark:text-charcoal-200 shrink-0"
        />
      </div>
    </div>
  );
}

export default BadgeItem;
