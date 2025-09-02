import BadgeItem from "./BadgeItem";
import ContainerLoader from "../../ui/ContainerLoader";
import { useDashboardStats } from "../../contexts/DashboardStatsContext ";
import { useAllVaults } from "../vaults/useAllVaults";
import { useUser } from "../authentication/useUser";
import { checkAndAwardBadges } from "../../services/apiBadges";
import { useEffect, useMemo } from "react";
import { useDetailedEarnedBadges } from "./useDetailedEarnedBadges";

function BadgeTracker() {
  const { count: vaultsCount, isPending: isPendingVaults } = useAllVaults();
  const { user, isPending: isPendingUser } = useUser();
  const { earnedBadges, isPending: isPendingEarnedBadges } =
    useDetailedEarnedBadges(user.id);

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

  if (isPendingVaults || isPendingUser || isPendingEarnedBadges)
    return <ContainerLoader />;

  console.log(earnedBadges[0]?.badges?.icon);

  return (
    <div className="flex items-center justify-between gap-3 px-6 py-1 md:flex-col md:px-0">
      {(!earnedBadges || earnedBadges.length === 0) && (
        <div className="flex min-h-[240px] w-full items-center justify-center text-center">
          No badges yet!
        </div>
      )}
      {earnedBadges[0] && (
        <BadgeItem
          key={earnedBadges[0]?.badges?.id}
          name={earnedBadges[0]?.badges?.name}
          badgeIcon={earnedBadges[0]?.badges?.icon}
          bgColor={earnedBadges[0]?.badges?.bg_color}
        />
      )}
      {earnedBadges[1] && (
        <BadgeItem
          key={earnedBadges[1]?.badges?.id}
          name={earnedBadges[1]?.badges?.name}
          badgeIcon={earnedBadges[1]?.badges?.icon}
          bgColor={earnedBadges[1]?.badges?.bg_color}
        />
      )}
    </div>
  );
}

export default BadgeTracker;
