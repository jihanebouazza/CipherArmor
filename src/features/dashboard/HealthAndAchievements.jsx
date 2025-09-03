import { useDashboardStats } from "../../contexts/DashboardStatsContext ";
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

function HealthAndAchievements() {
  const { isPendingPasswords, passwordHealth, passwordsCount, safePercent } =
    useDashboardStats();

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

  if (isPendingPasswords)
    return (
      <DashboardBox extraStyles="col-span-4 row-span-3 flex flex-col justify-between gap-3 px-5 py-4 lg:col-span-4">
        <DashboardLoader />
      </DashboardBox>
    );

  return (
    <DashboardBox extraStyles="col-span-4 row-span-3 flex flex-col justify-start gap-3 px-5 py-4 lg:col-span-4">
      <div className="flex items-center justify-center">
        <PasswordHealthChart passwordHealth={Number(passwordHealth) || 0} />
      </div>
      <div className="divide-charcoal-400 h-full divide-y-1 py-3">
        <h4 className="font-heading dark:text-charcoal-100 pb-2 text-xl font-semibold">
          Achievements
        </h4>
        <div className="flex h-full justify-center">
          {passwordsCount ? (
            <div className="divide-charcoal-400 w-full divide-y-1">
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
                progressLabel={`${Math.min(Math.round((passwordHealth / healthGoal) * 100), 100)}%`}
                description={`Reach ${healthGoal}% password health.`}
                barColor={healthBarColor}
                titleColor={healthTitleColor}
              />
              <AchievementProgress
                title={safeTitle}
                percentage={`${safeProgress}%`}
                progressLabel={`${Math.min(Math.round(safePercent), 100)}%`}
                description={`Achieve ${safeGoal}% safe passwords.`}
                barColor={safeBarColor}
                titleColor={safeTitleColor}
              />
            </div>
          ) : (
            <p className="my-auto flex h-full items-center justify-center">
              No achievements yet!
            </p>
          )}
        </div>
      </div>
    </DashboardBox>
  );
}

export default HealthAndAchievements;
