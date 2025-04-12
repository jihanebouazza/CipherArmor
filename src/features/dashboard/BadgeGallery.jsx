import { HiOutlineCheck } from "react-icons/hi2";
import Loader from "../../ui/Loader";
import BadgeItem from "./BadgeItem";
import { useBadges } from "./useBadges";

function BadgeGallery() {
  const { badges, count, isPending } = useBadges();

  if (isPending)
    return (
      <div className="flex h-full w-full items-center justify-center pb-4">
        <Loader secondColor="#fafbfd" borderWidth="5" width="40" />
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between px-2 pb-1">
        <h4 className="font-heading dark:text-charcoal-100 pb-1 text-xl font-semibold">
          All badges
        </h4>
        <p className="font-heading text-charcoal-700 dark:text-charcoal-200 font-medium">
          5/{count}
        </p>
      </div>
      <div className="custom-scrollbar max-h-[300px] overflow-y-auto py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 space-y-4 space-x-2">
          {badges?.map((badge) => (
            <BadgeItem
              key={badge.id}
              name={badge.name}
              badgeIcon={badge.icon}
              bgColor={badge.bg_color}
              description={badge.description}
              Icon={<HiOutlineCheck className="text-mint-500" size={16} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BadgeGallery;
