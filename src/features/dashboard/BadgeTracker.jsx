import { useBadges } from "./useBadges";
import BadgeItem from "./BadgeItem";
import ContainerLoader from "../../ui/ContainerLoader";
import { useDashboardStats } from "../../contexts/DashboardStatsContext ";
import { useAllVaults } from "../vaults/useAllVaults";
import { useUser } from "../authentication/useUser";
import { checkAndAwardBadges } from "../../services/apiBadges";
import { useEffect, useMemo } from "react";

function BadgeTracker() {
  const { badges, isPending: isPendingBadges } = useBadges();
  const { count: vaultsCount, isPending: isPendingVaults } = useAllVaults();
  const { user, isPending: isPendingUser } = useUser();

  const {
    passwordHealth,
    safePercent,
    strengthCounts,
    breachedPasswords,
    reusedPasswords,
    passwordsCount,
    maxPasswordAge,
  } = useDashboardStats();

  const stats = useMemo(
    () => ({
      password_health: passwordHealth,
      weak_count: strengthCounts["Weak"],
      moderate_count: strengthCounts["Moderate"],
      reused_count: reusedPasswords,
      total_count: passwordsCount,
      vault_count: vaultsCount,
      breach_count: breachedPasswords,
      max_password_age: maxPasswordAge,
      safe_percent: safePercent,
    }),
    [
      passwordHealth,
      strengthCounts,
      reusedPasswords,
      passwordsCount,
      vaultsCount,
      breachedPasswords,
      maxPasswordAge,
      safePercent,
    ],
  );

  useEffect(() => {
    if (!user.id || !stats) return;

    const run = async () => {
      try {
        await checkAndAwardBadges(user.id, stats);
      } catch (err) {
        console.error("Failed to award badges:", err);
      }
    };

    run();
  }, [user.id, stats]);

  if (isPendingBadges || isPendingVaults || isPendingUser)
    return <ContainerLoader />;

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
