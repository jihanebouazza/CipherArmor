import { useBadges } from "./useBadges";
import BadgeItem from "./BadgeItem";
import ContainerLoader from "../../ui/ContainerLoader";

function BadgeTracker() {
  const { badges, isPending } = useBadges();

  if (isPending) return <ContainerLoader />;

  // const stats = {
  //   password_health: 92,
  //   weak_count: 0,
  //   strong_count: 50,
  //   reused_count: 0,
  //   total_count: 50,
  //   vault_count: 6,
  //   breach_count: 0,
  //   max_password_age: 70,
  // };

  // checkAndAwardBadges(user.id, stats);

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
        isLocked
      />
      <BadgeItem
        key={badges[2].id}
        name={badges[2].name}
        badgeIcon={badges[2].icon}
        bgColor={badges[2].bg_color}
      />
    </div>
  );
}

export default BadgeTracker;
