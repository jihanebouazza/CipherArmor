import { useBadges } from "./useBadges";
import BadgeItem from "./BadgeItem";
import ContainerLoader from "../../ui/ContainerLoader";

function Badges() {
  const { badges, count, isPending } = useBadges();

  if (isPending) return <ContainerLoader />;

  return (
    <div className="flex flex-col items-center justify-between gap-3 py-1">
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
        />
         <BadgeItem
          key={badges[1].id}
          name={badges[1].name}
          badgeIcon={badges[1].icon}
          bgColor={badges[1].bg_color}
        />
    </div>
  );
}

export default Badges;
