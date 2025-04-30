import { FcPrivacy, FcUnlock } from "react-icons/fc";
import Tooltip from "../../ui/Tooltip";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function BadgeItem({
  badgeIcon,
  name,
  bgColor,
  isLocked = false,
  description = "",
}) {
  const renderSvg = (svgString) => {
    const div = document.createElement("div");
    div.innerHTML = svgString.trim();
    return div.firstChild;
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative rounded-xl p-1"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className="h-17 w-17"
          ref={(el) => el && el.replaceChildren(renderSvg(badgeIcon))}
        />
        <div className="bg-blanc-100 shadow-ocean-200 dark:shadow-charcoal-200 border-ocean-200 dark:border-charcoal-200 dark:bg-charcoal-50 absolute -top-3 -right-2 rounded-full border p-1 shadow-sm">
          {isLocked ? <FcPrivacy size={20} /> : <FcUnlock size={20} />}
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        {description && (
          <Tooltip>
            <Tooltip.Trigger isButton>
              <button className="cursor-pointer">
                <HiOutlineInformationCircle
                  size={15}
                  className="text-charcoal-600 dark:text-charcoal-200 shrink-0"
                />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p className="dark:text-charcoal-100 text-sm">{description}</p>
            </Tooltip.Content>
          </Tooltip>
        )}
        <p className="dark:text-charcoal-100 text-center text-sm font-medium">
          {name}
        </p>
      </div>
    </div>
  );
}

export default BadgeItem;
