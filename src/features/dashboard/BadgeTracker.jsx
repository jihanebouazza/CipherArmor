import { useBadges } from "./useBadges";
import BadgeItem from "./BadgeItem";
import ContainerLoader from "../../ui/ContainerLoader";
import { FcPrivacy, FcUnlock } from "react-icons/fc";

function BadgeTracker() {
  const { badges, isPending } = useBadges();

  if (isPending) return <ContainerLoader />;

  return (
    <div className="flex items-center justify-between gap-3 px-6 py-1 md:flex-col md:px-0">
      {/* {badges?.map((badge) => (
        <BadgeItem
          key={badge.id}
          name={badge.name}
          badgeIcon={badge.icon}
          bgColor={badge.bg_color}
        />
      ))} */}
      <BadgeItem
        key={badges[0].id}
        name={badges[0].name}
        badgeIcon={badges[0].icon}
        bgColor={badges[0].bg_color}
        Icon={<FcUnlock size={20} />}
      />
      <BadgeItem
        key={badges[2].id}
        name={badges[2].name}
        badgeIcon={badges[2].icon}
        bgColor={badges[2].bg_color}
        Icon={<FcPrivacy size={20} />}
      />
    </div>
  );
}

export default BadgeTracker;
