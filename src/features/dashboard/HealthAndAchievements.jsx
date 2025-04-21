import {
  getPasswordCountAchievement,
  getPasswordHealthAchievement,
  getProgress,
  getSafePasswordsAchievement,
} from "../../utils/achievementUtils";
import AchievementProgress from "./AchievementProgress";
import DashboardBox from "./DashboardBox";
import DashboardLoader from "./DashboardLoader";
import PasswordHealthChart from "./PasswordHealthChart";
import { usePasswordStrength } from "./usePasswordStrength";

function HealthAndAchievements() {
  const {
    passwordsCount,
    isPending,
    strengthPercentages,
    passwordsStats,
    strengthCounts,
  } = usePasswordStrength();

  const breachedPasswords =
    (passwordsStats?.filter((p) => p.is_breached === true).length * 100) /
    passwordsCount;
  const reusedPasswords =
    (passwordsStats?.filter((p) => p.is_reused === true).length * 100) /
    passwordsCount;

  const passwordHealth = Math.round(
    Math.max(
      0,
      Math.min(
        100,
        strengthPercentages["Very Strong"] * 1.4 +
          strengthPercentages["Strong"] * 1.2 +
          strengthPercentages["Resilient"] * 0.8 +
          strengthPercentages["Moderate"] * 0.5 -
          (strengthPercentages["Weak"] * 1.2 +
            reusedPasswords * 1.5 +
            breachedPasswords * 1.8),
      ),
    ),
  );

  const safePercent =
    ((strengthCounts["Very Strong"] +
      strengthCounts["Strong"] +
      strengthCounts["Resilient"]) *
      100) /
    passwordsCount;

  const {
    title: countTitle,
    goal: countGoal,
    barColor: countBarColor,
    titleColor: countTitleColor,
  } = getPasswordCountAchievement(passwordsCount);
  const countProgress = getProgress(passwordsCount, countGoal);

  const {
    title: healthTitle,
    goal: healthGoal,
    barColor: healthBarColor,
    titleColor: healthTitleColor,
  } = getPasswordHealthAchievement(passwordHealth);
  const healthProgress = (passwordHealth / healthGoal) * 100;

  const {
    title: safeTitle,
    goal: safeGoal,
    barColor: safeBarColor,
    titleColor: safeTitleColor,
  } = getSafePasswordsAchievement(safePercent);
  const safeProgress = (safePercent / safeGoal) * 100;

  if (isPending)
    return (
      <DashboardBox extraStyles="col-span-4 row-span-3 flex flex-col justify-between gap-3 px-5 py-4 lg:col-span-4">
        <DashboardLoader />
      </DashboardBox>
    );

  return (
    <DashboardBox extraStyles="col-span-4 row-span-3 flex flex-col justify-between gap-3 px-5 py-4 lg:col-span-4">
      <div className="flex items-center justify-center">
        <PasswordHealthChart passwordHealth={passwordHealth} />
      </div>
      <div className="divide-charcoal-400 divide-y-1">
        <h4 className="font-heading dark:text-charcoal-100 pb-2 text-xl font-semibold">
          Achievements
        </h4>
        <AchievementProgress
          title={countTitle}
          percentage={`${countProgress}%`}
          progressLabel={`${passwordsCount > countGoal ? countGoal : passwordsCount}/${countGoal}`}
          description={`Save ${countGoal} passwords.`}
          barColor={countBarColor}
          titleColor={countTitleColor}
        />
        <AchievementProgress
          title={healthTitle}
          percentage={`${healthProgress}%`}
          progressLabel={`${Math.round((passwordHealth / healthGoal) * 100)}%`}
          description={`Reach ${healthGoal}% password health.`}
          barColor={healthBarColor}
          titleColor={healthTitleColor}
        />
        <AchievementProgress
          title={safeTitle}
          percentage={`${safeProgress}%`}
          progressLabel={`${Math.round(safePercent)}%`}
          description={`Achieve ${safeGoal}% safe passwords.`}
          barColor={safeBarColor}
          titleColor={safeTitleColor}
        />
      </div>
    </DashboardBox>
  );
}

export default HealthAndAchievements;
